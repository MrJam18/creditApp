const compareDatesBool = require("../../utils/dates/compareDatesBool");
const addDays = require('../../utils/dates/addDays');
const Limited = require("./Limited");
const Counter = require("./Counter");
const Break = require("../../utils/countMoney/Break");

module.exports = class LoanCounter extends Counter
{
    limited;
    limitedDate;
    isPercentsCounted = true;

    constructor(contract, endDate, payments = [])
    {
        super(contract, endDate, payments);
        this.limited = {
            percents: false,
            limitedPenalty: false
        }
        this.#countLimited();
        this.count();
    }

    #countLimited()
    {
        if(compareDatesBool(this.startDate, '2016-03-28') && compareDatesBool('2016-12-31', this.startDate)){
            this.limited = new Limited(this.issued * 4);
        } else if(compareDatesBool(this.startDate, '2016-12-31') && compareDatesBool('2019-01-27', this.startDate)) {
            this.limited = new Limited(this.issued * 3);
        } else if(compareDatesBool(this.startDate, '2019-01-27') && compareDatesBool('2019-06-30', this.startDate)) {
            this.limited = new Limited(this.issued * 2.5, true);
        } else if(compareDatesBool(this.startDate, '2019-06-30') && compareDatesBool('2019-12-31', this.startDate)) {
            this.limited = new Limited(this.issued * 2, true);
        } else if(compareDatesBool(this.startDate, '2019-12-31')) {
            this.limited = new Limited(this.issued * 1.5, true);
        }
        else {
            this.limited = new Limited(0);
        }
    }

    countPeriod(firstDate, lastDate, isLeap)
    {
        if(this.limited.isLimited) {
            if (this.isPercentsCounted) {
                this.getLimitedDate(firstDate, isLeap);
                let lastPercentsDate = lastDate;
                if (compareDatesBool(lastDate, this.limitedDate)) {
                    lastPercentsDate = this.limitedDate;
                    this.endFlag = true;
                }
                this.limited.limit -= this.countPercents(firstDate, lastPercentsDate);
            }
            if (!this.isPenaltyCounted.ended) {
                const endPenaltyDate = this.endFlag ? this.limitedDate : lastDate;
                const countedPenalties = this.countPenaltiesPeriod(firstDate, endPenaltyDate, isLeap);
                if(this.limited.limitedPenalty) this.limited.limit -= countedPenalties;
            }
            if(this.endFlag){
                this.isPercentsCounted = false;
                if(this.limited.limitedPenalty) {
                    this.isPenaltyCounted.ended = true;
                    this.percents = this.limited.sum - this.penalties;
                    this.createBreak(this.limitedDate, isLeap);
                }
                else {
                    this.percents = this.limited.sum;
                    this.createBreak(this.limitedDate, isLeap, null, true);
                    this.countPenaltiesPeriod(this.limitedDate, lastDate, isLeap);
                }
                this.endFlag = false;
            }
        }
        else {
            this.countPercents(firstDate, lastDate, isLeap);
            if (this.isPenaltyCounted.started) {
                this.countPenalties(firstDate, lastDate, isLeap);
            } else if (compareDatesBool(lastDate, this.dueDate)) {
                this.countPenalties(this.dueDate, lastDate, isLeap);
                this.isPenaltyCounted.started = true;
            }
        }
    }

    createBreak(date, isLeap, payment = null, noPenalty = null)
    {
        this.breaks.push(new Break(date, isLeap, this.main, this.percents, this.penalties, payment, this.isPercentsCounted, !this.isPenaltyCounted.ended, noPenalty));
    }

    getLimitedDate(currentDate)
    {
        if(this.main === 0){
            this.limitedDate = this.endDate;
            return this.limited.isLimited = false;
        }
        if(this.limited.limit <= 0 ) {
            this.limited.limit = 0;
           return this.limitedDate = currentDate;
        }
        let countedDay = this.main / 365 * this.percent / 100;
        if(this.limited.limitedPenalty) {
            countedDay += this.main / 365 * this.penalty / 100;
        }
        const days = this.limited.limit / countedDay + 1;
        this.limitedDate = addDays(currentDate, days);
    }
}