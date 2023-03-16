import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import CustomModal from '../dummyComponents/CustomModal';
import { makeStyles } from '@mui/styles';
import ButtonInForm from '../dummyComponents/ButtonInForm';
import { useDispatch, useSelector } from 'react-redux';
import {formDataConverter} from '../../utils/formDataConverter';
import { getAgentsLoading } from '../../store/agents/selectors';
import { changeAgent, deleteAgent } from '../../store/agents/actions';
import { setAlert } from '../../store/alert/actions';
import { setloading } from '../../store/global';
import Agent from "./Agent";

const useStyles = makeStyles({
    deleteButton: {
        width: '30%',
        marginBottom: '20px'
        
    }
})


const ChangeAgent = ({setShow, agent}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [address, setAddress ] = useState('default');
    const [error, setError] = useState(false);
    const loading = useSelector(getAgentsLoading);
    const form = useRef();
    const [defaultAgent, setDefaultAgent] = useState(agent.isDefault);
    const [noShowGroup, setNoShowGroup] = useState(agent.noShowGroup);
    const formHandler = async (ev) => {
        try{
        ev.preventDefault();
        if(!address){
            return setError('Укажите адрес!');
        }
        const data = formDataConverter(form);
        if(address === 'default') {
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
                <Agent setAddress={setAddress} setDefaultAgent={setDefaultAgent} setNoShowGroup={setNoShowGroup} defaultValues={agent} />
            <ButtonInForm loading={loading} />
            <div className="error">{error}</div>
            </CustomModal>
            </form>
            
        </div>
    );
};

export default ChangeAgent;