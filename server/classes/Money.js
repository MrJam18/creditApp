const {moneyObjectToDBFormat} = require("../utils/dataBase/moneyObjectToDBFormat");
module.exports = class Money
{
    /**
     * @param {string} number number with anyFormat
     * @returns {number} standard number.
     */
    static getDBFormat (moneyHolder) {
       return moneyObjectToDBFormat(moneyHolder)
    }
    static getSum(sumHolder)
    {
        let sum = sumHolder.main + sumHolder.percents + sumHolder.penalties;
        if(sumHolder.fee) sum += sumHolder.fee;
        return sum;
    }
}