
/**
 *
 * @param {string} firstDate in All formates
 * @param {string} secondDate in All formates
 * @returns true if firstDate later then secondDate or false
 */
export function compareDatesBool(firstDate, secondDate) {
    const firstDateInJS = new Date(firstDate);
    const secondDateInJS = new Date(secondDate);
    return firstDateInJS >= secondDateInJS;
}