import React, { useEffect, useState } from 'react';
import NoBorderTable from '../dummyComponents/NoBorderTable';
import { getOrgsList, getOrgsLoading, getOrgsTotal } from '../../store/organizations/selectors';
import { recieveOrgList } from '../../store/organizations/actions';
import Pagination from '../dummyComponents/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import ChangeOrg from './ChangeOrg';
const OrgList = ({userId}) => {
    const list = useSelector(getOrgsList);
    const total = useSelector(getOrgsTotal);
    const loading = useSelector(getOrgsLoading);
    const dispatch = useDispatch();
    const [focus, setFocus] = useState(false);
    const [changedOrganization, setChangedOrganization] = useState(false);
    const [order, setorder] = useState(['createdAt', 'ASC']);
    const headers = [{name: "Дата создания в базе", key: 'createdAt', type: 'date/time'}, {name: "Краткое название", key: 'short'}, {name: "Полное название", key: 'name'},
    , {name: 'ИНН', key: 'INN'}, {name: 'КПП', key: "KPP"}, {name: 'Адрес', key: 'fullAddress'}, {name: 'банковские Реквизиты', key: 'requisits'}];
    const sortHandler = async (field, type) => {
            setorder([field, type])
            setFocus(field);
           await dispatch(recieveOrgList(25, 1, [field, type], userId));
    }
    const changePageHandler = async (limit, page) => {
        await dispatch(recieveOrgList(limit, page, order, userId))
    }
    const onClickRow = (ev) => {
        const index = ev.currentTarget.getAttribute('data-index');
        setChangedOrganization(list[index]);
    }
    useEffect( async ()=> {
        await dispatch(recieveOrgList(25, 1, order, userId))
    }, [])
    return (
        <div>
            <NoBorderTable headers={headers} rows={list} rowsButtons onClickRow={onClickRow} focus={focus} sortHandler={sortHandler} loading={loading} />
            <Pagination total={total} pageUpdater={changePageHandler} />
            <ChangeOrg organization={changedOrganization} setShow={setChangedOrganization} /> 
        </div>
    );
};

export default OrgList;