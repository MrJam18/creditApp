import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { setCourtsList } from '../../../store/courts/actions';
import getISODate from '../../../utils/getISODate';
import CourtCreator from './CourtCreator';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useDispatch } from 'react-redux';
import styles from '../../../css/contract.module.css';
import EasySearch from "../../dummyComponents/EasySearch";
import api from "../../../http";

const useStyles = makeStyles({
    input: {
        marginBottom: '10px'
    },
    icon: {
        width: '35px',
        height: '50px',
        fontSize: '5px'
    },
    button: {
        width: '50%'
    }
})

const CourtSearch = ({setCourt,  setDate, setAgent, contractJur, setContractJur, ignorePayments, setIgnorePayments, onSubmit}) => {
    const dispatch = useDispatch();
    const [showCourtCreator, setShowCourtCreator] = useState(false);
    const ISONow = getISODate();
    const inputDate = useRef();
    const classes = useStyles();;
    const [defaultAgent, setDefaultAgent] = useState(false);
    const changeShowCourtCreator = () =>{
        setShowCourtCreator(true);
    }
    const onChangeDate = (ev)=> {
        setDate(ev.target.value);
    }
    const onChangeJurisdiction = (ev) => {
        setContractJur(ev.target.checked);
    }
    const onChangeIgnorePayments = ev => {
        setIgnorePayments(ev.target.checked);
    }

    useEffect( async ()=> {
        const { data } = await api.get('agents/getDefault');
        setDate(ISONow);
        setDefaultAgent(data);
        return ()=> {
            dispatch(setCourtsList([]));
            setContractJur(false);
            setIgnorePayments(false);
        }
    }, []);
    return (
        <div>
            {showCourtCreator && <CourtCreator show={showCourtCreator} setShow={setShowCourtCreator} setValue={setCourt} />}
            <form id='submitSelectDocument' onSubmit={onSubmit}>
            <TextField type='date' name='date' label='Дата расчета' onChange={onChangeDate} inputRef={inputDate} variant='standard' defaultValue={ISONow} InputLabelProps={{shrink: true}} required fullWidth size='small' className={classes.input} />
                <div className={styles.data__toolbar__courtBox}>
                    <EasySearch label={'Название суда'} required serverAddress='courts/findByName' setValue={setCourt} />
                    <button type='button' className='antibutton' onClick={changeShowCourtCreator}><AddOutlinedIcon fontSize='small' className={classes.icon} /> </button>
                </div>
                <EasySearch label={'Представитель'} setValue={setAgent} changedValue={defaultAgent} serverAddress={'agents/getSearchList'} required />
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={contractJur} onChange={onChangeJurisdiction} value='contractJurisdiction' />} label="Договорная подсудность" />
                    <FormControlLabel control={<Checkbox checked={ignorePayments} onChange={onChangeIgnorePayments} value='ignorePaymentsInRestriction' />} label="Игнорировать платежи при ограничении процентов" />
                </FormGroup>
                </form>
        </div>
    );
};

export default CourtSearch;