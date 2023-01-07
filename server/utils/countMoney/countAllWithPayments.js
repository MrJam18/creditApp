// const isLeapsYears = require("../isLeapsYears");
// const countAllInYear = require("./countAllInYear");
// const getYear = require("../getYear");
// const Break = require("./Break");
// const compareDatesBool = require("../dates/compareDatesBool");
//
// module.exports = function countAllWithPayments(percent, penalty, issued, startDate, endDate, payments, dueDate) {
//     percent = Number(percent);
//     penalty = Number(penalty);
//     let breaks = [];
//     let main = +issued;
//     let percents = 0;
//     let penalties = 0;
//     let years = isLeapsYears(startDate, endDate);
//     let yearsData = [];
//     const dueYear = getYear(dueDate);
//     let limited = {};
//     if(compareDatesBool(startDate, '2016-03-28') && compareDatesBool('2016-12-31', startDate)){
//          limited.percents = issued * 4;
//     } else if(compareDatesBool(startDate, '2016-12-31') && compareDatesBool('2019-01-27', startDate)) {
//     limited.percents = issued * 3;
//     } else if(compareDatesBool(startDate, '2019-01-27') && compareDatesBool('2019-06-30', startDate)) {
//         limited.percents = issued * 2.5;
//         limited.limitPenalty = true;
//     } else if(compareDatesBool(startDate, '2019-06-30') && compareDatesBool('2019-12-31', startDate)) {
//         limited.percents = issued * 2;
//         limited.limitPenalty = true;
//     } else if(compareDatesBool(startDate, '2019-12-31')) {
//         limited.percents = issued * 1.5;
//         limited.limitPenalty = true;
//     }
//
//         breaks.push(new Break(startDate, years[0].isLeap, 0, 0))
//     if (years.length === 1) {
//     const result = countAllInYear(years[0], percent, penalty, main, percents, penalties, startDate, endDate, dueDate, breaks, limited);
//         main = result.main;
//         percents = result.percents;
//         penalties = result.penalties;
//         yearsData.push(result.year);
//         breaks = result.breaks;
//         limited = result.limited;
//         earliestYear = years[0];
//     }
//     else {
//         const firstYear = years.shift();
//         let firstResult;
//         if(firstYear.year ===  dueYear){
//             firstResult = countAllInYear(firstYear, percent, penalty, main, percents, penalties, startDate, undefined, dueDate, breaks, limited);
//         }
//         else firstResult = countAllInYear(firstYear, percent, penalty, main, percents, penalties, startDate, undefined, undefined, breaks, limited);
//         main = firstResult.main;
//         percents = firstResult.percents;
//         penalties = firstResult.penalties;
//         breaks = firstResult.breaks;
//         limited = firstResult.limited;
//         yearsData.push(firstResult.year);
//         const lastYear = years.pop();
//         if (years.length !== 0) {
//             years.forEach((year)=> {
//                 if(breaks[breaks.length -1].isLeap !== year.isLeap && !limited.stop){
//                     breaks.push(new Break(year.year -1  + '-12-31', year.isLeap, percents, penalties));
//                 }
//                 let result;
//                 if(year.year === dueYear) {
//                     result = countAllInYear(year, percent, penalty, main, percents, penalties, undefined, undefined, dueDate, breaks, limited);
//                 }
//                 else if(year.year > dueYear){
//                     result = countAllInYear(year, percent, penalty, main, percents, penalties, undefined, undefined, year.year - 1 + '-12-31', breaks, limited);
//                 }
//                 else result = countAllInYear(year, percent, penalty, main, percents, penalties, undefined, undefined, undefined, breaks, limited);
//                 main = result.main;
//                 percents = result.percents;
//                 penalties = result.penalties;
//                 breaks = result.breaks;
//                 limited = result.limited;
//                 yearsData.push(result.year);
//
//             });
//         }
//         else {
//             if( breaks[breaks.length -1].isLeap !== lastYear.isLeap && !limited.stop){
//                 breaks.push(new Break(firstYear.year + '-12-31', lastYear.isLeap, percents, penalties ));
//             }
//         }
//         let lastResult;
//         if(lastYear.year > dueYear ){
//             lastResult = countAllInYear(lastYear, percent, penalty, main, percents, penalties, undefined,endDate, lastYear.year - 1 + '-12-31', breaks, limited);
//         }
//         else lastResult = countAllInYear(lastYear, percent, penalty, main, percents, penalties, undefined,endDate, dueDate, breaks, limited);
//         main = lastResult.main;
//         percents = lastResult.percents;
//         penalties = lastResult.penalties;
//         breaks = lastResult.breaks;
//         limited = lastResult.limited;
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
//     percents = Math.trunc(percents);
//     penalties = Math.trunc(penalties);
//
//     return {
//         main, percents, penalties, payments, breaks, limitedPercents: percents
//     }
// }