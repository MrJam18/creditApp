module.exports = function (date, days) {
    let changedDate = new Date(date);
    changedDate.setDate(changedDate.getDate() + days);
    changedDate = changedDate.toISOString().slice(0,10);
    return changedDate;
};