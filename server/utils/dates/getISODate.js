module.exports = function getISODate(date) {
    if(date) {
        return date.toISOString().substring(0, 10)
    }
    else{
        return new Date().toISOString().substring(0, 10);
    }

}