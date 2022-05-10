import { countDays } from "./countDays"
import { isLeapsYears } from "./isLeapsYears";

export const countPercents = (percent, issued, startDate, endDate) => {
    let sum = 0;
    let years = isLeapsYears(startDate, endDate);
    if (years.length = 1) {
        const days = countDays(startDate, endDate) -1;
        if(years[0].isLeap === true) {
        sum = issued * days / 366 *  percent / 100;
        }
        else {
        sum = issued * days / 365 *  percent / 100;
        }
    }
    else {
        const firstYear = years.shift();
        const firstDays = countDays(startDate, firstYear.year + 1 + '-01-01') -1;
        if(firstYear.isLeap === true) {
            sum = issued * firstDays / 366 *  percent / 100;
        }
        else {
            sum = issued * firstDays / 365 *  percent / 100;
        }
            const lastYear = years.pop();
            const lastDays = countDays(lastYear.year + '-01-01', endDate);
            if(lastYear.isLeap === true) {
                sum += issued * lastDays / 366 *  percent / 100;
            }
            else {
                sum += issued * lastDays / 365 *  percent / 100;
            }
       if (years.length != 0) {
        years.forEach((el)=> {
            const days = countDays(el.year + '-01-01', el.year + 1 + '-01-01');
            if(el.isLeap === true) {
                sum += issued * days / 366 *  percent / 100;
            }
            else {
                sum += issued * days / 365 *  percent / 100;
            }
        })
    }
    }
    return sum.toFixed(2);
}