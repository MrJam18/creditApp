import { TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import CustomSearch from '../../dummyComponents/CustomSearch';
import EasySelect from '../../dummyComponents/EasySelect';
import styles from '../../../css/contract.module.css';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getBailiffsSearchList } from '../../../store/bailiffs/selectors';
import { recieveBailiffsSearchList } from '../../../store/bailiffs/actions';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CreateBailiff from './CreateBailiff';
import { formDataConverter } from '../../../utils/formDataConverter';
import { useParams } from 'react-router';
import { isNumber } from '../../../utils/isNumber';
import { createIPInitDoc } from '../../../store/contracts/actions';
import { recieveDefaultAgent, searchAgents } from '../../../store/agents/actions';
import { getDefaultAgent, getSearchAgentsList } from '../../../store/agents/selectors';
import { bailiffsSlice } from '../../../store/bailiffs/reducer';
import { setAlert } from '../../../store/alert/actions';
import { getExecutiveDoc } from '../../../store/contracts/selectors';

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

const ExecutiveChooses = ({setShow, setError, setLoading}) => {
    const {contractId} = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const bailiffs = useSelector(getBailiffsSearchList);
    const executiveDoc = useSelector(getExecutiveDoc);
    const [bailiff, setBailiff] = useState(false);
    const [showCreateBailiff, setShowCreateBailiff] = useState(false);
    const formRef = useRef();
    const agents = useSelector(getSearchAgentsList);
    const defaultAgent = useSelector(getDefaultAgent);
    const [agent, setAgent] = useState(false);
    const onSearchBailiffs = async (searchString) => {
        try{
           await dispatch(recieveBailiffsSearchList(searchString))
        }
        catch(e){
            setError(e.message)
        }
    }
    const onChooseBailiff = (val) => {
        setBailiff(val);
    }
    const onClickCreateBailiff = () => {
        setShowCreateBailiff(true);
    }
    const onSearchAgents = value => {
        dispatch(searchAgents(value));
    }
    const onChooseAgent = value => {
        setAgent(value);
    }
    const onSubmit = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        setError(false);
        const executiveDoc = formDataConverter(formRef.current);
        if(isNumber(executiveDoc.main) || isNumber(executiveDoc.percents) || isNumber(executiveDoc.penalties) || isNumber(executiveDoc.fee)) {
            setError('Взысканные суммы должны быть числом!');
        }
        else if(!bailiff) {
            setError('Вы не выбрали отдел судебных приставов!')
        }
        else if(!agent) {
            setError("Вы не выбрали представителя!")
        }
        else {
            const data = {
                executiveDoc,
                bailiffId: bailiff.id,
                contractId,
                agentId: agent.id,
            }
            try{
                await dispatch(createIPInitDoc(data));
                dispatch(setAlert("Успешно", "Заявление успешно создано"));
                setShow(false);
            }
            catch(e){
                setError(e.message)
                throw new Error(e.message);
            }
            finally{
                setLoading(false);
            }
        }
        setLoading(false);  
    }
    useEffect( ()=> {
        dispatch(recieveDefaultAgent());
        dispatch(bailiffsSlice.actions.setSearchList([]));
    }, []);
    useEffect(()=> {
        if(defaultAgent){
            setAgent(defaultAgent);
        }
    }, [defaultAgent])

    return (
        <form id='submitSelectDocument' onSubmit={onSubmit} ref={formRef}>
        <div className={styles.executiveChoises__main}> 
        {showCreateBailiff && <CreateBailiff setShow={setShowCreateBailiff} /> }
            <div className={styles.executiveChoises__bailiffBlock}>
            <CustomSearch results={bailiffs} onSearch={onSearchBailiffs} onClick={onChooseBailiff} label='Отдел судебных приставов-исполнителей *' customStyles={{width: '100%'}} />
            <button className='antibutton antipadding' type='button' onClick={onClickCreateBailiff} ><AddOutlinedIcon fontSize='small' className={classes.addIcon} /> </button>
            </div>
            <div className={styles.fullWidthBlock}>
            <CustomSearch label={'Представитель *'} setValue={defaultAgent?.name} onSearch={onSearchAgents} results={agents} onClick={onChooseAgent} />
            </div>
            <TextField className={classes.smallInput} defaultValue={executiveDoc.dateIssue} InputLabelProps={{shrink: true}} type='date' name='dateIssue' variant='standard' required label='дата выдачи ИД' />
            <TextField className={classes.smallInput} defaultValue={executiveDoc.number} name='number' variant='standard' required label='Номер ИД' />
            <div className={styles.fullWidthBlock}>
            <EasySelect name='typeId' variants={types} defaultValue={executiveDoc.typeId} label='Тип исполнительного документа *' />
            </div>
            <div className={styles.executiveChoises__header}>Инфомация о взысканных суммах</div>
            <TextField className={classes.smallInput} defaultValue={executiveDoc.main} name='main' variant='standard' required label='Основной долг' />
            <TextField className={classes.smallInput} defaultValue={executiveDoc.percents} name='percents' variant='standard' required label='Проценты' />
            <TextField className={classes.smallInput} defaultValue={executiveDoc.penalties} name='penalties' variant='standard' required label='Неустойка' />
            <TextField className={classes.smallInput} defaultValue={executiveDoc.fee} name='fee' variant='standard' required label='Госпошлина' />
            <TextField className={classes.smallInput} defaultValue={executiveDoc.resolutionNumber} name='resolutionNumber' variant='standard' label='Дата решения' />
            <TextField className={classes.smallInput} defaultValue={executiveDoc.resolutionDate} InputLabelProps={{shrink: true}} name='resolutionDate' type='date' variant='standard' label='Номер решения' />
        </div>
        </form> 
    );
};

export default ExecutiveChooses;