/**
 * 
 * @param {string} date date in string in RUS format 
 * @returns true if is date or false
 */
module.exports = function(date) {
    if(/^\d{2}\.\d{2}\.\d{4}$/.test(date)){
        return true
    }
    return false;
}