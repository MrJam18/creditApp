/**
 * 
 * @param {*} firstDate in all formates.
 * @param {*} secondDate in all formates.
 * @returns firstDate if later secondDate or secondDate;
 */

module.exports = function compareDates(firstDate, secondDate) {
    const firstDateInJS = new Date(firstDate);
    const secondDateInJS = new Date(secondDate);
    if (firstDateInJS > secondDateInJS) return firstDate;
    else return secondDate;
}