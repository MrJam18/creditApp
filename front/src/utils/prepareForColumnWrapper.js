import {changeDateFormatOnRus} from "./changeDateFormat";

export const prepareDataForColWrapper = (column, data) => {
    let element;
    if(typeof data === 'undefined') data = 'Не установлено';
    if(column.type === 'selected') {
        element = {
            ...column,
            colName: column.colName + 'Id',
            value: data.value,
            id: data.id
        }
    }
    else {
        element = {
            ...column,
            value: data
        }
    }
    if(column.type === 'date') element.show = changeDateFormatOnRus(element.value) + column.showEnd;
    else  element.show = element.value + column.showEnd;
    return element;
}