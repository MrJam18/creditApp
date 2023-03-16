/**
 * Определяет, является ли дата больше текущей.
 *
 * @param {string} date дата в формате ISO YYYY-MM-DD.
 * @return {boolean} boolean -- true, если дата больше текущей, иначе false.
 */
export const moreThenNow = (date) => {
    const checkDate = new Date(date);
    const nowDate = new Date();

    if (checkDate > nowDate) return true;
    return false;
}