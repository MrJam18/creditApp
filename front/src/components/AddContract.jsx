import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../css/addContract.module.css';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { chandeDateFormatOnRus } from '../utils/changeDateFormat';
import LoadingButton from '@mui/lab/LoadingButton';
import { moreThenNow } from '../utils/moreThenNow'
import { isNumber } from '../utils/isNumber';
import { useDispatch, useSelector } from 'react-redux';
import { findCessions, setCessions } from '../store/cessions/actions';
import { getCessionsList } from '../store/cessions/selectors';
import { getOrganizationsSearchList } from '../store/organizations/selectors';
import { findOrganizations } from '../store/organizations/actions';
import { formDataConverter } from '../utils/formDataConverter';
import { setAlert } from '../store/alert/actions';
import { createContract } from '../store/contracts/actions';
import CustomSelect from './dummyComponents/CustomSelect'
import { getList } from '../store/debtors/actions';
import CustomModal from './dummyComponents/CustomModal';
import CustomSearch from './dummyComponents/CustomSearch';
import { organizationsSlice } from '../store/organizations/reducer';


const useStyles = makeStyles({
    input: {
        marginBottom: '8px',
        width: '45%'
    },
    checkbox: {
        width: '160px',
        lineHeight: 1.2,
        marginLeft: '55px'
        },
    smallInput: {
        width: '225px',
    },
    button: {
        width: '50%',
        height: '35px',
    },
    selectLabel: {
        alignSelf: 'baseline',
        fontSize: '12px',
        lineHeight: '16.2px'
    },
    fullWidthLabel: {
        color: 'black',
        lineHeight: '16.2px',
        marginBottom: '5px'
    },
    input_small: {
        width: '150px',
        marginBottom: '10px'
    },
    button_small: {
        width: '100%'
    }

});

