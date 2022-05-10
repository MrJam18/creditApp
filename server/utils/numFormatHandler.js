const numFormatHandler = (number) => {
    if (/,/.test(number)) {
        return Number(number.replace(',', '.'));
    }
    else return Number(number);

}
module.exports = numFormatHandler;