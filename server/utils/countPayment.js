const countDays = require("./countDays");
const countOtherInOneYear = require("./countOtherInOneYear");
const countPaid = require("./countPaid");
const countPercentsInOneYear = require("./countPercentsInOneYear");
const isLeapsYears = require("./isLeapsYears");

module.exports = function countPayment(payment, startDate, main, percents, penalties, percent, penalty) {
    let paidMain = 0;
    const paidPercents = 0;
    const paidPenalties = 0;
    let years = isLeapsYears(startDate, payment.date);
    const paymentYearIndex = years.findIndex((el)=>{
            const [paymentYear] = /\d{4}/.exec(payment.date);
            if (+paymentYear === el.year){
                return true;
            } 
    });
    years[paymentYearIndex].payment = payment;
    if (years.length = 1) {
            let days = countDays(startDate, years[0].payment.date);
            percents += countPercentsInOneYear(days, percent, main, years[0].isLeap) - years[0].payment.sum;
            penalties += countPercentsInOneYear(days, penalty, main, years[0].isLeap);
            const paid = countPaid(percents, main, years[0].payment.sum);
            paidMain += paid.main;
            paidPercents += paid.percents;
            paidPenalties += paid.penalties;
            const other = countOtherInOneYear(main, percents, penalties);
            main = other.main;
            percents = other.percents;
            penalties = other.penalties;
        }
    else {
        const firstYear = years.shift();
            const firstDays = countDays(startDate, firstYear.year + 1 + '-01-01');
            percents += countPercentsInOneYear(firstDays, percent, main, firstYear.isLeap);
            penalties += countPercentsInOneYear(firstDays, penalty, main, firstYear.isLeap);
    const lastYear = years.pop();
        const days = countDays(lastYear.year + '-01-01', lastYear.payment.date);
        percents += countPercentsInOneYear(days, percent, main, lastYear.isLeap) - lastYear.payment.sum;
        penalties += countPercentsInOneYear(days, penalty, main, lastYear.isLeap);
        const paid = countPaid(percents, main, lastYear.payment.sum);
            paidMain += paid.main;
            paidPercents += paid.percents;
            paidPenalties += paid.penalties;
        const other = countOtherInOneYear(main, percents, penalties);
        main = other.main;
        percents = other.percents;
        penalties = other.penalties;
    if (years.length != 0) {
        years.forEach((el)=> {
            const days = countDays(el.year + '-01-01', el.year + 1 + '-01-01');
            percents += countPercentsInOneYear(days, percent, main, el.isLeap);
            percents += countPercentsInOneYear(days, percent, main, el.isLeap)
        })
    }
    }
    return {
        currentPercents: percents,
        currentPenalties: penalties,
        main: paidMain,
        percents: paidPercents,
        penalties: paidPenalties
    }
}