const AddContract = ({show, setShow, debtorId}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [contractType, setContractType] = useState('1');
    const contractName = useRef();
    const paymentDateRef = useRef();
    const paymentSumRef = useRef();
    const formRef = useRef();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const cessions = useSelector(getCessionsList);
    const organizations = useSelector(getOrganizationsSearchList);
    const [cession, setCession] = useState({value: 'Принадлежит выдавшей организации', id: 3});
    const [organization, setOrganization] = useState();
    const onChangeOrganizations = (val) => {
        dispatch(findOrganizations(val, setError));
    }
    const onChooseOrganization = (val) => {
        setOrganization(val);
    } 
    const onChangeCessions = (val) => {
        dispatch(findCessions(val, setError));
    }
    const onChooseCession = (val) => {
        setCession(val);
    }

    const contractTypeHandler = ev => {
        setContractType(ev.target.value);
        if (ev.target.value === '1') contractName.current.value = 'договор займа'
        else contractName.current.value = 'кредитный договор'  
    }
    
    const addPaymentHandler = () => {
        const date = paymentDateRef.current.value;
        const sum = paymentSumRef.current.value;
        if (date === '' || sum === '' || moreThenNow(date) || isNumber(sum)) return;
        if (payments.length > 15) return setError('Платежей не может быть более 16, остальные можно добавить после создания договора!')
        const rightDate = chandeDateFormatOnRus(date);
        const newPayments = [
            ...payments,
            {
                sum,
                date: rightDate,
                id: Date.now()
            }
        ]
        setPayments(newPayments);
    }
    const deletePaymentHandler = (ev) => {
        const newPayments = payments.filter((el)=> {
            if (el.id !== +ev.currentTarget.getAttribute('id')) return true;
        })
        setPayments(newPayments);
    }
    const startHandler = () => {
        setError(false);
        dispatch(organizationsSlice.actions.setSearchList([]));
        dispatch(setCessions([]));
    }
    useEffect(startHandler, []);
    const addedPayments = payments.map((el)=> 
        <div key={el.id} className={styles.payment}> {el.date} г. - {el.sum} руб. <button className='button' onClick={deletePaymentHandler} id={el.id} ><FontAwesomeIcon icon={solid("xmark")} className={styles.delPaymentButton}/></button></div>
    )
    const header = <div className="header">Создание договора</div>    
    const formHandler = async(ev)=> {
        ev.preventDefault();
        setLoading(true);
        setError(false);
        const data = formRef.current.elements;
        if (moreThenNow(data.date_issue.value)) setError('дата выдачи должна быть меньше текущей!');
        else if(moreThenNow(data.due_date.value)) setError('дата исполнения должна быть меньше текущей!');
        else if(isNumber(data.sum_issue.value)) setError('сумма выдачи должна быть числом!');
        else if(isNumber(data.percent.value)) setError('процентная ставка должна быть числом!');
        else if(isNumber(data.penalty.value)) setError('неустойка должна быть числом!');
        else if(!cession) setError('Выберите договор цессии!');
        else if(!organization) setError('Выберите организацию, которой принадлежит заем!');
        else {
            const sendData = {
                contract: {
                    ...formDataConverter(data), cessionId: cession.id, organizationId: organization.id
                },
                payments,
                debtorId
            }
            const response = dispatch(createContract(sendData, setError));
            if (!response) return;
            dispatch(getList(25, 1));
            dispatch(setAlert('Успешно', "Контракт успешно добавлен"));
            setShow(false);
        }
        setLoading(false);
    }
    return (
        <>
            <CustomModal show={show} setShow={setShow} customStyles={{width: '550px'}}  header={header} >
                <div className={styles.header + ' ' + 'marginTop_0'}>Данные о договоре</div>
                <form ref={formRef}  onSubmit={formHandler}>
            <div className={styles.contractData}>
                    <div className={styles.selectBlock + ' ' + classes.input }>
                <InputLabel id="contractType" required className={classes.selectLabel}>тип договора</InputLabel>
            <Select fullWidth variant='standard' labelId="contractType"
            value={contractType}
            name= 'typeId'
            onChange= {contractTypeHandler}
            
            >
            <MenuItem value='1'>договор займа</MenuItem>
            <MenuItem value='2'>кредитный договор</MenuItem>
            </Select>
            </div>
                <TextField label='название договора'   name='name' defaultValue={contractType === '1' ? 'договор займа' : 'кредитный договор'} inputRef={contractName} required variant= 'standard' className={classes.input} fullWidth {...contractName}/>
                <TextField label='Номер договора'   name='number' required variant= 'standard' className={classes.input} fullWidth/>
                <TextField label='Дата выдачи'  type='date' name='date_issue' InputLabelProps={{ shrink: true}} required variant= 'standard' className={classes.input} fullWidth/>
                <TextField label='сумма выдачи'  name='sum_issue' required variant= 'standard' className={classes.input} fullWidth/>
                <TextField label='дата исполнения'  type='date' name='due_date' InputLabelProps={{ shrink: true}} required variant= 'standard' className={classes.input} fullWidth/>
                <TextField label='проц. ставка (% год.)'    name='percent' required variant= 'standard' className={classes.input} fullWidth/>
                <TextField label='неустойка (% год.)' name='penalty' required variant= 'standard' className={classes.input} fullWidth/>
                </div>
            <div className={styles.selectMargin}>
                <CustomSearch label='Организация, которой принадлежит заем' results={organizations} onSearch={onChangeOrganizations} onClick={onChooseOrganization}  />
            </div>
            <div className={styles.selectMargin}>
            <CustomSearch label='договор цессии, по которому приобретен займ' onSearch={onChangeCessions} results={cessions} onClick={onChooseCession} defaultValue={'Принадлежит выдавшей организации'} />
            </div>
            <div className={styles.selectMargin}>
            <CustomSelect name='statusId' label='Статус' initValue='1' style={{width: '45%'}} customClassName='margin_center'>
            <MenuItem value='1'>не готов</MenuItem>
            </CustomSelect>
            </div>
            <div className={styles.header}>Платежи</div>
            <div className={styles.payments}>
                <div className={styles.addedPayments}>
                    {addedPayments}
                    </div>
            <div className={styles.addPayment}>
            <div className={styles.header_small}>Добавить платеж</div>
            <TextField label='дата' size='small' type='date' inputRef={paymentDateRef} InputLabelProps={{shrink: true}} variant= 'standard' className={classes.input_small} fullWidth/>
            <TextField label='сумма' size='small' variant= 'standard' inputRef={paymentSumRef} className={classes.input_small} fullWidth/>
            <div className={styles.payButton}><Button variant="contained" size="small" onClick={addPaymentHandler} color='success' className={classes.button_small}>
          Добавить
        </Button></div>
        </div>
        </div>
        <div className={'button_submit' + ' ' + styles.button_submit}><LoadingButton loading={loading} variant="contained" size="large" type='submit' className={classes.button}>
          Подтвердить
        </LoadingButton></div>
        {error && <div className={styles.error}>{error}</div>}
        </form>
                {/* </div> */}
                </CustomModal>
        {/* // </div> */}
        </>
    );
};

export default AddContract;