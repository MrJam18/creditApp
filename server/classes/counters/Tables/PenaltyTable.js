const CountingTable = require("./CountingTable");
const {HeaderRow, HeaderCell, FormulaCell, CustomRow, CountResult, TableHeader} = require("../../../services/documentsService/docxClasses");
const compareDatesBool = require("../../../utils/dates/compareDatesBool");
const isLeap = require("../../../utils/dates/isLeap");
const Break = require("../../../utils/countMoney/Break");
const countDays = require("../../../utils/dates/countDays");
const addDays = require("../../../utils/dates/addDays");
const {Table, WidthType} = require("docx");
const deleteCycle = require('../../../utils/deleteCycle');
const {changeDateToISO} = require("../../../utils/dates/changeDateFormat");
const getRubles = require("../../../utils/countMoney/getRubles");


module.exports = class PenaltyTable extends CountingTable {
    constructor(contract, breaks) {
        super(contract, breaks)
        this.percent = contract.penalty;
        const dueDate = changeDateToISO(contract.due_date);
        this.rows.push(new HeaderRow([new HeaderCell('Осн. долг'), new HeaderCell('C'), new HeaderCell("По"), new HeaderCell("Дней"), new FormulaCell("Формула"), new HeaderCell("Неустойка за период"), new HeaderCell("Сумма неустойки")]));
        this.breaks.some((el, index) => {
            if (compareDatesBool(contract.due_date, el.date) && el.payment && Number(el.payment.main) !== 0) {
                this.main -= el.payment.main;
            } else if (compareDatesBool(el.date, dueDate)) {
                return this.breaks.splice(0, index);
            }
        });
        const isLeapDueYear = isLeap(dueDate);
        const penaltyBreak = new Break(dueDate, isLeapDueYear, this.main, 0, 0);
        breaks.unshift(penaltyBreak);
        this.init();
    }

    init() {
        deleteCycle(this.breaks, (el, index) => {
            if ((el.payment && Number(el.payment.main) === 0 && Number(el.payment.penalties) === 0) || el.noPenalty) {
                this.breaks.splice(index, 1);
            }
        });
        this.breaks.forEach((el, index) => {
            if (this.breaks[index + 1]) {
                const next = this.breaks[index + 1];
                if (el.payment) {
                    const payment = el.payment;
                    this.main -= payment.main;
                    this.percents = this.percents - payment.penalties;
                    this.addPaymentRow(payment.main, payment.penalties, el.date);
                }
                const days = countDays(el.date, next.date);
                const firstDate = addDays(el.date, 1);
                if (!el.penaltyCounted) this.addNoCountRow(firstDate, next.date, days, el.isLeap);
                 else {
                    const penaltiesInPeriod = getRubles(next.penalties - this.percents);
                    this.percents = next.penalties;
                    this.addCountRow(firstDate, next.date, days, el.isLeap, penaltiesInPeriod);
                }
            }
        })
        this.rows.push(new CustomRow([
            new CountResult(`Сумма неустойки: ${this.percents} руб.`)
        ]));
        this.header = new TableHeader('Расчет неустойки:');
        this.table = new Table({
            width: {
                type: WidthType.PERCENTAGE,
                size: 100
            },
            rows: this.rows
        })
    };
}