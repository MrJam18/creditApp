
import { makeStyles } from '@mui/styles';
import { Button, Modal, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { isNumber } from '../../utils/isNumber';
import {formDataConverter} from '../../utils/formDataConverter'
import { useParams } from 'react-router';
import { setAlert } from '../../store/alert/actions';
import Table from '../dummyComponents/Table';
import styles from '../../css/contract.module.css'
import { getPayments, getPaymentsError, getPaymentsLoading, getTotalPayments } from '../../store/contracts/payments/selectors';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { addPayment, deletePayment, recievePaymentsPage, sortPayments } from '../../store/contracts/payments/actions';
import Pagination from '../dummyComponents/Pagination';

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
    useEffect(()=> {
      if(error) setAlert('Ошибка!', error, 'error')
    },[error]);
    useEffect( async()=>{
      await dispatch(recievePaymentsPage(contractId, 1, 10, orderField, orderType))
    }, []);
    // useEffect(()=> {
    //   const changedRows = payments.map((el)=> {
    //     let object = {};
    //     object.id = el.id
    //     headers.forEach((headerEl)=> {
    //       object[headerEl.key] = el[headerEl.key];       
    //     });
    //     return object;
    //   });
    //   setRows(changedRows);
    // },[payments])
  
    return (
        <div className={styles.payments}>
            <div className={styles.header_small}>Управление платежами</div>

            <Toolbar />
             <Table rows={payments} headers={headers} RightButton={DeletePayment} sortHandler={sortHandler} focus={focus} loading={loading}/> 
            <Pagination  pageUpdater={changePage} total={totalPayments}/>
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
        <AddPayment modal={modal} setModal={setModal} lastAdd={lastAdd} setLastAdd={setLastAdd} />
      </div>
    );
  }


  const AddPayment = ({ modal, setModal, lastAdd, setLastAdd})=> {
        const classes = useStyles();
        const { contractId } = useParams();
        const dispatch = useDispatch();
        const form = useRef();
        const [error, setError] = useState(false);
        const [loading, setLoading] = useState(false);
        const handleClose = ev => {
            setModal(false);
            setError(false);
            setLoading(false);
            }
        const formHandler = async (ev) => {
            ev.preventDefault();
            const data = form.current.elements;
            if (isNumber(data.sum.value) && data.percents.value !== '') {
                setError('Информация о платеже, кроме даты, должна быть числом!')
            }
            else {
                setLoading(true);
                const payment = formDataConverter(data);    
                try{
                await dispatch(addPayment(payment, contractId));
                dispatch(setAlert('Успешно!', 'Платеж успешно добавлен!'));                
                setModal(false);
                }
                catch(e) {
                    setError(e.message)
                }
                finally{
                    setLoading(false);
                }
              }
            }
            const ModalChildren = React.forwardRef(()=> <div className={'contentBox__fixedCenter' + ' ' + styles.addPayment}>
            <h3 className={styles.header} id="child-modal-title">Введите данные платежа</h3>
        <form onSubmit={formHandler} ref={form}>
        <TextField type='date' name='date' label='Дата платежа' defaultValue={lastAdd?.date} InputLabelProps={{shrink: true}} required fullWidth size='small' className={classes.addPayment__input} />
        <TextField label='cумма платежа' name='sum' defaultValue={lastAdd?.sum} required fullWidth size='small' className={classes.addPayment__input} />
        {/* <TextField  label='осн. долг' name='main' defaultValue={lastAdd?.main} fullWidth size='small' className={classes.addPayment__input} />
        <TextField label='проценты' name='percents' defaultValue={lastAdd?.percents} fullWidth size='small' className={classes.addPayment__input} />
        <TextField  label='неустойка' name='penalties' defaultValue={lastAdd?.penalties} fullWidth size='small' className={classes.addPayment__input} /> */}

        <LoadingButton loading={loading} type='submit' variant='contained' className={classes.button}>Подтвердить </LoadingButton> 
        <div className="error">{error}</div>
        </form>
    </div> )
    return <div className='position_relative'>
    <Modal onBackdropClick={handleClose} 
    open={modal}
    onClose={handleClose}
    // aria-labelledby="child-modal-title"
    // aria-describedby="child-modal-description"
    className= {classes.modal}
    >
       <ModalChildren/>
    </Modal>
    </div>
}
function DeletePayment({id}) {
  const {contractId} = useParams();
  const dispatch = useDispatch();
  const deletePaymentHandler = async (ev) => {
    try{
    const paymentId = ev.currentTarget.getAttribute('dataid');
    await dispatch(deletePayment(paymentId, contractId));
    dispatch(setAlert('Успешно!', "Платеж успешно удален!"))
    }
    catch(e){
      dispatch(setAlert('Ошибка!', "Ошибка удаления платежа:" + e.message, 'error'));
    }
}
  return (<button className={'position_absolute antibutton' + ' ' + styles.payments__rightButton} onClick={deletePaymentHandler} dataid={id} >
      <FontAwesomeIcon icon={solid('xmark')} className={styles.payments__delButton} /></button>
  )

}



export default ContractPayments;
