const compareDatesBool = require('./dates/compareDatesBool');

module.exports = function(data) {
    let lastCessionsInfo = data[0];
    const info = [...data];
    info.shift();
    if(info.length !== 0){
        info.forEach((el)=> {
            if(compareDatesBool(el.transferDate, lastCessionsInfo.transferDate)){
                lastCessionsInfo = el;
            }
        })
    }
    return lastCessionsInfo;
}