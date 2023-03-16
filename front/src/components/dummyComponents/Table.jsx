
import React, { useEffect, useRef, useState } from 'react';
import styles from '../../css/table.module.css'
import {chandeDateFormatOnRus} from '../../utils/changeDateFormat';
import SortButton from './SortButton';
import Loading from './Loading';

const Table = ({rows, headers, RightButton, sortHandler, focus, loading}) => {
    const table = useRef();
    const [Rows, SetRows] = useState([]); 
    useEffect(()=> {
    if(!loading){
        const changedRows = rows.map(row => {
        let array = []
        const copyRow = {...row};
        const cellId = copyRow.id;
        delete copyRow.id;
        headers.forEach((el) => {
            for (const key in copyRow) {
                if(key === el.key) {
                    let cellValue = copyRow[key];
                if (el.type === 'date') cellValue = chandeDateFormatOnRus(cellValue);
            array.push(<td className={styles.cell}>{cellValue}</td>)
        }
        }
    });
    return ( 
        <tr key={cellId} className={styles.rows}>
           {array} <td className={"position_relative antipadding" + ' ' + styles.rightButtonParent}> <RightButton id={cellId} /> </td>
            </tr> )
        });
        SetRows(changedRows);
    }
}, [rows, loading]);
    const Headers = headers.map((header, index) => <th key={index} className={styles.header}>{header.name} <SortButton  sortHandler={sortHandler} header={header} focus={focus}/></th>)
    
    return (
    <table className={styles.table} ref={table}>
        <thead>
            <tr className={styles.headers}>
                {Headers}
            </tr>
        </thead>
        {loading ? <Loading addStyles={{left: '258%'}}/> : 
        <tbody>
            {Rows}
        </tbody>
        } 
        
        </table>
        
    );
};

export default Table;