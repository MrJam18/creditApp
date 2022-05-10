module.exports = function (limited, accruedPercents = 0, percents) {
    limited.percents -= accruedPercents;
    if(limited.percents <= 0) {
        percents += limited.percents;
        limited.stop = true;
    }
    return {
        limited,
        percents
    }
    }