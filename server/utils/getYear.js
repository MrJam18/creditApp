module.exports = function getYear(date) {
    const year = Number(/\d{4}/.exec(date)[0]);    
    return year;
}