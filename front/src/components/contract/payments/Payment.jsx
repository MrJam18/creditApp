import React from 'react';
import {TextField} from "@mui/material";
import styles from '../../../css/contract.module.css';
import EasyInput from "../../dummyComponents/EasyInput";

const Payment = ({defaultValue = {}}) => {

 return (
  <>
      <div className='header_small' >Введите данные платежа</div>
   <TextField type='date' name='date' label='Дата платежа' defaultValue={defaultValue.date} InputLabelProps={{shrink: true}} required fullWidth size='small' className={styles.payment__input} />
      <EasyInput  label='сумма платежа' name='sum' pattern='float'  defaultValue={defaultValue.sum} required fullWidth size='small' className={styles.payment__input} variant='outlined' />
  </>
 );
};

export default Payment;