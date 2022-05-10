/**
 * @param {string} date - дата в формате ISO YYYY-MM-DD
 * @returns {string}  дату в формате DD.MM.YYYY
 */
const chandeDateFormatOnRus = (date) => {
    if (date) {
    const dateArray = date.split('-');
    const rightDate = dateArray.reduce((acc, date)=> {
        acc = date + '.' + acc;
        return acc;
    })
return rightDate;
    }
    return null;
}
const changeDateFormatOnISO = (date) => {
    const dateArray = date.split('.');
    const rightDate = dateArray.reduce((acc, date)=> {
        acc = date + '-' + acc;
        return acc;
    })
    return rightDate;
}  
export {chandeDateFormatOnRus, changeDateFormatOnISO}