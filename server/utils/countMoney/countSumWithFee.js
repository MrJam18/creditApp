module.exports = function(result){
    return (+result.main + +result.percents + +result.penalties + +result.fee).toFixed(2);

}