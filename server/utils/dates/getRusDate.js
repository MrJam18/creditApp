module.exports.getRusDate = function(date) {
    if(date) {
        date = new Date(date);
        return date.toLocaleString('ru').substring(0, 10);
    }
    else{
        return new Date().toLocaleString('ru').substring(0, 10);
    }
}