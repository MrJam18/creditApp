
module.exports = class Year
{
    year;
    payments;
    isLeap;
    constructor(year, payments = [] ) {
        this.year = year;
        this.isLeap = year % 4 === 0;
        this.payments = payments;
    }

    getLastYearDate()
    {
        return this.year  + '-12-31';
    }
}