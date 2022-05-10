const compareDatesBool = require("../dates/compareDatesBool");
const countDays = require("../dates/countDays");
const countOtherInOneYear = require("./countOtherInOneYear");
const countPercentsInOneYear = require("./countPercentsInOneYear");
const Break = require('./Break');



module.exports = function countAllInYear(year, percent, penalty, main, percents, penalties, startDate, endDate, dueDate, breaks) {
if(dueDate){
    if(startDate && endDate)  {
        if(year.payments.length > 0) {
            if(compareDatesBool(year.payments[0].date > dueDate)){
                const penaltyDays = countDays(dueDate, year.payments[0].date);
                penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
            }
            const days = countDays(startDate, year.payments[0].date); 
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
            percents = limited.percents;
            limited.stop = true;
            percents = limited.percents - penalties;
            limited.stop = true;
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
                        if(!limited.stop){
                        let days = countDays(el.date, year.payments[index+1].date);
                        percents += countPercentsInOneYear(days, percent, main, year.isLeap);
                        }
                        if(!limited.stop && !limited.limitPenalty){
                        if(compareDatesBool(year.payments[index+1].date, dueDate)){
                            let penaltyDays;
                            if(compareDatesBool(el.date, dueDate)) penaltyDays = countDays(el.date, year.payments[index+1].date);
                            else penaltyDays = countDays(dueDate, year.payments[index+1].date);
                            penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                        }
                    }
                } 
                else {
                        let days = countDays(el.date, endDate);
                        percents += countPercentsInOneYear(days, percent, main, year.isLeap);
                        if(compareDatesBool(el.date, dueDate)){
                            const penaltyDays = countDays(el.date, endDate);
                            penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                        }
                        else {
                            const penaltyDays = countDays(dueDate, endDate);
                            penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                        }
                    }
                })

        }
        else {
            const days = countDays(startDate, endDate);
            const penaltyDays = countDays(dueDate, endDate)
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
            penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
        }
        }
    else if(startDate) {
        if(year.payments.length > 0) {
            let days = countDays(startDate, year.payments[0].date);
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
            if(compareDatesBool(year.payments[0].date, dueDate)){
                const penaltyDays = countDays(dueDate, year.payments[0].date);
                penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
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
                        const days = countDays(el.date, year.payments[index+1].date);
                        percents += countPercentsInOneYear(days, percent, main, year.isLeap);
                        if(compareDatesBool(year.payments[index+1].date, dueDate)){
                            let penaltyDays;
                            if(compareDatesBool(el.date, dueDate)) penaltyDays = countDays(el.date, year.payments[index+1].date);
                            else penaltyDays = countDays(dueDate, year.payments[index+1].date);
                            penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                        }
                        breaks.push(new Break(year.payments[index+1].date, year.isLeap, percents, penalties, year.payments[index + 1]));
                } 
                else {
                        const days = countDays(el.date, year.year + '-12-31');
                        percents += countPercentsInOneYear(days, percent, main, year.isLeap);
                        if(compareDatesBool(el.date, dueDate)){
                            const penaltyDays = countDays(el.date, year.year + '-12-31');
                            penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                        }
                        else {
                            const penaltyDays = countDays(dueDate, year.year + '-12-31');
                            penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                        }   
                    }
                })

        }
        else {
            const days = countDays(startDate, year.year + '-12-31');
            const penaltyDays = countDays(dueDate, year.year + '-12-31');
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
            penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
        }


    }
    else if(endDate) {
        if(year.payments.length > 0) {
            const days = countDays(year.year + '-01-01', year.payments[0].date) + 1;
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
            if(compareDatesBool(year.payments[0].date, dueDate)){
                const penaltyDays = countDays(dueDate, year.payments[0].date);
                penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
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
                    const days = countDays(el.date, year.payments[index+1].date);
                    percents += countPercentsInOneYear(days, percent, main, year.isLeap);
                    if(compareDatesBool(year.payments[index+1].date, dueDate)){
                        let penaltyDays;
                        if(compareDatesBool(el.date, dueDate)) penaltyDays = countDays(el.date, year.payments[index+1].date);
                        else penaltyDays = countDays(dueDate, year.payments[index+1].date);
                        penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                    }
                } 
                else {
                    const days = countDays(el.date, endDate);
                    percents += countPercentsInOneYear(days, percent, main, year.isLeap);
                    if(compareDatesBool(el.date, dueDate)){
                        const penaltyDays = countDays(el.date, endDate);
                        penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                    }
                    else {
                        const penaltyDays = countDays(dueDate, endDate);
                        penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                    }   
                    }
                })

        }
        else {
            const days = countDays(year.year + '-01-01', endDate) + 1;
            const penaltyDays = countDays(dueDate, endDate);
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
            penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
        }
    }
    else {
        if(year.payments.length > 0) {
            let days = countDays(year.year + '-01-01', year.payments[0].date) + 1;
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
            if(compareDatesBool(year.payments[0].date, dueDate)){
                const penaltyDays = countDays(dueDate, year.payments[0].date);
                penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
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
                        if(compareDatesBool(year.payments[index+1].date, dueDate)){
                            let penaltyDays;
                            if(compareDatesBool(el.date, dueDate)) penaltyDays = countDays(el.date, year.payments[index+1].date);
                            else penaltyDays = countDays(dueDate, year.payments[index+1].date);
                            penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                        }
                } 
                else {
                        let days = countDays(el.date, year.year + '-12-31');
                        percents += countPercentsInOneYear(days, percent, main, year.isLeap);
                        if(compareDatesBool(el.date, dueDate)){
                            const penaltyDays = countDays(el.date, year.year + '-12-31');
                            penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                        }
                        else {
                            const penaltyDays = countDays(dueDate, year.year + '-12-31');
                            penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
                        }   
                        }
            })

        }
        else {
            const days = countDays(year.year + '-01-01', year.year + '-12-31') + 1;
            const penaltyDays = countDays(dueDate, year.year + '-12-31');
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
            penalties += countPercentsInOneYear(penaltyDays, penalty, main, year.isLeap);
        }
    }
}
else {
    if(startDate && endDate)  {
        if(year.payments.length > 0) {
            const days = countDays(startDate, year.payments[0].date);
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
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
                } 
                else {
                        let days = countDays(el.date, endDate);
                        percents += countPercentsInOneYear(days, percent, main, year.isLeap);
                    }
                })

        }
        else {
            const days = countDays(startDate, endDate);
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
        }
        }
    else if(startDate) {
        if(year.payments.length > 0) {
            let days = countDays(startDate, year.payments[0].date);
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
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
                        const days = countDays(el.date, year.payments[index+1].date);
                        percents += countPercentsInOneYear(days, percent, main, year.isLeap);
                } 
                else {
                        const days = countDays(el.date, year.year + '-12-31');
                        percents += countPercentsInOneYear(days, percent, main, year.isLeap);
                    }
                })

        }
        else {
            const days = countDays(startDate, year.year + '-12-31');
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
        }


    }
    else if(endDate) {
        if(year.payments.length > 0) {
            const days = countDays(year.year + '-01-01', year.payments[0].date) + 1;
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
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
                    const days = countDays(el.date, year.payments[index+1].date);
                    percents += countPercentsInOneYear(days, percent, main, year.isLeap);
                } 
                else {
                    const days = countDays(el.date, endDate);
                    percents += countPercentsInOneYear(days, percent, main, year.isLeap);
                    }
                })

        }
        else {
            const days = countDays(year.year + '-01-01', endDate) + 1;
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
        }
    }
    else {
        if(year.payments.length > 0) {
            let days = countDays(year.year + '-01-01', year.payments[0].date) + 1;
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
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
                } 
                else {
                        let days = countDays(el.date, year.year + '-12-31');
                        percents += countPercentsInOneYear(days, percent, main, year.isLeap);
                        }
            })

        }
        else {
            const days = countDays(year.year + '-01-01', year.year + '-12-31') + 1;
            percents += countPercentsInOneYear(days, percent, main, year.isLeap);
        }
    }

}
    return {
        year,
        main,
        percents,
        penalties,
        breaks
    }

}