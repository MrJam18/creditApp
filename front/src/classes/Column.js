import {capitalizeFirstLetter} from "../utils/text/capitalize";

export class Column
{
    name;
    type = 'string';
    colName;
    style = 'default';
    func;
    noChange = false;
    showEnd = '';
    ref;
    constructor(name, colName, type, options) {
        this.name = capitalizeFirstLetter(name);
        this.colName = colName;
        if(type) this.type = type;
        if(colName === 'updatedAt' || colName === 'createdAt') this.noChange = true;
        if(options) {
            if( options.style ) this.style = options.style;
            if( options.noChange ) this.noChange = options.noChange;
        }
        switch (this.type){
            case 'composed':
                this.elements = options.elements
            case 'selected':
                this.func = options.func
                break;
            case 'date':
                this.showEnd = ' г.';
                break;
            case 'money':
                this.showEnd = ' руб.';
                break;
            case 'percent':
                this.showEnd = ' %';
                break;
            case 'ref':
                this.ref = options.ref;
                if(options.refColName) this.refColName = options.refColName;
        }
    }
}