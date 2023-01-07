const Counter = require("./Counter");
const compareDatesBool = require("../../utils/dates/compareDatesBool");
const Limited = require("./Limited");

module.exports = class IgnorePaymentsLoanCounter extends Counter {

    limited;
    text;

    constructor(contract, endDate, payments = []) {
        super(contract, endDate, payments);
        this.#countLimited();
        this.count();
        this.#getLimitedPercents();
    }

    countPeriod(firstDate, lastDate, isLeap)
    {
        this.countPercents(firstDate, lastDate, isLeap);
        this.countPenaltiesPeriod(firstDate, lastDate, isLeap);
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

    countSum()
    {
        this.sum = this.main + this.limited.percents + this.penalties;
    }

    #getLimitedPercents()
    {
        let sum = this.percents;
        if(this.limited.limitedPenalty){
            sum += this.penalties;
        }
        if(this.limited.isLimited && sum > this.limited.sum) {
            this.limited.percents = this.limited.limitedPenalty ? this.limited.sum - this.penalties : this.limited.sum;
            this.#getText();
        }
    }
    #getText()
    {
        this.text = `Однако, в соответствии с ограничениями, введенными Федеральным законом от 02.07.2010 N 151-ФЗ, Федеральным законом от 27.12.2018 N 554-ФЗ "О внесении изменений в Федеральный закон "О потребительском кредите (займе)" и Федеральный закон "О микрофинансовой деятельности и микрофинансовых организациях" сумма процентов составляет ${this.limited.percents} руб.`;
    }
}