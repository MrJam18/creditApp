import {compareDatesBool} from "./dates/compareDatesBool";

export const getLastInfo = (data) => {
    const info = [...data];
    let lastInfo = data[0];
    info.shift();
    if(info.length !== 0){
        info.forEach((el)=> {
            if(compareDatesBool(el.transferDate, lastInfo.transferDate)){
                lastInfo = el;
            }
        })
    }
    return lastInfo;
}