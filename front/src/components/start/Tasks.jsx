import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recieveTaskstList } from '../../store/tasks/actions';
import { getTasksList, getTasksTotal } from '../../store/tasks/selectors';
import { getUserId } from '../../store/users/selectors';
import NoBorderTable from '../dummyComponents/NoBorderTable';
import {setAlert} from '../../store/alert/actions'
import styles from '../../css/start.module.css'
import MinPagination from '../dummyComponents/MinPagination';

const focus = false;
const sort = ['time', 'ASC'];

const Tasks = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const headers = [{key: 'createdAt', type: 'date/time', name: 'Дата создания'}, {key: 'name', name: 'Название'}, {key: 'time', name: 'Конечный срок', type: 'date/time'}]
    const tasks = useSelector(getTasksList);
    const totalTasks = useSelector(getTasksTotal);
    const userId = useSelector(getUserId);
    const [page, setPage] = useState(1);
    const changePage = async (limit, page) => {
        setLoading(true);
        setPage(page);
        try{
        await dispatch(recieveTaskstList(limit, page, sort, userId));
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
            await dispatch(recieveTaskstList(10,page,sort, userId));
        }
        catch(e){
            setAlert('Ошибка!', "Ошибка при получении списка задач!", "error")
        }
        finally {
            setLoading(false);
        }

    },[])

    
    return (
        <div className={styles.element}>
            <div className="header">Мои задачи</div>
            <div className={styles.flexContainer}>
           <NoBorderTable loading={loading} rows={tasks} headers={headers} focus={focus} sortHandler={sortHandler}  /> 
           <MinPagination pageUpdater={changePage} total={totalTasks} />
           </div>
        </div>
    );
};

export default Tasks;<NoBorderTable />