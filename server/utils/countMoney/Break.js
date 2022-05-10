module.exports = class Break {
    constructor(date, isLeap, percents, penalties, payment, stopPercents = false, stopPenalties = false){
        this.date = date;
        this.isLeap = isLeap;
        this.percents =  percents.toFixed(2);
        this.penalties =  penalties.toFixed(2);
        this.stopPercents = stopPercents;
        this.stopPenalties = stopPenalties;
        if(payment) this.payment = payment;
    }
}