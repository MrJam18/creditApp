module.exports = function countPaid (currentPercents, currentMain, paymentSum, ) {
    let percents = 0;
    let main = 0;
    let penalties = 0;
    if(currentPercents < 0) {
        const notNullPercents = currentPercents + paymentSum;
        percents += notNullPercents;
        main -= currentPercents;
        currentMain += currentPercents
        if (currentMain < 0) {
            penalties = Math.abs(currentMain);
        }
    }
    else {
        percents += years[0].payment.sum;
    }
    return {
        percents, penalties, main
    }
}