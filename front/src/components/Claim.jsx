import React from 'react';
import TextField from '@mui/material/TextField';
import styles from '../css/claim.module.css'

const Claim = () => {

    return (
        <>
        
        <div className= 'background'>
        <div className="header">Поиск договора</div>
            <div className= {'contentBox' + ' ' + styles.main}>
            Укажите данные о должнике и договоре. <br/> Пример: 
            Иванов Иван Иванович, 17.04.1994, №3619 от 27.12.2021
            <TextField id="standard-basic" variant="standard" />

            {/* <TextField id="standard-basic" label="Договор" variant="standard" />
            <TextField id="standard-basic" label="суд" variant="standard" disabled />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" /> */}
            </div>
        </div>
        </>
    );
};

export default Claim;