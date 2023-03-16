import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { setCourtsList } from '../../../store/courts/actions';
import getISODate from '../../../utils/getISODate';
import CourtCreator from './CourtCreator';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useDispatch } from 'react-redux';
import styles from '../../../css/contract.module.css';
import EasySearch from "../../dummyComponents/search/EasySearch";
import api from "../../../http";
import {useMedia} from "../../../hooks/useMedia";
import {CreateCourtClaimController} from "../../../controllers/CreateCourtClaimController";

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

const CourtChooses = ({contractId, setFixedStyles, selectedDoc, setError, setLoading, setShow}) => {
    const dispatch = useDispatch();
    const ISONow = getISODate();
    const [showCourtCreator, setShowCourtCreator] = useState(false);
    const [agent, setAgent] = useState();
    const [court, setCourt] = useState();
    const [contractJur, setContractJur] = useState(false);
    const [ignorePayments, setIgnorePayments] = useState(false);
    const [date, setDate] = useState(ISONow);
    const inputDate = useRef();
    const classes = useStyles();
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
        setAgent(data);
        return ()=> {
            dispatch(setCourtsList([]));
            setContractJur(false);
            setIgnorePayments(false);
        }
    }, []);
    const onSubmit = async (ev) => {
        ev.preventDefault();
        const data = {
            contractId,
            courtId: court?.id,
            agentId: agent?.id,
            countDate: date,
            ignorePayments,
            contractJur,
            type: selectedDoc
        }
        const controller = new CreateCourtClaimController(setError, setLoading, setShow, data);
        await controller.handle();
    }
    useMedia('max-height: 570px', {bottom: '8px'}, setFixedStyles);
    return (
        <div>
            {showCourtCreator && <CourtCreator show={showCourtCreator} setShow={setShowCourtCreator} setValue={setCourt} />}
            <form id='submitSelectDocument' onSubmit={onSubmit}>
            <TextField type='date' name='date' label='Дата расчета' onChange={onChangeDate} value={date} inputRef={inputDate} variant='standard' InputLabelProps={{shrink: true}} required fullWidth size='small' className={classes.input} />
                <div className={styles.data__toolbar__courtBox}>
                    <EasySearch label={'Название суда'} value={court} required serverAddress='courts/findByName' setValue={setCourt} />
                    <button type='button' className='antibutton' onClick={changeShowCourtCreator}><AddOutlinedIcon fontSize='small' className={classes.icon} /> </button>
                </div>
                <EasySearch label={'Представитель'} setValue={setAgent} value={agent} serverAddress={'agents/getSearchList'} required />
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={contractJur} onChange={onChangeJurisdiction} value='contractJurisdiction' />} label="Договорная подсудность" />
                    <FormControlLabel control={<Checkbox checked={ignorePayments} onChange={onChangeIgnorePayments} value='ignorePaymentsInRestriction' />} label="Игнорировать платежи при ограничении процентов" />
                </FormGroup>
                </form>
        </div>
    );
};

export default CourtChooses;