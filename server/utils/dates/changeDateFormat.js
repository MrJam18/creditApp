/**
 * @param {string} date - дата в формате ISO YYYY-MM-DD
 * @returns {string} -  дату в формате DD.MM.YYYY
 */
 const changeDateFormat = (date) => {
    const dateArray = date.split('-');
    return dateArray.reduce((acc, date) => {
    acc = date + '.' + acc;
    return acc;
});
}  
/**
 * @param {string} date - дата в русском формате DD.MM.YYYY
 * @returns {string} -  дату в формате ISO YYYY-MM-DD.
 */
const changeDateToISO = (date) => {
    const dateArray = date.split('.');
    const rightDate = dateArray.reduce((acc, date)=> {
        acc = date + '-' + acc;
        return acc;
    })
    return rightDate;
}
const changeDateTimeFormat = dateTime => {
    console.dir(dateTime);
    let [date, time] = dateTime.split('T');
    date = date.split('-');
    date = date.reduce((acc, date)=> {
        acc = date + '.' + acc;
        return acc;
    })
    time = time.substr(0, 7);
    return {date, time}
}
module.exports = {
    changeDateFormat,
    changeDateToISO,
    changeDateTimeFormat }