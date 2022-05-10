module.exports = function countPercents(days, percent, main, isLeap) {
    main = Number(main.toFixed(2));
    let sum;
    if(isLeap === true) {
        sum = main * days / 366 * percent / 100;
    }
    else {
        sum = main * days / 365 *  percent / 100;
    }
    sum = sum.toFixed(2);
    return  Number(sum);
}