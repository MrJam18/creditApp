const {moneyToDBFormat} = require("./moneyToDBFormat");
module.exports.moneyObjectToDBFormat = function (moneyHolder) {
    moneyHolder.main = moneyToDBFormat(moneyHolder.main);
    moneyHolder.percents = moneyToDBFormat(moneyHolder.percents);
    moneyHolder.penalties = moneyToDBFormat(moneyHolder.penalties);
    if(moneyHolder.fee) moneyHolder.fee = moneyToDBFormat(moneyHolder.fee);
    return moneyHolder;
}

