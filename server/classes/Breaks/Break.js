module.exports = class Break {
    date;
    isLeap;
    payment;
    main;
    constructor(date, isLeap, main, percents, penalties, payment, stopPercents = false, stopPenalties = false){
        this.date = date;
        this.isLeap = isLeap;
        this.main = main;
        this.percents =  percents
        this.penalties =  penalties;
        this.stopPercents = stopPercents;
        this.stopPenalties = stopPenalties;
        if(payment) this.payment = payment;
    }
}

