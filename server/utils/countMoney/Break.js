module.exports = class Break {
    constructor(date, isLeap, main, percents, penalties, payment, percentsCounted = true, penaltyCounted = true){
        this.date = date;
        this.isLeap = isLeap;
        this.main = main;
        this.percents =  percents
        this.penalties =  penalties;
        this.percentsCounted = percentsCounted;
        this.penaltyCounted = penaltyCounted;
        if(payment) this.payment = payment;
    }
}

