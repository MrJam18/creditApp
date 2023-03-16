// const isLeapsYears = require("../isLeapsYears");
// const getYear = require("../getYear");
// const Break = require("./Break");
// const countAllInYearNoLimit = require('./countAllInYearNoLimit');
// const compareDatesBool = require("../dates/compareDatesBool");
//
// module.exports = function countAllWithPayments(percent, penalty, issued, startDate, endDate, payments, dueDate) {
//     let breaks = [];
//     let main = +issued;
//     let percents = 0;
//     let penalties = 0;
//     let years = isLeapsYears(startDate, endDate);
//     let yearsData = [];
//     const dueYear = getYear(dueDate);
//     years = years.map((el)=>{
//         el.payments = [];
//         payments.forEach((payEl, index)=> {
//             const paymentYear = getYear(payEl.date);
//             if (paymentYear === el.year){
//                 payEl.index = index;
//                 el.payments.push(payEl);
//             }
//         });
//         return el;
//         },[]);
//         breaks.push(new Break(startDate, years[0].isLeap, 0, 0))
//     if (years.length === 1) {
//         const result = countAllInYearNoLimit(years[0], percent, penalty, main, percents, penalties, startDate, endDate, dueDate, breaks);
//         main = result.main;
//         percents = result.percents;
//         penalties = result.penalties;
//         yearsData.push(result.year);
//         breaks = result.breaks;
//         earliestYear = years[0];
//     }
//     else {
//         const firstYear = years.shift();
//         let firstResult;
//         if(firstYear.year ===  dueYear){
//             firstResult = countAllInYearNoLimit(firstYear, percent, penalty, main, percents, penalties, startDate, undefined, dueDate, breaks);
//         }
//         else firstResult = countAllInYearNoLimit(firstYear, percent, penalty, main, percents, penalties, startDate, undefined, undefined, breaks);
//         main = firstResult.main;
//         percents = firstResult.percents;
//         penalties = firstResult.penalties;
//         breaks = firstResult.breaks;
//         yearsData.push(firstResult.year);
//         const lastYear = years.pop();
//         if (years.length !== 0) {
//             years.forEach((year)=> {
//                 if(breaks[breaks.length -1].isLeap !== year.isLeap){
//                     breaks.push(new Break(year.year -1  + '-12-31', year.isLeap, percents, penalties));
//                 }
//                 let result;
//                 if(year.year === dueYear) {
//                     result = countAllInYearNoLimit(year, percent, penalty, main, percents, penalties, undefined, undefined, dueDate, breaks);
//                 }
//                 else if(year.year > dueYear){
//                     result = countAllInYearNoLimit(year, percent, penalty, main, percents, penalties, undefined, undefined, year.year - 1 + '-12-31', breaks);
//                 }
//                 else result = countAllInYearNoLimit(year, percent, penalty, main, percents, penalties, undefined, undefined, undefined, breaks);
//                 main = result.main;
//                 percents = result.percents;
//                 penalties = result.penalties;
//                 breaks = result.breaks;
//                 yearsData.push(result.year);
//
//             });
//         }
//         else {
//             if( breaks[breaks.length -1].isLeap !== lastYear.isLeap){
//                 breaks.push(new Break(firstYear.year + '-12-31', lastYear.isLeap, percents, penalties ));
//             }
//         }
//         let lastResult;
//         if(lastYear.year > dueYear ){
//             lastResult = countAllInYearNoLimit(lastYear, percent, penalty, main, percents, penalties, undefined,endDate, lastYear.year - 1 + '-12-31', breaks);
//         }
//         else lastResult = countAllInYearNoLimit(lastYear, percent, penalty, main, percents, penalties, undefined,endDate, dueDate, breaks);
//         main = lastResult.main;
//         percents = lastResult.percents;
//         penalties = lastResult.penalties;
//         breaks = lastResult.breaks;
//         yearsData.push(lastResult.year);
//         breaks.push(new Break(endDate, lastYear.isLeap, +percents.toFixed(2), +penalties.toFixed(2)))
//     }
//     payments = [];
//     yearsData.forEach((el)=> {
//         if(el.payments.length > 0){
//             el.payments.forEach((el)=> {
//                 el.sum = +el.sum;
//                 el.percents = el.percents.toFixed(2);
//                 el.penalties = el.penalties.toFixed(2);
//                 el.sum = el.sum.toFixed(2);
//                 el.main = el.main.toFixed(2);
//                 payments.push(el);
//             })
//         }
//     })
//     payments = payments.sort((a, b)=> {
//         if (a.index > b.index) return 1;
//         if (a.index < b.index) return -1;
//         else return 0;
//     })
//     main = Number(main.toFixed(2));
//     let limitedPercents = percents;
//     let limitedText = false;
//     percents = Math.trunc(percents);
//     penalties = Math.trunc(penalties);
//     if(compareDatesBool(startDate, '2016-03-28') && compareDatesBool('2016-12-31', startDate)){
//         limitedPercents = issued * 4;
//         limitedPercents = Math.trunc(limitedPercents);
//         limitedText = [
//             'Однако, согласно Федеральному закону от 02.07.2010 N 151-ФЗ (ред. от ред. от 29.12.2015 г.) "О микрофинансовой деятельности и микрофинансовых организациях" МФО имеет право начислять проценты до достижения общей суммы подлежащих уплате процентов размера, составляющего четырехкратную сумму непогашенной части займа.',
//            `Следовательно, сумма процентов составляет ${limitedPercents} руб.`
//         ]
//    } else if(compareDatesBool(startDate, '2016-12-31') && compareDatesBool('2019-01-27', startDate)) {
//     limitedPercents = issued * 3;
//     limitedPercents = Math.trunc(limitedPercents);
//     limitedText = [
//         'Однако, согласно Федеральному закону от 02.07.2010 N 151-ФЗ (ред. от 03.07.2016) "О микрофинансовой деятельности и микрофинансовых организациях" МФО имеет право начислять проценты до достижения общей суммы подлежащих уплате процентов размера, составляющего двухкратную сумму непогашенной части займа, а общий размер процентов не может превышать трехкратного размера от суммы займа.',
//         `Следовательно, сумма процентов составляет ${limitedPercents} руб.`
//     ]
//    } else if(compareDatesBool(startDate, '2019-01-27') && compareDatesBool('2019-06-30', startDate)) {
//     limitedPercents = issued * 2.5 - penalties;
//     limitedPercents = Math.trunc(limitedPercents);
//     limitedText = [
//        'Однако, согласно Федеральному закону от 27.12.2018 N 554-ФЗ "О внесении изменений в Федеральный закон "О потребительском кредите (займе)" и Федеральный закон "О микрофинансовой деятельности и микрофинансовых организациях" по договору потребительского кредита(займа) не допускается начисление процентов, неустойки (штрафа, пени), иных мер ответственности по договору потребительского кредита (займа), а также платежей за услуги, оказываемые кредитором заемщику за отдельную плату по договору потребительского кредита (займа), после того, как сумма начисленных процентов, неустойки (штрафа, пени), иных мер ответственности по договору потребительского кредита (займа), а также платежей за услуги, оказываемые кредитором заемщику за отдельную плату по договору потребительского кредита (займа) (далее - фиксируемая сумма платежей), достигнет двух с половиной кратного размера суммы предоставленного потребительского кредита (займа).',
//         `Следовательно, сумма процентов составляет ${limitedPercents} руб.`
//     ]
//    } else if(compareDatesBool(startDate, '2019-30-06') && compareDatesBool('2019-12-31', startDate)) {
//     limitedPercents = issued * 2 - penalties;
//     limitedPercents = Math.trunc(limitedPercents);
//     limitedText = [
//         'Однако, согласно Федеральному закону от 27.12.2018 N 554-ФЗ "О внесении изменений в Федеральный закон "О потребительском кредите (займе)" и Федеральный закон "О микрофинансовой деятельности и микрофинансовых организациях" по договору потребительского кредита(займа) не допускается начисление процентов, неустойки (штрафа, пени), иных мер ответственности по договору потребительского кредита (займа), а также платежей за услуги, оказываемые кредитором заемщику за отдельную плату по договору потребительского кредита (займа), после того, как сумма начисленных процентов, неустойки (штрафа, пени), иных мер ответственности по договору потребительского кредита (займа), а также платежей за услуги, оказываемые кредитором заемщику за отдельную плату по договору потребительского кредита (займа) (далее - фиксируемая сумма платежей), достигнет двухкратного размера суммы предоставленного потребительского кредита (займа).',
//         `Следовательно, сумма процентов составляет ${limitedPercents} руб.`
//     ]
//    } else if(compareDatesBool(startDate, '2019-12-31')) {
//     limitedPercents = issued * 1.5 - penalties;
//     limitedPercents = Math.trunc(limitedPercents);
//     limitedText = [
//         'Однако, согласно Федеральному закону от 27.12.2018 N 554-ФЗ "О внесении изменений в Федеральный закон "О потребительском кредите (займе)" и Федеральный закон "О микрофинансовой деятельности и микрофинансовых организациях" по договору потребительского кредита(займа) не допускается начисление процентов, неустойки (штрафа, пени), иных мер ответственности по договору потребительского кредита (займа), а также платежей за услуги, оказываемые кредитором заемщику за отдельную плату по договору потребительского кредита (займа), после того, как сумма начисленных процентов, неустойки (штрафа, пени), иных мер ответственности по договору потребительского кредита (займа), а также платежей за услуги, оказываемые кредитором заемщику за отдельную плату по договору потребительского кредита (займа) (далее - фиксируемая сумма платежей), достигнет полуторакратного размера суммы предоставленного потребительского кредита (займа).',
//         `Следовательно, сумма процентов составляет ${limitedPercents} руб.`
//     ]
//    }
//    else limitedPercents = percents;
//
//    const sum = Number((main + limitedPercents + penalties).toFixed(2));
//
//     return {
//         main, percents, penalties, payments, breaks, limitedPercents, limitedText, sum
//     }
// }