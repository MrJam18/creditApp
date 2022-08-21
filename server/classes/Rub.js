
module.exports = class Rub
{
    sum = 0;
    set sum(val) {
        this.sum = +val.toFixed(2);
    }
}