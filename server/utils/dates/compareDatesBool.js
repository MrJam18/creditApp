
/**
 * 
 * @param {string} firstDate in All formates
 * @param {string} secondDate in All formates
 * @returns true if firstDate later then secondDate or false
 */
module.exports = function compareDatesBool(firstDate, secondDate) {
    const firstDateInJS = new Date(firstDate);
    const secondDateInJS = new Date(secondDate);
    if (firstDateInJS >= secondDateInJS) return true;
    else return false;
}