const getYear = require("../../utils/getYear");
const Year = require("./Year");
const deleteCycle = require('../../utils/deleteCycle');
const Payment = require("../../documents/Controllers/Payment");

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
                    payment = new Payment(payment.date, payment.sum, null, null, null, payment.contractId, payment.id);
                    yearPayments.unshift(payment);
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
        return this.list[0]
    }
    getLastYear()
    {
        if(this.list.length > 1) return this.list[this.list.length - 1]
        else return null;
    }
    getOtherYears()
    {
        if(this.list.length <= 2) return [];
        else {
            const list = [...this.list];
            list.shift();
            list.pop();
            return list;
        }
    }
}