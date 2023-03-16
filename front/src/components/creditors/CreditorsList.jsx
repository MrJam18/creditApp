import React, { useEffect, useState } from 'react';
import NoBorderTable from '../dummyComponents/NoBorderTable';
import { getOrgsList, getOrgsLoading, getOrgsTotal } from '../../store/creditors/selectors';
import { recieveOrgList } from '../../store/creditors/actions';
import Pagination from '../dummyComponents/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import ChangeCreditor from './ChangeCreditor';
const CreditorsList = ({userId}) => {
    const list = useSelector(getOrgsList);
    const total = useSelector(getOrgsTotal);
    const loading = useSelector(getOrgsLoading);
    const dispatch = useDispatch();
    const [focus, setFocus] = useState(false);
    const [creditorId, setCreditorId] = useState();
    const [order, setorder] = useState(['createdAt', 'ASC']);
    const headers = [{name: "Дата создания в базе", key: 'createdAt', type: 'date'}, {name: "Краткое название", key: 'short'}, {name: "Полное название", key: 'name'},
    {name: 'Суд. идентификатор', key: 'courtIdentifier'}, {name: 'Тип', key: 'type'}];
    const sortHandler = async (field, type) => {
            setorder([field, type])
            setFocus(field);
           await dispatch(recieveOrgList(25, 1, [field, type], userId));
    }
    const changePageHandler = async (limit, page) => {
        await dispatch(recieveOrgList(limit, page, order, userId))
    }
    const onClickRow = (index) => {
        setCreditorId(list[index].id);
    }
    useEffect( async ()=> {
        await dispatch(recieveOrgList(25, 1, order, userId))
    }, [])
    return (
        <div>
            <NoBorderTable headers={headers} rows={list} rowsButtons onClickRow={onClickRow} focus={focus} sortHandler={sortHandler} loading={loading} />
            <Pagination total={total} pageUpdater={changePageHandler} />
            {creditorId && <ChangeCreditor creditorId={creditorId} setShow={setCreditorId} /> }
        </div>
    );
};

export default CreditorsList;