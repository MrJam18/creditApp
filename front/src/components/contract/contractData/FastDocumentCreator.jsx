import React, { useState } from 'react';
import styles from '../../../css/contract.module.css'
import CustomModal from '../../dummyComponents/CustomModal';
import { useDispatch} from 'react-redux';
import { setCourtsList } from '../../../store/courts/actions';
import CourtCreator from './CourtCreator';
import { useParams } from 'react-router';
import { createDocument } from '../../../store/contracts/actions';
import { setAlert } from '../../../store/alert/actions';
import CourtSearch from './CourtSearch';
import ButtonInForm from '../../dummyComponents/ButtonInForm';


const FastDocumentCreator = ({show, setShow}) => {
    const {contractId} = useParams();
    const dispatch = useDispatch();
    const [showCourtCreator, setShowCourtCreator] = useState(false);
    const [error, setError] = useState(false);
    const [court, setCourt] = useState();
    const [date, setDate] = useState();
    const [loading, setLoading] = useState(false);
    const [contractJur, setContractJur] = useState(false);
    const [ignorePayments, setIgnorePayments] = useState(false);
    const [agent, setAgent] = useState(false);

    const onCloseModal = () =>{
        dispatch(setCourtsList([]));
        setError(false);
    }
    const formHandler = async(ev) => {
        ev.preventDefault();
        setError(false);
        setLoading(true);
        try{
        if(!court) setError('Выберите суд из списка!');
        else if(!agent) setError('Выберите представителя!');
        else {
            await dispatch(createDocument(`createCourtOrder?contractId=${contractId}&courtId=${court.id}&date=${date}&contractJur=${contractJur}&ignorePayments=${ignorePayments}&agentId=${agent.id}`, 'Судебный приказ ' + contractId));
            dispatch(setCourtsList([]));
            setCourt(undefined);
            dispatch(setAlert('Успешно!', "Иск успешно создан!"));
            setShow(false);
        }
    }
    catch(e){
        console.log(e);
        setError(e.message)
    }
    finally{
        setLoading(false);
    }
    }
    return ( <> 
            <CustomModal onClose={onCloseModal}  show={show} setShow={setShow} customStyles={{width: 500, left: '50%'}}>       
            {showCourtCreator && <CourtCreator show={showCourtCreator} setShow={setShowCourtCreator} setValue={setCourt} />}
                <div className={styles.fastCreator}>
                <div className='header_small'>Информация об иске</div>
                <CourtSearch setCourt={setCourt} setDate={setDate} setAgent={setAgent} contractJur={contractJur} setContractJur={setContractJur} ignorePayments={ignorePayments} setIgnorePayments={setIgnorePayments} />
                </div>
                <ButtonInForm loading={loading} onClick={formHandler} />
                <div className="error">{error}</div>
            </CustomModal>
            </>
    );
};

export default FastDocumentCreator;