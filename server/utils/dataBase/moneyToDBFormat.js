module.exports.moneyToDBFormat = function(number) {
    if (/,/.test(number)) {
        return Number(number.replace(',', '.'));
    }
    else return Number(number);
}