import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import CustomModal from '../dummyComponents/CustomModal';
import Address from '../Address'
import { makeStyles } from '@mui/styles';
import ButtonInForm from '../dummyComponents/ButtonInForm';
import { useDispatch, useSelector } from 'react-redux';
import {formDataConverter} from '../../utils/formDataConverter';
import { getAgentsLoading } from '../../store/agents/selectors';
import { addAgent } from '../../store/agents/actions';
import { setAlert } from '../../store/alert/actions';
import { setloading } from '../../store/global';

const useStyles = makeStyles({
    fullInput: {
        marginBottom: '10px'
    },
    smallInput: {
        width: '45%'
    },
    requisits: {
        height: '145px',
        marginBottom: '10px'
    }

})


const AddAgent = ({show, setShow}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [address, setAddress ] = useState(false);
    const [error, setError] = useState(false);
    const loading = useSelector(getAgentsLoading);
    const form = useRef();
    const [defaultAgent, setDefaultAgent] = useState(false);
    const [noShowGroup, setNoShowGroup] = useState(false);
    const formHandler = async (ev) => {
        try{
        ev.preventDefault();
        if(!address){
            return setError('Укажите адрес!')
        }
        const data = formDataConverter(form.current);
        await dispatch(addAgent({
            agent: {
                ...data,
                noShowGroup,
                isDefault: defaultAgent
            }, 
            address
        }));
        setShow(false);
        dispatch(setAlert('Успешно', 'Представитель успешно добавлен'));
        }
        catch(e){
            setError(e.message)
        }

    }
    const onChangeDefaultAgent = ev => {
        setDefaultAgent(ev.target.checked);
    }
    const onChangeNoGroup = ev => {
        setNoShowGroup(ev.target.checked);
    }
    useEffect(()=>{
        setDefaultAgent(false);
        setNoShowGroup(false);
        setError(false);
        setloading(false);
    }, [])

    return (
        <div>
            <form onSubmit={formHandler} ref={form}>
            <CustomModal show={show} setShow={setShow} customStyles={{width: '500px'}}>
                <div className="header_small">Добавление представителя</div>
            <TextField className={classes.fullInput} required name='surname' label={"Фамилия"} variant='standard' fullWidth />
            <TextField className={classes.fullInput} required name='name' label={'Имя'} fullWidth variant='standard' />
            <TextField className={classes.fullInput} name='patronymic' label={'Отчество'} variant='standard' fullWidth />
            <TextField className={classes.fullInput} fullWidth required name='document' label='Документ, подтверждающий полномочия' defaultValue='Копия доверенности представителя' variant='standard' />
            <Address setAdressForDB={setAddress} />
            <FormControlLabel control={<Checkbox checked={defaultAgent} onChange={onChangeDefaultAgent}  />} label="Представитель по умолчанию" />
            <FormControlLabel control={<Checkbox checked={noShowGroup} onChange={onChangeNoGroup} />} label="Представитель не виден группе" />
            <ButtonInForm loading={loading} />
            <div className="error">{error}</div>
            </CustomModal>
            </form>
            
        </div>
    );
};

export default AddAgent;