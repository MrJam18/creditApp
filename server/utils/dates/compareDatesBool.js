
const {changeDateToISO} = require("./changeDateFormat");

/**
 *
 * @param {string} firstDate in All formates
 * @param {string} secondDate in All formates
 * @returns true if firstDate later then secondDate or false
 */
module.exports = function compareDatesBool(firstDate, secondDate) {
    const regExp = /./;
    if(regExp.test(firstDate)) firstDate = changeDateToISO(firstDate);
    if(regExp.test(secondDate)) secondDate = changeDateToISO(secondDate);
    const firstDateInJS = new Date(firstDate);
    const secondDateInJS = new Date(secondDate);
    return firstDateInJS >= secondDateInJS;
}
