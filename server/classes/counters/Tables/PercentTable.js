const {
    HeaderRow,
    HeaderCell,
    FormulaCell,
    CustomRow,
    CountResult,
    TableHeader
} = require("../../../services/documentsService/docxClasses");
const countDays = require("../../../utils/dates/countDays");
const addDays = require("../../../utils/dates/addDays");
const {Table, WidthType} = require("docx");
const CountingTable = require("./CountingTable");

module.exports = class PercentTable extends CountingTable {
    constructor(contract, breaks) {
        super(contract, breaks);
        this.percent = contract.percent;
        this.rows.push(
            new HeaderRow([new HeaderCell('Осн. долг'), new HeaderCell('C'), new HeaderCell("По"), new HeaderCell("Дней"), new FormulaCell("Формула"), new HeaderCell("Проценты за период"), new HeaderCell("Сумма процентов")])
        );
        this.init();
    }

    init() {
        this.breaks.forEach((el, index) => {
            if (this.breaks[index + 1]) {
                const next = this.breaks[index + 1];
                if (el.payment) {
                    const payment = el.payment;
                    this.main -= payment.main;
                    this.percents -= payment.percents;
                    this.addPaymentRow(payment.main, payment.percents, el.date);
                }
                const days = countDays(el.date, next.date);
                const firstDate = addDays(el.date, 1);
                if (!el.percentsCounted) this.addNoCountRow(firstDate, next.date, days, el.isLeap);
                else {
                    const percentsInPeriod = Number(next.percents - this.percents).toFixed(2);
                    this.percents = next.percents;
                    this.addCountRow(firstDate, next.date, days, el.isLeap, percentsInPeriod);
                }
            }

        })
        this.rows.push(new CustomRow([
            new CountResult(`Сумма процентов: ${this.percents} руб.`)
        ]), new CustomRow([
            new CountResult(`Сумма основного долга: ${this.main} руб.`)]))
        this.header = new TableHeader('Расчет процентов и основного долга:');
        this.table = new Table({
                width: {
                    type: WidthType.PERCENTAGE,
                    size: 100
                },
                margins: {
                    bottom: 300000
                },
                rows: this.rows
            })
    }
}