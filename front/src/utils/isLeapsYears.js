export function isLeapsYears (earlierDate, laterDate) {
    const firstYear = /\d{4}/.exec(earlierDate);
    let lastYear
if (!laterDate) {
    const now = new Date();
    lastYear = now.getFullYear();
}
else {
    lastYear = +/\d{4}/.exec(laterDate);
}
let yearsArray = [];
    for (let i = +firstYear; i <= lastYear; i++) {
        const data = {
            year: i,
            isLeap: i % 4 === 0
        }
        yearsArray.push(data)
    }
return yearsArray;

}
