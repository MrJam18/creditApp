import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { findCourtsByName, setCourtsList } from '../../../store/courts/actions';
import { getCourtsList } from '../../../store/courts/selectors';
import getISODate from '../../../utils/getISODate';
import CourtCreator from './CourtCreator';
import CustomSearch from '../../dummyComponents/CustomSearch';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../css/contract.module.css';
import { getDefaultAgent, getSearchAgentsList } from '../../../store/agents/selectors';
import { recieveDefaultAgent, searchAgents } from '../../../store/agents/actions';

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
    const courtsList = useSelector(getCourtsList);
    const inputDate = useRef();
    const classes = useStyles();
    const agents = useSelector(getSearchAgentsList);
    const defaultAgent = useSelector(getDefaultAgent);
    const onChangeCourtInput = (value) => {
        dispatch(findCourtsByName(value));
    }
    const onChooseCourt = value =>{
        setCourt(value);
    }
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
    const onSearchAgents = value => {
        dispatch(searchAgents(value));
    }
    const onChooseAgent = value => {
        setAgent(value);
    }

    useEffect( async ()=> {
        dispatch(setCourtsList([]));
       await dispatch(recieveDefaultAgent());
        setDate(ISONow);
        setContractJur(false);
        setIgnorePayments(false);
    }, [])
    useEffect(()=> {
        if(defaultAgent){
            setAgent(defaultAgent);
        }
    }, [defaultAgent]);
    return (
        <div>
            {showCourtCreator && <CourtCreator show={showCourtCreator} setShow={setShowCourtCreator} setValue={setCourt} />}
            <form id='submitSelectDocument' onSubmit={onSubmit}>
            <TextField type='date' name='date' label='Дата расчета' onChange={onChangeDate} inputRef={inputDate} variant='standard' defaultValue={ISONow} InputLabelProps={{shrink: true}} required fullWidth size='small' className={classes.input} />
                <div className={styles.data__toolbar__courtBox}>
                <CustomSearch label={"Название суда"} onSearch={onChangeCourtInput} results={courtsList} onClick={onChooseCourt} /> <button type='button' className='antibutton' onClick={changeShowCourtCreator}><AddOutlinedIcon fontSize='small' className={classes.icon} /> </button>
                </div>
                <CustomSearch label={'Представитель'} setValue={defaultAgent?.name} onSearch={onSearchAgents} results={agents} onClick={onChooseAgent} />
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={contractJur} onChange={onChangeJurisdiction} value='contractJurisdiction' />} label="Договорная подсудность" />
                    <FormControlLabel control={<Checkbox checked={ignorePayments} onChange={onChangeIgnorePayments} value='ignorePaymentsInRestriction' />} label="Игнорировать платежи при ограничении процентов" />
                </FormGroup>
                </form>
        </div>
    );
};

export default CourtSearch;