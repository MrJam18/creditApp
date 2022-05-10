import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExecutiveDoc } from '../../../store/contracts/selectors';
import CustomModal from '../../dummyComponents/CustomModal';
import EasySelect from '../../dummyComponents/EasySelect';
import styles from '../../../css/contract.module.css';
import ButtonInForm from '../../dummyComponents/ButtonInForm';
import { useParams } from 'react-router';
import { isNumber } from '../../../utils/isNumber';
import { formDataConverter } from '../../../utils/formDataConverter';
import { moreThenNow } from '../../../utils/moreThenNow';
import { changeOrCreateExecutiveDoc } from '../../../store/contracts/actions';

const types = [{name: 'Судебный приказ', id: 1}, {name: 'Исполнительный лист', id: 2}]
const useStyles = makeStyles({
    smallInput: {
        flex: '1 0 45%;',
        marginBottom: '10px',
        marginRight: '6px',
        marginLeft: '6px'
    },
    addIcon: {
            width: '35px',
            height: '50px',
            fontSize: '5px'
    }
})


const ExecutiveDocChanger = ({setShow}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const executiveDoc = useSelector(getExecutiveDoc);
    const formRef = useRef();
    const {contractId} = useParams();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const onSubmit = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        const data = formDataConverter(formRef.current);
        if(isNumber(data.main) || isNumber(data.percents) || isNumber(data.penalties) || isNumber(data.fee)) {
            setError('Взысканные суммы должны быть числом!');
        }
        else if(moreThenNow(data.dateIssue) || moreThenNow(data.resolutionDate)) {
            setError('Даты не могут быть позднее текущей!')
        }
        else if(!data.typeId){
            setError('Укажите тип исполнительного документа!')
        }
        else{
            data.contractId = contractId;
            try{
            await dispatch(changeOrCreateExecutiveDoc(data))
            }
            catch(e){
                setLoading(false);
                setError(e.message);
            }
        }
        setLoading(false);

    }
    return (
        <CustomModal customStyles={{width: 500}} show setShow={setShow}>
        <div className={'header_small'}>Изменение исполнительного документа</div>
        <form ref={formRef} onSubmit={onSubmit} >
        <div className={styles.executiveDocChanger__main}>
            <TextField className={classes.smallInput} InputLabelProps={{shrink: true}} type='date' name='dateIssue' variant='standard' defaultValue={executiveDoc.dateIssue} required label='дата выдачи ИД' />
            <TextField className={classes.smallInput} defaultValue={executiveDoc.number} name='number' variant='standard' required label='Номер ИД' />
            <div className={styles.fullWidthBlock}>
            <EasySelect name='typeId' defaultValue={executiveDoc.typeId} variants={types} label='Тип исполнительного документа *' />
            </div>
            <div className={styles.executiveChoises__header}>Инфомация о взысканных суммах</div>
            <TextField className={classes.smallInput} defaultValue={executiveDoc.main} name='main' variant='standard' required label='Основной долг' />
            <TextField className={classes.smallInput} defaultValue={executiveDoc.percents} name='percents' variant='standard' required label='Проценты' />
            <TextField className={classes.smallInput} defaultValue={executiveDoc.penalties} name='penalties' variant='standard' required label='Неустойка' />
            <TextField className={classes.smallInput} defaultValue={executiveDoc.fee} name='fee' variant='standard' required label='Госпошлина' />
            <TextField className={classes.smallInput} defaultValue={executiveDoc.resolutionNumber} name='resolutionNumber' variant='standard' label='Дата решения' />
            <TextField className={classes.smallInput} defaultValue={executiveDoc.resolutionDate} InputLabelProps={{shrink: true}} name='resolutionDate' type='date' variant='standard' label='Номер решения' />
            </div>
            {error && <div className="error">{error}</div>}
            <ButtonInForm loading={loading} />
            </form>
        </CustomModal>

    );
};

export default ExecutiveDocChanger;