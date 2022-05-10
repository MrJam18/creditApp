const numFormatHandler = require("./numFormatHandler");

module.exports = function(numHolder) {
    numHolder.main = numFormatHandler(numHolder.main);
    numHolder.percents = numFormatHandler(numHolder.percents);
    numHolder.penalties = numFormatHandler(numHolder.penalties);
    if(numHolder.fee) numHolder.fee = numFormatHandler(numHolder.fee);
    return numHolder;
}