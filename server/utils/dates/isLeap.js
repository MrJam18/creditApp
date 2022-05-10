module.exports = function isLeap(date){
    const year = /\d{4}/.exec(date);
    return year % 4 === 0;
}