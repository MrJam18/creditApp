import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../css/agents.module.css';
import NoBorderTable from '../dummyComponents/NoBorderTable';
import { getAgentsError, getAgentsList, getAgentsLoading, getAgentsOrder, getAgentsTotal } from '../../store/agents/selectors'
import { recieveAgentsList } from '../../store/agents/actions';
import Pagination from '../dummyComponents/Pagination';
import AgentsToolBar from './AgentsToolBar';
import ChangeAgent from './changeAgent';
import {setAlert} from '../../store/alert/actions'
import agentsSlice from '../../store/agents/reducer';

const headers = [{key: 'createdAt', name: 'Дата создания', type: 'date'}, {key: 'surname', name: 'Фамииля'}, {key: 'name', name: 'Имя'}, {key: 'patronymic' , name: 'Отчество'}, {key: "enclosure", name: "Документ"}];

const Agents = () => {
    const dispatch = useDispatch();
    const error = useSelector(getAgentsError);
    const agents = useSelector(getAgentsList);
    const total = useSelector(getAgentsTotal);
    const loading = useSelector(getAgentsLoading);
    const [focus, setFocus] = useState(false);
    const order = useSelector(getAgentsOrder);
    const [changedAgent, setChangedAgent] = useState(false);
    const changePage = (limit, page) => {
        dispatch(recieveAgentsList(page, limit, order));
    }
    const sortHandler = async (field, type) => {
        dispatch(agentsSlice.actions.setOrder(([field, type])));
        setFocus(field);
        dispatch(recieveAgentsList(1, 25, order));
    }
    const onClickRow = (index) => {
        setChangedAgent(agents[index]);
    }
    useEffect(()=> {
        dispatch(recieveAgentsList(1, 25, order));
    }, []);
    useEffect(()=> {
        if(error){
            dispatch(setAlert('ошибка получения предстаувителей', error, 'error'));
        }
    }, [error]);


    return (
        <div className="firstWindow background">
            <div className="header">Управление представителями</div>
            <div className={"contentBox" + ' ' + styles.main}>
                <AgentsToolBar  />
                {changedAgent && <ChangeAgent agent={changedAgent} setShow={setChangedAgent} /> }
                <NoBorderTable rows={agents} headers={headers} rowsButtons onClickRow={onClickRow} sortHandler={sortHandler} focus={focus} loading={loading} />
                <Pagination total={total} pageUpdater={changePage} />
            </div> 
        </div>
    );
};

export default Agents;