import React, {useEffect, useRef, useState} from 'react';
import styles from '../../../css/contract.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router';
import {useMedia} from "../../../hooks/useMedia";
import {contractsSlice} from "../../../store/contracts/reducer";
import {contractsSelectors} from "../../../store/contracts/selectors";
import EasySearch from "../../dummyComponents/search/EasySearch";
import api from "../../../http";
import ExecutiveDocChanger from "./ExecutiveDocChanger";
import {createIPInitDoc} from "../../../store/contracts/actions";
import {CreateIPInitController} from "../../../controllers/CreateIPInitController";

const actions = contractsSlice.actions;

const ExecutiveChooses = ({setShow, setError, setLoading, setFixedStyles}) => {
    const {contractId} = useParams();
    const formRef = useRef();
    const executiveDocName = useSelector(contractsSelectors.getExecutiveDocName);
    const [agent, setAgent] = useState();
    const [showExecutiveDocChanger, setShowExecutiveDocChanger] = useState(false);
    const onSubmit = async (ev) => {
        ev.preventDefault();
        const data = {
            contractId,
            agent
        }
        const controller = new CreateIPInitController(setError, setLoading, setShow, data);
        await controller.handle();
    }
    useEffect( async ()=> {
        const { data } = await api.get('agents/getDefault');
        setAgent(data);
        return ()=> {
            setAgent(null);
        }
    }, []);
    const onClickExecutiveDoc = () => {
        setShowExecutiveDocChanger(true);
    }
    return (
        <>
        <form id='submitSelectDocument' onSubmit={onSubmit} ref={formRef}>
        <div className={styles.smallHeader}>
            Исполнительный документ
        </div>
            <div className={styles.executiveChooses__ExecutiveDocName} onClick={onClickExecutiveDoc}>{executiveDocName}</div>
            <div className={styles.smallHeader}>
               Ф.И.О. представителя
            </div>
            <EasySearch className='margin-bottom_10' value={agent} setValue={setAgent} serverAddress={'agents/getSearchList'} required />
        </form>
            {showExecutiveDocChanger && <ExecutiveDocChanger setShow={setShowExecutiveDocChanger} />}
        </>
    );
};

export default ExecutiveChooses;