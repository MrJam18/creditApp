module.exports = function(date, years) {
    const newDate = date.replace(/\d{4}/, (year)=> Number(year) + years);
    return newDate;
}