import React, {useEffect, useState} from 'react';
import styles from "../../css/cessions.module.css";
import Content from "../dummyComponents/Content";
import NoBorderTable from "../dummyComponents/NoBorderTable";
import {useDispatch, useSelector} from "react-redux";
import {cessionsSelector} from "../../store/cessions/selectors";
import {cessionsSlice} from "../../store/cessions/reducer";
import {recieveCessionsList} from "../../store/cessions/actions";
import CessionChanger from "./CessionChanger";
import {getIdByIndex} from "../../utils/getIdByIndex";
import AddButton from "./AddButton";

const actions = cessionsSlice.actions;

const headers = [{key: "name", name: 'Название'}, {key: 'lastAssignor', name: 'Цедент'}, {key: 'lastAssignee', name: 'Цессионарий'}, {key: 'lastTransferDate', name: 'Дата цессии', type: 'date'}, {key: 'createdAt', name: "Дата создания"}];

const Cessions = () => {
    const loading = useSelector(cessionsSelector.getLoading);
    const list = useSelector(cessionsSelector.getList);
    const showInfo = useSelector(cessionsSelector.selectInfoShow);
    const dispatch = useDispatch();
    const [header, setHeader] = useState(false);

    const onClickCession = (index)=> {
        dispatch(actions.setInfoCessionId(getIdByIndex(index, list.rows)));
        setHeader(list.rows[index].name);
    }

    useEffect(async () => {
        await dispatch(recieveCessionsList());
        return ()=> {
            dispatch(actions.setLoading(true));
        }
    }, []);

    return (
       <Content header={'Управление цессиями'} boxClassName={styles.main}>
           <div className={styles.cessionsToolbar}>
               <AddButton />
           </div>
           <NoBorderTable headers={headers} loading={loading} rows={list.rows} rowsButtons onClickRow={onClickCession} />
           {showInfo && <CessionChanger header={header} />}
       </Content>
    )
}


export default Cessions;