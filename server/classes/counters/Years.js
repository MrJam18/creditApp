const getYear = require("../../utils/getYear");
const Year = require("./Year");
const deleteCycle = require('../../utils/deleteCycle');

module.exports = class Years
{
    list = [];
    constructor(earlierDate, laterDate, payments) {
        const firstYear = +/\d{4}/.exec(earlierDate);
        const lastYear = +/\d{4}/.exec(laterDate);
        const list = [];
        for (let year = firstYear; year <= lastYear; year++) {
            const yearPayments = [];
            deleteCycle(payments, (payment, index)=> {
                if (getYear(payment.date) === year){
                    payment.index = index;
                    yearPayments.push(payment);
                    payments.splice(index, 1);
                }
            });
            const newYear = new Year(year, yearPayments);
            list.push(newYear);
        }
        this.list = list;
    }
    getFirstYear()
    {
        return this.list.shift();
    }
    getLastYear()
    {
        if(this.list.length !== 0) return this.list.pop();
        else return null;
    }
}