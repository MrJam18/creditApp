import {changeDateFormat} from './dates/changeDateFormat'

export const prepareDataForColWrapper = (column, object) => {
    const element = {
        value: object[column.colName]
    }
    if(column.type === 'date'){
        element.show = changeDateFormat(element.value) + ' г.';
    }
    else element.show = element.value;
    return element;
}