import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../../store/users/selectors';
import NoBorderTable from '../dummyComponents/NoBorderTable';
import {setAlert} from '../../store/alert/actions';
import styles from '../../css/start.module.css';
import { recieveAndSaveDocument, recieveLastActionsList } from '../../store/actions/actions';
import {  getLastActionsList, getLastActionsTotal } from '../../store/actions/selectors';
import MinPagination from '../dummyComponents/MinPagination';
import { addLinksForSaveFile } from '../../utils/addLinkForSaveFile';
import { useNavigate } from 'react-router';

const limit = 8;
const headers = [{name: "Дата", key: 'createdAt'}, {name: 'Должник', key: 'debtor'}, {name: "Действие", key: 'actionType'} , {name: "Объект", key: 'actionObject'}, {name: "Результат", key: 'result', styles: {minWidth: '200px'}}];
const focus = false;

const LastActions = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const actions = useSelector(getLastActionsList);
    const totalActions = useSelector(getLastActionsTotal);
    const userId = useSelector(getUserId);
    const [rows, setRows] = useState([]);
    const onClickDocumentLink = (ev) => {
        ev.stopPropagation();
        const path = ev.currentTarget.getAttribute('data-path');
        const object = ev.currentTarget.getAttribute('data-object');
        const id = ev.currentTarget.getAttribute('data-id');
        dispatch(recieveAndSaveDocument(path, object + ' ' + id + '.docx'));
    }
    const changePage = async (limit, page) => {
        setLoading(true);
        try{
        await dispatch(recieveLastActionsList(userId, page));
        }
        catch(e) {
            setAlert('Ошибка!', "Ошибка при получении списка последних действий!", "error")
        }
        finally {
            setLoading(false);
        }
    }
    const onClickRow = (index) => {
        navigate(`contracts/${actions[index].contractId}`);
    }
    const sortHandler = async () => {
           }
    useEffect( async()=> {
        setLoading(true);
        try{
           await dispatch(recieveLastActionsList(userId, 1));
        }
        catch(e){
            setAlert('Ошибка!', "Ошибка при получении списка последних действий!", "error")
        }
        finally {
            setLoading(false);
        }

    },[])
    useEffect(()=> {
        setRows(addLinksForSaveFile(actions, onClickDocumentLink)); 
    },[actions])



    
    return (
        <div className={styles.element}>
            <div className="header">Мои последние действия</div>
            <div className={styles.relativeContainer}>
                <div className={styles.content}>
                    <NoBorderTable loading={loading}  headers={headers} rows={rows} rowsButtons onClickRow={onClickRow} focus={focus} sortHandler={sortHandler}  />
                </div>
                <div className={styles.paginationContainer}>
                    <MinPagination pageUpdater={changePage} total={totalActions} limit={limit} />
                </div>
           </div>
        </div>
    );
};

export default LastActions;