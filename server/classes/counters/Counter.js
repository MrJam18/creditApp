const Payments = require('../../models/documents/Payments');
const Contracts = require("../../models/documents/Contracts");
const countDays = require("../../utils/dates/countDays");
const countPercentsInOneYear = require("../../utils/countMoney/countPercentsInOneYear");
const Break = require("../../utils/countMoney/Break");
const getRubles = require("../../utils/countMoney/getRubles");
const Years = require("./Years");
const compareDatesBool = require("../../utils/dates/compareDatesBool");

module.exports = class Counter
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
    breaks = [];
    years;
    issued;
    isPenaltyCounted;
    countPeriod(firstDate, lastDate, isLeap){}
    constructor(contract, endDate, payments) {
        this.percent = contract.percent;
        this.penalty = contract.penalty;
        this.startDate = contract.date_issue;
        this.endDate = endDate;
        this.dueDate = contract.due_date;
        this.issued = contract.sum_issue;
        this.main = contract.sum_issue;
        this.years = new Years(contract.date_issue, endDate, payments);
        this.isPenaltyCounted = {
            started: false,
            ended: false
        }
    }

    count() {
        this.createBreak(this.startDate, this.years.list[0].isLeap);
        const firstYear = this.years.getFirstYear();
        const lastYear = this.years.getLastYear();
        if(lastYear) {
            this.countYear(this.startDate, firstYear.getLastYearDate(), firstYear);
            const list = this.years.getOtherYears();
            list.forEach((year)=> {
                const lastPrevYearDate = this.getLastYearDate(year.year - 1);
                if(this.breaks[this.breaks.length - 1].isLeap !== year.isLeap){
                    this.createBreak(lastPrevYearDate, year.isLeap);
                }
                this.countYear(lastPrevYearDate, year.getLastYearDate(), year);
            });
            this.countYear(this.getLastYearDate(lastYear.year - 1), this.endDate, lastYear);
        }
        else this.countYear(this.startDate, this.endDate, firstYear);
        this.createBreak(this.endDate, this.years.list[this.years.list.length - 1].isLeap);
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

    countPenaltiesPeriod(startDate, endDate, isLeap)
    {
        let counted = 0;
        if (this.isPenaltyCounted.started) {
            counted = this.countPenalties(startDate, endDate, isLeap);
        } else if (compareDatesBool(endDate, this.dueDate)) {
            this.isPenaltyCounted.started = true;
            counted = this.countPenalties(this.dueDate, endDate, isLeap);
        }
        return counted;
    }

    createBreak(date, isLeap, payment = null)
    {
        this.breaks.push(new Break(date, isLeap, this.main, this.percents, this.penalties, payment));
    }


    countYear(startDate, endDate, year)
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
            if (year.payments[index + 1]) this.countPeriod(el.date, year.payments[index + 1].date, year.isLeap);
            else this.countPeriod(el.date, endDate, year.isLeap);
        });
    }

    getLastYearDate(year)
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

    getPayments()
    {
        const payments = [];
        for(let yearI= 0; yearI < this.years.list.length; yearI++) {
            const year = this.years.list[yearI];
            for (let i = 0; i < year.payments.length; i++) {
                const payment = year.payments[i].getPlain();
                payments.push(payment);
            }
        }
        return payments;
    }

    static async updatePayments(contractId, createdPayment = null) {
        const payments = await Payments.findAll({
            where: {contractId}
        });
        if (createdPayment) payments.push(createdPayment);
        if (payments.length !== 0) {
            const contract = await Contracts.findByPk(contractId, {
                attributes: ['percent', 'penalty', 'date_issue', 'sum_issue', 'due_date']
            });
            const endDate = payments[payments.length - 1].date;
            const counted = new this(contract, endDate, payments);
            for (let yearI = 0; yearI < counted.years.list.length; yearI++) {
                const year = counted.years.list[yearI];
                for (let i = 0; i < year.payments.length; i++) {
                    const payment = year.payments[i].getPlain();
                    delete payment.createdAt;
                    delete payment.updatedAt;
                    if (!payment.id) await Payments.create(payment);
                    else {
                        await Payments.update(payment, {
                            where: {
                                id: payment.id
                            }
                        });
                    }
                }
            }
        }
    }
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
}