// const { Table, WidthType, Paragraph, Footer } = require("docx");
// const countDays = require("../../utils/dates/countDays");
// const { Row, HeaderRow, HeaderCell, FormulaCell, CustomRow, Cell, Merged3Cell, CountResult, TableHeader, Signature } = require("./docxClasses");
// const { changeDateFormat } = require('../../utils/dates/changeDateFormat');
// const addDays = require("../../utils/dates/addDays");
// const compareDatesBool = require("../../utils/dates/compareDatesBool");
// const Break = require("../../utils/countMoney/Break");
// const isLeap = require("../../utils/dates/isLeap");
//
// function percentTable(contract, breaks) {
//     let main = contract.sum_issue;
//     let percents = 0;
//     let rows = [
//         new HeaderRow([new HeaderCell('Осн. долг'), new HeaderCell('C'), new HeaderCell("По"), new HeaderCell("Дней"), new FormulaCell("Формула"), new HeaderCell("Проценты за период"), new HeaderCell("Сумма процентов")]),
//     ]
//     breaks.forEach((el, index)=> {
//         if(breaks[index + 1]){
//             if(el.payment) {
//                 const payment = el.payment;
//                 main = (main - payment.main).toFixed(2);
//                 percents = (percents - payment.percents).toFixed(2);
//                 const row = new CustomRow([
//                     new Cell('- ' + payment.main), new Cell(changeDateFormat(el.date)), new Merged3Cell("Оплата долга"), new Cell(`- ${payment.percents}`), new Cell(`= ${percents}`)
//                 ])
//                 rows.push(row);
//             }
//             const daysInYear = el.isLeap ? 366 : 365;
//             const days = countDays(el.date, breaks[index + 1].date);
//             const firstDate = addDays(el.date, 1);
//             if (el.stopPercents) {
//                 const row = new Row([main,changeDateFormat(firstDate), changeDateFormat(breaks[index + 1].date), days, `${main} x ${days} / ${daysInYear} x ${contract.percent}%`,  'Не начисляются', '= ' + percents]);
//             rows.push(row)
//             }
//             else {
//             const percentsInPeriod = Number(breaks[index + 1].percents - percents).toFixed(2);
//             percents = breaks[index + 1].percents;
//             const row = new Row([main,changeDateFormat(firstDate), changeDateFormat(breaks[index + 1].date), days, `${main} x ${days} / ${daysInYear} x ${contract.percent}%`,  '+ ' + percentsInPeriod, '= ' + percents]);
//             rows.push(row)
//             }
//         }
//
//     })
//     rows.push(new CustomRow([
//         new CountResult(`Сумма процентов: ${percents} руб.`)
//     ]), new CustomRow([
//         new CountResult(`Сумма основного долга: ${main} руб.`)]))
//
//     const table = {
//         header: new TableHeader('Расчет процентов и основного долга:'),
//         table:    new Table({
//             width: {
//                 type: WidthType.PERCENTAGE,
//                 size: 100
//             },
//                 margins: {
//                     bottom: 300000
//                 },
//             rows
//             })
//         }
//
//     return table
//     }
//
//
//     function penaltyTable(contract, breaks) {
//         let main = contract.sum_issue;
//         let penalties = 0;
//         breaks.some((el, index)=> {
//             if(compareDatesBool(contract.due_date, el.date) && el.payment && Number(el.payment.main) !== 0){
//                 main = (main - el.payment.main).toFixed(2);
//             }
//             else if(compareDatesBool(el.date, contract.due_date) && breaks[index - 1]) {
//                return  breaks.splice(0, index)
//             }
//
//         })
//         const rows = [
//             new HeaderRow([new HeaderCell('Осн. долг'), new HeaderCell('C'), new HeaderCell("По"), new HeaderCell("Дней"), new FormulaCell("Формула"), new HeaderCell("Неустойка за период"), new HeaderCell("Сумма неустойки")]),
//         ]
//         const isLeapDueYear = isLeap(contract.due_date);
//         const penaltyBreak = new Break(contract.due_date, isLeapDueYear, 0, 0);
//         breaks.unshift(penaltyBreak);
//         breaks.forEach((el, index)=> {
//             if (el.payment && Number(el.payment.main) === 0 && Number(el.payment.penalties) === 0){
//                 breaks.splice(index, 1);
//             }
//         })
//         breaks.forEach((el, index)=>{
//             if(breaks[index + 1]){
//                 if(el.payment){
//                         const payment = el.payment;
//                         main = (main - payment.main).toFixed(2);
//                         penalties = (penalties - payment.penalties).toFixed(2);
//                         const row = new CustomRow([
//                             new Cell('- ' + payment.main), new Cell(changeDateFormat(el.date)), new Merged3Cell("Оплата долга"), new Cell(`- ${payment.penalties}`), new Cell(`= ${penalties}`)
//                         ])
//                         rows.push(row);
//                     }
//                         const daysInYear = el.isLeap ? 366 : 365;
//                         const days = countDays(el.date, breaks[index + 1].date);
//                         const firstDate = addDays(el.date, 1);
//                         if(el.stopPenalties) {
//                             const row = new Row([main,changeDateFormat(firstDate), changeDateFormat(breaks[index + 1].date), days, `${main} x ${days} / ${daysInYear} x ${contract.penalty}%`,  'Не начисляются', '= ' + penalties]);
//                         rows.push(row);
//                         }
//                         else {
//                         const penaltiesInPeriod = Number(breaks[index + 1].penalties - penalties).toFixed(2);
//                         penalties = breaks[index + 1].penalties;
//                         const row = new Row([main,changeDateFormat(firstDate), changeDateFormat(breaks[index + 1].date), days, `${main} x ${days} / ${daysInYear} x ${contract.penalty}%`,  '+ ' + penaltiesInPeriod, '= ' + penalties]);
//                         rows.push(row);
//                         }
//                 }
//
//
//         })
//         rows.push(new CustomRow([
//             new CountResult(`Сумма неустойки: ${penalties} руб.`)
//         ]))
//
//         const table = {
//            header: new TableHeader('Расчет неустойки:'),
//            table: new Table({
//                width: {
//                    type: WidthType.PERCENTAGE,
//                    size: 100
//                },
//                 rows
//                 })
//             }
//             return table;
//     }
//     const countingTables = (contract, breaks, initials) => {
//         const percents = percentTable(contract, breaks);
//         const penalties = penaltyTable(contract, breaks);
//         return {
//             children: [percents.header, percents.table, new Paragraph({
//                 spacing: {
//                     before: 500
//                 }
//             }), penalties.header, penalties.table],
//             footers: {
//                 default: new Footer({
//                     children: [new Signature(initials)]
//                 })
//             }
//         }
//     }
//     module.exports = {percentTable, penaltyTable, countingTables}