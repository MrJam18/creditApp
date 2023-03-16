const {changeDateToISO} = require("./changeDateFormat");

module.exports = function (firstDate, secondDate) {
    const regExp = /./;
    if(regExp.test(firstDate)) firstDate = changeDateToISO(firstDate);
    if(regExp.test(secondDate)) secondDate = changeDateToISO(secondDate);
    const firstDateInJS = new Date(firstDate).getTime();
    const secondDateInJS = new Date(secondDate).getTime();
    return firstDateInJS === secondDateInJS;
}