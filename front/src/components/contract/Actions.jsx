import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styles from '../../css/contract.module.css'
import { recieveActionsList, recieveAndSaveDocument } from '../../store/actions/actions';
import { getActionsList, getActionsTotal } from '../../store/actions/selectors';
import { serverInsideStaticContractsAddress } from '../../utils/serverApi';
import NoBorderTable from '../dummyComponents/NoBorderTable';
import downloadIcon from '../../img/doc.png';
import Pagination from '../dummyComponents/Pagination';

const Actions = () => {
    const {contractId} = useParams();
    const dispatch = useDispatch();
    const headers = [{name: "Дата/время", key: 'createdAt', type: 'date/time'}, {name: "Создатель", key: 'user'}, {name: "Действие", key: 'actionType'} , {name: "Объект", key: 'actionObject'}, {name: "Результат", key: 'result', styles: {minWidth: '200px'}}];
    const actions = useSelector(getActionsList);
    const totalActions = useSelector(getActionsTotal);
    const [loading, setLoading] = useState(true);
    const [focus, setFocus] = useState(false);
    const [orderField, setOrderField] = useState('createdAt');
    const [orderType, setOrderType] = useState('DESC')
    const getNecessary = async () => {
        setLoading(true);
        dispatch(recieveActionsList(contractId, 1, 25, orderField, orderType));
        setLoading(false);
    }
    const changePage = (limit, page) => {
        setLoading(true);
        dispatch(recieveActionsList(contractId, page, limit, orderField, orderType));
        setLoading(false);
    }
    const onClickDocumentLink = (ev) => {
        const path = ev.currentTarget.getAttribute('data-path');
        const object = ev.currentTarget.getAttribute('data-object');
        const id = ev.currentTarget.getAttribute('data-id');
        dispatch(recieveAndSaveDocument(path, object + ' ' + id + '.docx'));
    }
    const sortHandler = (field, type = "ASC") => {
        setLoading(true);
        setFocus(field);
        setOrderField(field);
        setOrderType(type);
        dispatch(recieveActionsList(contractId, 1, 25, field, type));
        setLoading(false);
      }
    const rows = actions.map((el)=>{
        let row = {
            id: el.id,
            createdAt: el.createdAt,
            actionType: el.actionType.name,
            actionObject: el.actionObject.name,
            user: `${el.user.surname} ${el.user.name[0]}.`
        }
        const regExp = new RegExp(`^${serverInsideStaticContractsAddress}`)
        if (regExp.test(el.result)) row.result = <button onClick={onClickDocumentLink} data-id= {el.id} data-object={el.actionObject.name} data-path={el.result} className={'antibutton'+ ' ' + styles.actions__downloadButton}>
            <img src={downloadIcon} className={styles.actions__downloadIcon} alt="download" />
        </button>
        else row.result = el.result;
        return row;

    })

    useEffect(getNecessary, [contractId])
    return (
        <div className={styles.actions}>
            <div className={styles.header_small}>Действия договора</div>
            <NoBorderTable loading={loading} headers={headers} rows={rows} sortHandler={sortHandler} focus={focus}/>
            <Pagination  pageUpdater={changePage} total={totalActions} />
        </div>
    );
};

export default Actions;