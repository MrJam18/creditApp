import React, {Fragment} from 'react';
import ColumnsWrapper from "./ColumnsWrapper";

const BaseColumner = ({columns, data, reqFunction, setters}) => {
    let goodColumns = [...columns];
    goodColumns = goodColumns.map((column)=> {
        if(column.refColName){
            column.ref = column.ref + '/' + data[column.refColName];
            delete column.refColName;
        }
        if(column.type === 'setter') setters.find((el, index)=> {
            if(el.colName === column.colName) {
                column.setter = el.func;
                setters.slice(index, 1);
                return true;
            }
        });
        return <ColumnsWrapper key={column.colName} reqFunction={reqFunction} column={column} data={data[column.colName]} />
    })
    return (
        <>
                {goodColumns}
        </>
    );
};

export default BaseColumner;