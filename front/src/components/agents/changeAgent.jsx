import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import CustomModal from '../dummyComponents/CustomModal';
import Address from '../Address'
import { makeStyles } from '@mui/styles';
import ButtonInForm from '../dummyComponents/ButtonInForm';
import { useDispatch, useSelector } from 'react-redux';
import {formDataConverter} from '../../utils/formDataConverter';
import { getAgentsLoading } from '../../store/agents/selectors';
import { changeAgent, deleteAgent } from '../../store/agents/actions';
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
    },
    deleteButton: {
        width: '30%',
        marginBottom: '20px'
        
    }

})


const ChangeAgent = ({setShow, agent}) => {
    const noShowGroupMount = agent.noShowGroup;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [address, setAddress ] = useState('default');
    const [error, setError] = useState(false);
    const loading = useSelector(getAgentsLoading);
    const form = useRef();
    const [defaultAgent, setDefaultAgent] = useState(agent.isDefault);
    const [noShowGroup, setNoShowGroup] = useState(noShowGroupMount);
    const formHandler = async (ev) => {
        try{
        ev.preventDefault();
        if(!address){
            return setError('Укажите адрес!');
        }
        const data = formDataConverter(form.current);
        if(address == 'default') {
            await dispatch(changeAgent({
                agent: {
                    id: agent.id,
                    ...data,
                    noShowGroup,
                    isDefault: defaultAgent
                }
            }))
        }
        else {
        await dispatch(changeAgent({
            agent: {
                id: agent.id,
                ...data,
                noShowGroup,
                isDefault: defaultAgent
            }, 
            address
        }));
    }
        setShow(false);
       dispatch(setAlert('Успешно', "Представитель успешно изменен"))
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
    const deleteHandler = async () => {
        try{
           await dispatch(deleteAgent(agent.id));
           setShow(false);
           dispatch(setAlert('Успешно', "Представитель успешно удален"))
        }
        catch(e){
            setError(e.message)
        }

    }
    useEffect(()=>{
        setError(false);
        setloading(false);
    }, [])
    
    return (
        <div>
            <form onSubmit={formHandler} ref={form}>
            <CustomModal show={agent} setShow={setShow} customStyles={{width: '500px'}}>
                <div className="header_small">Изменение представителя</div>
                <Button color='error' onClick={deleteHandler} className={classes.deleteButton} variant='contained' > Удалить агента </Button>
            <TextField className={classes.fullInput} required name='surname' label={"Фамилия"} variant='standard' defaultValue={agent.surname} fullWidth />
            <TextField className={classes.fullInput} required name='name' label={'Имя'} fullWidth variant='standard' defaultValue={agent.name} />
            <TextField className={classes.fullInput} defaultValue={agent.patronymic} name='patronymic' label={'Отчество'} variant='standard' fullWidth />
            <TextField className={classes.fullInput} defaultValue={agent.document} fullWidth required name='document' label='Документ, подтверждающий полномочия' variant='standard' />
            <Address defaultValue={agent.fullAddress} setAdressForDB={setAddress} />
            <FormControlLabel control={<Checkbox checked={defaultAgent} onChange={onChangeDefaultAgent}  />} label="Представитель по умолчанию" />
            <FormControlLabel control={<Checkbox checked={noShowGroup} onChange={onChangeNoGroup} />} label="Представитель не виден группе" />
            <ButtonInForm loading={loading} />
            <div className="error">{error}</div>
            </CustomModal>
            </form>
            
        </div>
    );
};

export default ChangeAgent;