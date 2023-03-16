
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { useParams } from 'react-router';
import { setAlert } from '../../../store/alert/actions';
import styles from '../../../css/contract.module.css'
import { getPayments, getPaymentsError, getPaymentsLoading, getTotalPayments } from '../../../store/contracts/payments/selectors';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { deletePayment, recievePaymentsPage } from '../../../store/contracts/payments/actions';
import Pagination from '../../dummyComponents/Pagination';
import NoBorderTable from "../../dummyComponents/NoBorderTable";
import AddPayment from "./AddPayment";
import ChangePayment from "./ChangePayment";

const useStyles = makeStyles({
      grid: {
          height: 'auto',
          width: '50%',
          justifyContent: 'flex-end'
      },
      modal: {
          position: 'absolute',
  
      },
      button: {
          marginTop: '15px',
           width: '40%'
       },
       addPayment__input: {
          marginTop: '10px'
       },
       payments__toolBarButton: {
         width: 'auto'
       }
  })
 
const ContractPayments = () => {
    const [focus, setFocus] = useState(false);
    const [orderField, setOrderField] = useState('date');
    const [orderType, setOrderType] = useState('ASC');
    const dispatch = useDispatch();
    const {contractId} = useParams();
    const payments = useSelector(getPayments);
    const [changedPayment, setChangedPayment] = useState(false);
    const totalPayments = useSelector(getTotalPayments);
    const loading = useSelector(getPaymentsLoading);
    const error = useSelector(getPaymentsError);
    const headers = [{name: 'Дата', key: 'date', type: 'date'},{ name: "Сумма", key: 'sum', type: 'number'}, {name: "Осн. долг", key: 'main', type: 'number'}, {name: "Проценты", key: 'percents', type: 'number'}, {name: "Неустойка", key: 'penalties', type: 'number'}];
    const changePage = async (limit=10, page=1)=> {
      await dispatch(recievePaymentsPage(contractId, page, limit, orderField, orderType));
    }
    const sortHandler = async (field, type = "ASC") => {
      setOrderField(field);
      setOrderType(type);
      setFocus(field);
     await dispatch(recievePaymentsPage(contractId, 1, 25, field, type));
    }
    const onClickRow = (index) => {
        setChangedPayment(payments[index]);
    }
    useEffect(()=> {
      if(error) setAlert('Ошибка!', error, 'error')
    },[error]);
    useEffect( async()=>{
        try{
            await dispatch(recievePaymentsPage(contractId))
        }
        catch (e){
            console.log(e)
        }

    }, []);

    return (
        <div className={styles.payments}>
            <div className={styles.header_small}>Управление платежами</div>
            <Toolbar />
            <NoBorderTable headers={headers} rows={payments} loading={loading} onClickRow={onClickRow} focus={focus} sortHandler={sortHandler} rowsButtons />
            <Pagination  pageUpdater={changePage} total={totalPayments} />
            {changedPayment && <ChangePayment setShow={setChangedPayment} payment={changedPayment} /> }
        </div>
    );
};

function Toolbar() {
    const classes = useStyles();
    const [modal, setModal] = useState(false);
    const [lastAdd, setLastAdd] = useState();
    const buttonHandler = () => {
        setModal(true);
    }
    return (
      <div className={styles.payments__toolbar}>
        <Button variant="text" onClick={buttonHandler} className={classes.payments__toolBarButton}><FontAwesomeIcon icon={solid('plus')} className={styles.payments__addIcon}/> Добавить</Button>
          { modal && <AddPayment setModal={setModal} lastAdd={lastAdd} setLastAdd={setLastAdd} /> }
      </div>
    );
  }



export default ContractPayments;
