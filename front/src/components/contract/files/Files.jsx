import React, {useEffect} from 'react';
import styles from 'css/contract.module.css';
import FileHandler from "./FileHandler";
import {useDispatch} from "react-redux";
import {getExistingFiles} from "../../../store/contracts/actions";
import {useParams} from "react-router";
import {contractsSlice} from "../../../store/contracts/reducer";

const actions = contractsSlice.actions;

const Files = () => {
    const dispatch = useDispatch();
    const {contractId} = useParams();
    useEffect(()=> {
        dispatch(getExistingFiles(contractId));
        return ()=> {
            dispatch(actions.setExistingLoading(true));
        }
    })
 return (
  <div className={styles.documents}>
      <FileHandler documentName='contract'  header={'Договор и приложения'} />
      <FileHandler documentName='courtOrder' header={'Судебный приказ'} />
      <FileHandler documentName='cancelDecision' header={'Определение об отмене суд. приказа'} />
      <FileHandler documentName='receivingOrder' header={'Исполнительный лист'} />
      <FileHandler documentName='IPInit' header={'Постановление о возбуждении ИП'} />
      <FileHandler documentName='IPEnd' header={'Постановление об окончании ИП'} />
  </div>
 );
};

export default Files;