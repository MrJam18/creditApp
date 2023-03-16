/**
 * @param {string} date - дата в формате ISO YYYY-MM-DD
 * @returns {string}  дату в формате DD.MM.YYYY
 */
const changeDateFormatOnRus = (date) => {
    if (date) {
    const dateArray = date.split('-');
    return dateArray.reduce((acc, date) => {
    acc = date + '.' + acc;
    return acc;
});
    }
    return null;
}
const changeDateFormatOnISO = (date) => {
    const dateArray = date.split('.');
    return dateArray.reduce((acc, date) => {
        acc = date + '-' + acc;
        return acc;
    });
}  
export {changeDateFormatOnRus, changeDateFormatOnISO, changeDateFormatOnRus as chandeDateFormatOnRus}