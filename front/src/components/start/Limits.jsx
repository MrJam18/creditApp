import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getTasksList, getTasksTotal } from '../../store/tasks/selectors';
import { getTotalLimitations, getLimitationsList } from '../../store/contracts/selectors'
import { getUser } from '../../store/users/selectors';
import NoBorderTable from '../dummyComponents/NoBorderTable';
import styles from '../../css/start.module.css';
import {setAlert} from '../../store/alert/actions';
import { recieveLimitationsList } from '../../store/contracts/actions';
import MinPagination from '../dummyComponents/MinPagination';


const Limits = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const focus = false;
    const headers = [{key: 'date_issue', type: 'date', name: 'Дата выдачи'}, {key: 'debtor', name: 'ФИО должника'}, {key: 'creditor', name: 'Название организации'}, {key:'limitation', name: 'срок иск. давности', type: 'date'}];
    const limitations = useSelector(getLimitationsList);
    const totalLimitations = useSelector(getTotalLimitations);
    const sort = ['limitation', 'ASC'];
    const changePage = async (limit, page) => {
        setLoading(true);
        try{
        await dispatch(recieveLimitationsList(limit, page, sort));
        }
        catch(e) {
            setAlert('Ошибка!', "Ошибка при получении списка задач!", "error")
        }
        finally {
            setLoading(false);
        }
    }
    const sortHandler = async () => {
    }
    useEffect( async()=> {
        setLoading(true);
        try{
            await dispatch(recieveLimitationsList(10,1,sort));
        }
        catch(e){
            setAlert('Ошибка!', "Ошибка при получении сроков иск. давности!", "error")
        }
        finally {
            setLoading(false);
        }

    },[])

    
    return (
        <div className={styles.element}>
            <div className="header">Сроки исковой давности</div>
            <div className={styles.flexContainer}>
           <NoBorderTable loading={loading}  headers={headers} rows={limitations} focus={focus} sortHandler={sortHandler}  /> 
           <MinPagination pageUpdater={changePage} total={totalLimitations} />
           </div>
        </div>
    );
};

export default Limits;