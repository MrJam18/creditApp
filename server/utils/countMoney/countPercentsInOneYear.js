module.exports = function countPercents(days, percent, main, isLeap) {
    let sum;
    if(isLeap === true) {
        sum = main * days / 366 * percent / 100;
    }
    else {
        sum = main * days / 365 *  percent / 100;
    }
    return  sum
}