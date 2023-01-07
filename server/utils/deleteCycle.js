module.exports = function(array, callback){
    if(array.length !== 0 ) {
        let index = array.length;
        while (index--) {
            const el = array[index];
            callback(el, index, array);
        }
    }
}