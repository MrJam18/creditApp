
module.exports = class Limited
{
    sum;
    limit;
    limitedPenalty;
    percents = 0;
    text;
    isLimited = true;
    constructor(sum, limitedPenalty = false) {
        this.sum = sum;
        this.limit = sum;
        this.limitedPenalty = limitedPenalty;
        if(sum === 0) this.isLimited = false;
    }
    getLimitedPercents(percents, penalties)
    {
        let sum = percents;
        this.percents = percents;
        if(this.limitedPenalty){
            sum += penalties;
        }
        if(this.isLimited && sum > this.sum) {
            this.percents = this.sum;
            this.#getText();
        }
    }
    #getText()
    {
        this.text = [
            `Однако, в соответстствии с ограничениями, введенными Федеральным законом от 02.07.2010 N 151-ФЗ, Федеральным законом от 27.12.2018 N 554-ФЗ "О внесении изменений в Федеральный закон "О потребительском кредите (займе)" и Федеральный закон "О микрофинансовой деятельности и микрофинансовых организациях" сумма процентов составляет ${this.percents} руб.`
        ]
    }
}