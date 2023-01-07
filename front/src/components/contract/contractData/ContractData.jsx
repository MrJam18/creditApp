import React, { useState} from 'react';
import styles from '../../../css/contract.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { contractsSelectors } from '../../../store/contracts/selectors';
import Toolbar from './Toolbar'
import ExecutiveDocChanger from './ExecutiveDocChanger';
import BaseColumner from "../../dummyComponents/Columns/BaseColumner";
import {contractColumns} from "../../../constants/contractColumns";
import {changeContract} from "../../../store/contracts/actions";



const ContractData = ({contractId}) => {
    const contract = useSelector(contractsSelectors.getCurrent);
    const dispatch = useDispatch();
    const [showExecutiveDocChanger, setShowExecutiveDocChanger] = useState(false);
    const onClickExecutiveDoc = () => {
        setShowExecutiveDocChanger(true);
    }
    const requestFunction = async (data) => {
       await dispatch(changeContract(data, contractId));
    }
    const setters = [{
        colName: 'executiveDocName',
        func: onClickExecutiveDoc
    }];
    return (
        <div className={styles.content}>
            {showExecutiveDocChanger && <ExecutiveDocChanger  setShow={setShowExecutiveDocChanger}/>}
                <div className={styles.header_small}>Информация о договоре.</div>
                <Toolbar />
                <div className={styles.content__text}>
                    <BaseColumner data={contract} setters={setters} reqFunction={requestFunction} columns={contractColumns} />
                </div>
            </div>
    );
};

export default ContractData;