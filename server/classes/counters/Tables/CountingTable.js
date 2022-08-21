const getRubles = require("../../../utils/countMoney/getRubles");
const {Row, CustomRow, Cell, Merged3Cell} = require("../../../services/documentsService/docxClasses");
const {changeDateFormat} = require("../../../utils/dates/changeDateFormat");

module.exports = class CountingTable
{
    rows = [];
    breaks = [];
    #percents = 0;
    #main;
    percent;
    type;
    table;
    header;

    constructor(contract, breaks) {
        this.breaks = breaks;
        this.main = contract.sum_issue;
    }

    get main()
    {
        return this.#main;
    }
    set main(val)
    {
        this.#main = getRubles(val)
    }
    get percents()
    {
        return this.#percents;
    }
    set percents(val)
    {
        this.#percents = getRubles(val)
    }

    addCountRow(firstDate, lastDate, days, isLeap, percentsInPeriod)
    {
        const daysInYear = isLeap ? 366 : 365;
        const row = new Row([this.main,changeDateFormat(firstDate), changeDateFormat(lastDate), days, `${this.main} x ${days} / ${daysInYear} x ${this.percent}%`,  '+ ' + percentsInPeriod, '= ' + this.percents]);
        this.rows.push(row);
    }

    addPaymentRow(paymentMain, paymentPercents, date)
    {
        const row = new CustomRow([
            new Cell('- ' + paymentMain), new Cell(changeDateFormat(date)), new Merged3Cell("Оплата долга"), new Cell(`- ${paymentPercents}`), new Cell(`= ${this.percents}`)
        ]);
        this.rows.push(row);
    }

    addNoCountRow(firstDate, lastDate)
    {
        const row = new CustomRow([
            new Cell(this.main), new Cell(changeDateFormat(firstDate)), new Cell(changeDateFormat(lastDate)), new Merged3Cell("Не начисляются"), new Cell(`= ${this.percents}`)
        ]);
        this.rows.push(row);
    }
}