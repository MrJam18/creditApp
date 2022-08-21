const Break = require("../../utils/countMoney/Break");
const compareDatesBool = require("../../utils/dates/compareDatesBool");
const countDays = require("../../utils/dates/countDays");
const countPercentsInOneYear = require("../../utils/countMoney/countPercentsInOneYear");
const getRubles = require('../../utils/countMoney/getRubles');
const Years = require("./Years");
const addDays = require('../../utils/dates/addDays');
const Limited = require("./Limited");
const {Payments} = require("../../models/models");

module.exports = class LoanCounter
{
    #sum = 0;
    percent;
    penalty;
    #main;
    #percents = 0;
    #penalties = 0;
    #fee;
    startDate;
    endDate;
    dueDate;
    payments = [];
    breaks = [];
    years;
    limited;
    issued;
    isPenaltyCounted;
    limitedDate;
    isPercentsCounted = true;

    get sum() {
        return this.#sum;
    }
    set sum(val) {
        this.#sum = getRubles(val);
    }
    get percents(){
        return this.#percents;
    }
    set percents(val) {
        this.#percents = getRubles(val);
    }
    get penalties() {
        return this.#penalties;
    }
    set penalties(val) {
        this.#penalties = getRubles(val);
    }
    get main() {
        return this.#main;
    }
    set main(val) {
        this.#main = getRubles(val);
    }
    get fee() {
        return this.#fee;
    }
    set fee(val) {
        this.#fee = getRubles(val);
    }

    constructor(issued, percent, penalty, startDate, endDate, dueDate, payments = [])
    {
        this.percent = percent;
        this.penalty = penalty;
        this.startDate = startDate;
        this.endDate = endDate;
        this.dueDate = dueDate;
        this.issued = issued;
        this.main = issued;
        this.years = new Years(startDate, endDate, payments);
        this.limited = {
            percents: false,
            limitedPenalty: false
        }
        this.isPenaltyCounted = {
            started: false,
            ended: false
        }
        this.#countLimited();
        this.count();
    }
    count() {
        this.createBreak(this.startDate, this.years.list[0].isLeap)
        const firstYear = this.years.getFirstYear();
        const lastYear = this.years.getLastYear();
        if(lastYear) {
            this.#countYear(this.startDate, firstYear.getLastYearDate(), firstYear);
            this.years.list.forEach((year)=> {
                const lastPrevYearDate = LoanCounter.getLastYearDate(year.year - 1);
                if(this.breaks[this.breaks.length -1].isLeap !== year.isLeap){
                    this.createBreak(lastPrevYearDate, year.isLeap)
                }
                this.#countYear(lastPrevYearDate, year.getLastYearDate(), year);
            });
            this.#countYear(LoanCounter.getLastYearDate(lastYear.year - 1), this.endDate, lastYear);
        }
        else this.#countYear(this.startDate, this.endDate, firstYear);
        this.createBreak(this.endDate, lastYear.isLeap)
    }

    #countYear(startDate, endDate, year)
    {
        if(year.payments.length !== 0) this.countPeriod(startDate, year.payments[0].date, year.isLeap);
        else this.countPeriod(startDate, endDate, year.isLeap);
        year.payments.forEach((el, index) => {
            this.createBreak(el.date, year.isLeap, el);
            const snapshot = {
                percents: this.percents,
                penalties: this.penalties,
                main: this.main
            }
            this.percents -= el.sum;
            if (this.percents < 0) {
                this.main += this.percents;
                this.percents = 0;
                if (this.main < 0) {
                    this.penalties += this.main;
                    this.main = 0;
                }
            }
            el.percents = snapshot.percents - this.percents;
            el.penalties = snapshot.penalties - this.penalties;
            el.main = snapshot.main - this.main;
            this.payments.push(el);
            if (year.payments[index + 1]) this.countPeriod(el.date, year.payments[index + 1].date, year.isLeap);
            else this.countPeriod(el.date, endDate, year.isLeap);
        });
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
                let countedPenalties = 0;
                if (this.isPenaltyCounted.started) {
                    countedPenalties = this.countPenalties(firstDate, endPenaltyDate, isLeap);
                } else if (compareDatesBool(endPenaltyDate, this.dueDate)) {
                    this.isPenaltyCounted.started = true;
                    countedPenalties = this.countPenalties(this.dueDate, endPenaltyDate, isLeap);
                }
                if(this.limited.limitedPenalty) this.limited.limit -= countedPenalties;
            }
            if(this.endFlag){
                this.isPercentsCounted = false;
                if(this.limited.limitedPenalty) this.isPenaltyCounted.ended = true;
                this.percents = this.limited.limitedPenalty ? this.limited.sum - this.penalties : this.limited.sum;
                this.createBreak(this.limitedDate, isLeap);
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

    countPercents(firstDate, lastDate, isLeap)
    {
        const days = countDays(firstDate, lastDate);
        const countedPercents = countPercentsInOneYear(days, this.percent, this.main, isLeap);
        this.percents += countedPercents;
        return countedPercents;
    }

    countPenalties(startDate, endDate, isLeap)
    {
        const days = countDays(startDate, endDate);
        const countedPenalties = countPercentsInOneYear(days, this.penalty, this.main, isLeap);
        this.penalties += countedPenalties;
        return countedPenalties;
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
        const days = this.limited.limit / countedDay + 7;
        this.limitedDate = addDays(currentDate, days);
    }

    createBreak(date, isLeap, payment = null)
    {
        this.breaks.push(new Break(date, isLeap, this.main, this.percents, this.penalties, payment, this.isPercentsCounted, !this.isPenaltyCounted.ended));
    }

    static getLastYearDate(year)
    {
       return year  + '-12-31';
    }

    countFee(type)
    {
        let fee;
        if(!this.sum) this.countSum();
        if(this.sum <= 20000){
            fee = this.sum / 100 * 4;
            if(fee < 400) fee = 400;
        }
        else if((this.sum > 20000) && (this.sum <= 100000)){
            fee = ((this.sum - 20000) / 100 * 3) + 800;
        }
        else if((this.sum > 100000) && (this.sum <= 200000)){
            fee = ((this.sum - 100000) / 100 * 2) + 3200;
        }
        else if((this.sum > 200000) && (this.sum <= 1000000)){
            fee = ((this.sum - 200000) / 100) + 5200;
        }
        else {
            fee = ((this.sum - 1000000) / 100 * 0.5) + 13200;
            if (fee > 60000) fee = 60000;
        }
        if(type === 'courtOrder') fee = fee / 2;
        this.fee = fee;
        return this.fee;

    }

    countSum()
    {
        this.sum = this.main + this.percents + this.penalties;
    }

    async updatePayments()
    {
        for(let yearI= 0; yearI < this.years.length; yearI++) {
            const year = this.years[yearI];
            for (let i = 0; i < year.payments.length; i++) {
                const payment = year.payments[i];
                delete payment.createdAt;
                delete payment.updatedAt;
                await Payments.update(payment, {
                    where: {
                        id: payment.id
                    }
                });
            }
        }
    }
}