const getRubles = require('../../utils/countMoney/getRubles');

module.exports = class Payment
{
    sum;
    #main;
    #percents;
    #penalties;
    date;
    id;
    contractId;
    set main(val) {
        this.#main = getRubles(val);
    }
    get main() {
        return this.#main
    }
    set percents(val) {
        this.#percents = getRubles(val);
    }
    get percents() {
        return this.#percents;
    }
    set penalties(val) {
        this.#penalties = getRubles(val);
    }
    get penalties() {
        return this.#penalties;
    }
    constructor(date, sum, main = 0, percents = 0, penalties = 0, contractId = null, id = null) {
        this.date = date;
        this.main = main;
        this.percents = percents;
        this.penalties = penalties;
        if(!sum) this.sum = main + percents + penalties;
        else this.sum = sum;
        this.contractId = contractId;
        this.id = id;
    }
    getPlain()
    {
        return {
            ...this,
            main: this.main,
            percents: this.percents,
            penalties: this.penalties,
        }
    }
}