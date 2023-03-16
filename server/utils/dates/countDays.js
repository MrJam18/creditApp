module.exports = function countDays (earlierDate, laterDate) {
    const firstDate = new Date(earlierDate);
    let secondDate;
    if (!laterDate) {
        secondDate = new Date();
    }
    else {
       secondDate = new Date(laterDate);
    }
 const oneDay = 1000 * 60 * 60 * 24; 
 return Math.round(((secondDate.getTime() - firstDate.getTime()) / oneDay)); 

}