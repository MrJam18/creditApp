const compareDatesBool = require("../dates/compareDatesBool");
const countDays = require("../dates/countDays");
const countOtherInOneYear = require("./countOtherInOneYear");
const countPercentsInOneYear = require("./countPercentsInOneYear");
const Break = require('./Break');
const countLimited = require("./countLimited");
const compareDates = require('../dates/compareDates')



module.exports = function countAllInYear(year, percent, penalty, main, percents, penalties, startDate, endDate, dueDate, breaks, limited) {
    if(limited.percents) {
    let accruedPercents;
    let accruedPenalties;
    if(year.payments.length > 0) {
        if((!limited.limitPenalty || !limited.stop) && dueDate ){
            if(compareDatesBool(year.payments[0].date > dueDate)){
                const penaltyDays = countDays(dueDate, year.payments[0].date);
                accruedPenalties = countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                penalties += accruedPenalties;
                if(limited.limitPenalty) limited.percents -= accruedPenalties; 
            }
        }
        if(!limited.stop) {
            let days;
            if(startDate) days = countDays(startDate, year.payments[0].date);
            else days = countDays(year.year -1 + '-12-31', year.payments[0].date) + 1;
            accruedPercents = countPercentsInOneYear(days, percent, main, year.isLeap);
            percents += accruedPercents;
            ({limited, percents} = countLimited(limited, accruedPercents, percents));
        }
            
        year.payments.forEach((el, index)=> {
            if(limited.stop) {
                breaks.push(new Break(el.date, year.isLeap, percents, penalties, el, true, limited.limitPenalty ? true : false));
            }
            else {
            breaks.push(new Break(el.date, year.isLeap, percents, penalties, el));
            }
                const sumSnapshot = {
                    percents,
                    penalties,
                    main
                }
                percents -= el.sum;
                const other = countOtherInOneYear(main, percents, penalties);
                main = other.main;
                percents = other.percents;
                penalties = other.penalties;
                year.payments[index].percents = sumSnapshot.percents - percents;
                year.payments[index].penalties = sumSnapshot.penalties - penalties;
                year.payments[index].main = sumSnapshot.main - main;
            if (year.payments[index+1]){
                if(compareDatesBool(year.payments[index+1].date, dueDate) && dueDate && (!limited.limitPenalty || !limited.stop)){
                    let penaltyDays;
                    if(compareDatesBool(el.date, dueDate)) penaltyDays = countDays(el.date, year.payments[index+1].date);
                    else penaltyDays = countDays(dueDate, year.payments[index+1].date);
                    accruedPenalties = countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                    penalties += accruedPenalties;
                    if(limited.limitPenalty) limited.percents -= accruedPenalties;   
                }
                if(!limited.stop){
                let days = countDays(el.date, year.payments[index+1].date);
                accruedPercents = countPercentsInOneYear(days, percent, main, year.isLeap);
                percents += accruedPercents;
                ({limited, percents} = countLimited(limited, accruedPercents, percents));
            }
        }
            else {
                if((!limited.limitPenalty || !limited.stop) && dueDate){
                    let penaltyDays;
                    const firstPenaltyDate = compareDates(el.date, dueDate);
                    if(endDate) penaltyDays = countDays(firstPenaltyDate, endDate);
                    else penaltyDays = countDays(firstPenaltyDate, year.year + '-12-31')
                    accruedPenalties = countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                    penalties += accruedPenalties;
                    if(limited.limitPenalty) limited.percents -= accruedPenalties;  
                }
                if(!limited.stop){
                let days;
                if(endDate) days = countDays(el.date, dueDate);
                else days = countDays(el.date, year.year + '-12-31');
                accruedPercents = countPercentsInOneYear(days, percent, main, year.isLeap);
                percents += accruedPercents;
                ({limited, percents} = countLimited(limited, accruedPercents, percents));
                }
            }
            })
    }
    else {
        if((!limited.limitPenalty || !limited.stop)  && dueDate){
            const penaltyDays = countDays(dueDate, endDate);
            accruedPenalties = countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
            penalties += accruedPenalties;
            if(limited.limitPenalty) limited.percents -= accruedPenalties;
            }
        if(!limited.stop){
            const firstDate = startDate ? startDate : year.year - 1 + '-12-31';
            const lastDate = endDate ? endDate : year.year + '-12-31';
            const days = countDays(firstDate, lastDate);
            accruedPercents = countPercentsInOneYear(days, percent, main, year.isLeap);
            percents += accruedPercents;
            ({limited, percents} = countLimited(limited, accruedPercents, percents));
        }
    }
    return {
        year,
        main,
        percents,
        penalties,
        breaks,
        limited
    }
}
else {
    if(year.payments.length > 0) {
        let days;
        if(startDate) days = countDays(startDate, year.payments[0].date);
        else days = countDays(year.year + '-01-01', year.payments[0].date) + 1;
        percents += countPercentsInOneYear(days, percent, main, year.isLeap);
        if(dueDate){
                if(compareDatesBool(year.payments[0].date > dueDate)){
                    const penaltyDays = countDays(dueDate, year.payments[0].date);
                    penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                }
            }
        year.payments.forEach((el, index)=> {
            breaks.push(new Break(el.date, year.isLeap, percents, penalties, el));
                const sumSnapshot = {
                    percents,
                    penalties,
                    main
                }
                percents -= el.sum;
                const other = countOtherInOneYear(main, percents, penalties);
                main = other.main;
                percents = other.percents;
                penalties = other.penalties;
                year.payments[index].percents = sumSnapshot.percents - percents;
                year.payments[index].penalties = sumSnapshot.penalties - penalties;
                year.payments[index].main = sumSnapshot.main - main;
            if (year.payments[index+1]){
                let days = countDays(el.date, year.payments[index+1].date);
                percents += countPercentsInOneYear(days, percent, main, year.isLeap);
                if(compareDatesBool(year.payments[index+1].date, dueDate) && dueDate){
                    let penaltyDays;
                    if(compareDatesBool(el.date, dueDate)) penaltyDays = countDays(el.date, year.payments[index+1].date);
                    else penaltyDays = countDays(dueDate, year.payments[index+1].date);
                    penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                }
            }
            else {
                let days;
                if(endDate) days = countDays(el.date, endDate);
                else days = countDays(el.date, year.year + '-12-31');
                percents += countPercentsInOneYear(days, percent, main, year.isLeap);
                if(dueDate){
                    let penaltyDays;
                    const firstPenaltyDate = compareDates(el.date, dueDate);
                    if(endDate) penaltyDays = countDays(firstPenaltyDate, endDate);
                    else penaltyDays = countDays(firstPenaltyDate, year.year + '-12-31')
                    penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                }
            }
            })
    }
    else {
            const firstDate = startDate ? startDate : year.year -1 + '-12-31';
            const lastDate = endDate ? endDate : year.year + '-12-31';
            const days = countDays(firstDate, lastDate)
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
        if(dueDate){
        const penaltyDays = countDays(dueDate, lastDate) 
        penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
        }
    }
    return {
        year,
        main,
        percents,
        penalties,
        breaks,
        limited: {}
    }
}
}