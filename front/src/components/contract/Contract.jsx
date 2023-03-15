import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getCurrentContract } from '../../store/contracts/actions';
import styles from '../../css/contract.module.css';
import { getContract } from '../../store/contracts/selectors';
import { chandeDateFormatOnRus } from '../../utils/changeDateFormat';
import Loading from '../dummyComponents/Loading';
import ContractMenu from './ContractMenu';
import ContractData from './contractData/ContractData';
import ContractPayments from './ContractPayments'
import { Divider } from '@mui/material';
import Actions from './Actions';
import { setAlert } from '../../store/alert/actions';


const Contract = () => {
    const { contractId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const contract = useSelector(getContract);
    const [menuValue, setMenuValue] = useState('data');
    const menuSelector = () => {
        switch (menuValue) {
            case 'data':
            return <ContractData contractId={contractId}/>
            case 'payments': 
            return <ContractPayments />
            case 'actions':
            return <Actions />
        }
        
    }

    const getNecessary = async () => {
        setLoading(true);
        try{
        await dispatch(getCurrentContract(contractId));
        }
        catch(e){
            setAlert('Ошибка!', "Ошибка при получении данных контракта!", 'error');
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(getNecessary, [])
    return (
    <div className={'background firstWindow'}>
        {loading ? 'Загрузка' : <div className="header">{`${contract.name} № ${contract.number} от ${chandeDateFormatOnRus(contract.date_issue)} г.`}</div> }
    <div className={"contentBox" + ' ' + styles.main}>
    <ContractMenu menuValue={menuValue} setMenuValue = {setMenuValue} />
    <Divider orientation='vertical' />
        {loading ? <div className="center"><Loading/></div> : menuSelector()    }
    </div>

    </div>
    );
};

export default Contract;