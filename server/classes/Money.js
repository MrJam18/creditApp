module.exports = class Money
{
    /**
     * @param {string} number number with anyFormat
     * @returns {number} standard number.
     */
    static getDBFormat (number) {
        if (/,/.test(number)) {
            return Number(number.replace(',', '.'));
        }
        else return Number(number);
    }
    static getSum(sumHolder)
    {
        let sum = sumHolder.main + sumHolder.percents + sumHolder.penalties;
        if(sumHolder.fee) sum += sumHolder.fee;
        return sum;
    }
}