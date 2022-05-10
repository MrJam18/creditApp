import React, { useEffect, useRef, useState } from 'react';
import styles from '../../css/noBorderTable.module.css'
import {chandeDateFormatOnRus} from '../../utils/changeDateFormat';
import SortButton from './SortButton';
import Loading from './Loading';

const NoBorderTable = ({rows = [], headers = [], sortHandler, focus, loading, rowsButtons, onClickRow}) => {
    const table = useRef();
    let Rows = [];
    const [empty, setEmpty] = useState(false);
    const doRows = () => {
        if (!loading && rows.length != 0) {
            Rows = rows.map((row, index) => {
                let array = []
                const copyRow = {...row};
                const cellId = copyRow.id;
                delete copyRow.id;
                delete copyRow.ref;
                headers.forEach((el) => {
                    let find = false;
                for (const key in copyRow) {
                    if(key === el.key) {
                        find = true;
                        let cellValue = copyRow[key];
                    if (el.type === 'date') cellValue = chandeDateFormatOnRus(cellValue);
                    array.push(<td className={styles.row}>
                        <div className={styles.rowContainer}>
                        {cellValue}</div>
                        </td>)
                        break;
                    }
                }
                if (!find) {
                    array.push(<td key={cellId} className={styles.row}>
                        <div className={styles.rowContainer}></div>
                        </td>)
                }
            })
            if(rowsButtons){
                return ( 
                    <tr key={cellId} data-index={index} onClick={onClickRow} className={styles.clickableRow}>
                        {array}
                        </tr> )
            }
            return ( 
            <tr key={cellId} className={styles.rows}>
                {array}
                </tr> )
        });
    }
    }
    useEffect(()=> {
        if(rows.length === 0 && !loading) {
            setEmpty(true);
        }
        else setEmpty(false);
    }, [rows, loading])
    
    let Headers;
    const doHeaders = () => {
        Headers = headers.map((header, index) => <th style={header.styles ? header.styles : null} key={index} className={styles.header}>{header.name} <SortButton  sortHandler={sortHandler} header={header} focus={focus}/></th>)
    }
    doRows()
    doHeaders()
    return ( 
        <>
    <table className={styles.table} ref={table}>
        <thead>
            <tr className={styles.headers}>
                {Headers}
            </tr>
        </thead>
        { !loading && 
        <tbody>
            {Rows}
        </tbody>
        } 
        </table>
        {empty && <div className={'center' + ' ' + styles.emptyText}>Нет ни одной записи</div>}
       {loading && <div className='center'> <Loading /> </div> }
       </>
    );
};

export default NoBorderTable;