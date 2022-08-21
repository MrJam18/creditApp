import { MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import CustomModal from '../../dummyComponents/CustomModal';
import CustomSelect from '../../dummyComponents/CustomSelect';
import CourtSearch from './CourtSearch';
import styles from '../../../css/contract.module.css'
import { useDispatch, useSelector } from 'react-redux';
import {createCourtClaim, createDocument} from '../../../store/contracts/actions';
import { getContractId } from '../../../store/contracts/selectors';
import getISODate from '../../../utils/getISODate';
import ButtonInForm from '../../dummyComponents/ButtonInForm';
import ExecutiveChooses from './ExecutiveChooses';
const useStyles = makeStyles({
    docItem:{
        backgroundColor: 'transparent !important',
        "&:hover": {
            backgroundColor: 'rgba(25, 118, 210, 0.08) !important'
        }
    },
    input: {
        marginBottom: '10px'
    },
    icon: {
        width: '35px',
        height: '50px',
        fontSize: '5px'
    },
    button: {
        width: '50%'
    }
})

const NoParams = ()=> <div className={styles.selectedDoc__noParams}>Нет дополнительных параметров</div>;

const SelectDoument = ({show, setShow}) => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [court, setCourt] = useState(false);
    const contractId = useSelector(getContractId);
    const [date, setDate] = useState(getISODate());
    const [showCourtSearch, setShowCourtSearch] = useState(false);
    const [showNoParams, setShowNoParams] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(false);
    const [contractJur, setContractJur] = useState(false);
    const [ignorePayments, setIgnorePayments] = useState(false);
    const [showExecutiveChoises, setShowExecutiveChoises] = useState(false);
    const [agent, setAgent] = useState(false);
    const docTypes = [{value: 'courtOrder', label: 'Судебный приказ'}, {value: 'claim', label: "Исковое заявление"}, {value: 'IDReqCourt', label: "Запрос на получение исп. документа у суда"}, {value: 'IPInit', label: "Заявление о возбуждении ИП"}, {value: 'IPIntrod', label: "Заявление об ознакомлении с материалами ИП"}, {value: 'reqDeliveryID', label: "Заявление о выдаче ИД после окончания ИП" }];
    const onCloseModal = () =>{
        setShowCourtSearch(false);
        setShowNoParams(true);
        setError(false);
        setCourt(false);
        setSelectedDoc(false);
    }
    const paramsHandler = (val) => {
        switch(val){
            case 'courtOrder':
            case 'claim':
             setShowCourtSearch(true);
             setShowNoParams(false);
             setShowExecutiveChoises(false);
             break;   
            case 'IPInit':
                setShowExecutiveChoises(true);
                setShowNoParams(false);
                setShowCourtSearch(false);
                break;
            default:
                setShowNoParams(true);
                setShowCourtSearch(false);
                setShowExecutiveChoises(false);
                break;
        }
    }
    const onSubmit = async (ev) => {
        ev.preventDefault();
        setError(false);
        setLoading(true);
        if(!selectedDoc) return setError('Выберите документ для создания!');
        try{
            switch(selectedDoc){
                case 'courtOrder':
                case 'claim':
                    if(!court) return setError('Вы не выбрали суд для подачи документа!');
                    else if(!agent)  return setError('Выберите представителя!');
                    const data = {
                        contractId,
                        courtId: court.id,
                        countDate: date,
                        ignorePayments,
                        agentId: agent.id,
                        type: selectedDoc
                    }
                    await dispatch(createCourtClaim(data));
                    setShow(false);
                    break;
                case 'IDReqCourt':
                    await dispatch(createDocument(`createCourtReqForID?contractId=${contractId}`, `Запрос на получение ИД №${contractId}`));
                    setShow(false);
                    break;
            }
        }
        catch(e){
            setError(e.message);
        }
        finally{
            setLoading(false);
        }
    }
    const onChangeDocTypes = (val) => {
        setSelectedDoc(val);
        paramsHandler(val);
    }
    const rows = docTypes.map((el)=> {
        return (<MenuItem value={el.value}> {el.label} </MenuItem>)
    })
    return (
        <CustomModal onClose={onCloseModal}  show={show} setShow={setShow} customStyles={{width: 500, left: '50%'}}>   
        <div className="header_small">Управление документами</div>
        <CustomSelect name='document' onChange={onChangeDocTypes} label='Выберите документ из списка' >{rows}</CustomSelect>
        <div className="header_small">Дополнительные параметры</div>
        {showCourtSearch && <CourtSearch onSubmit={onSubmit} setAgent={setAgent} ignorePayments={ignorePayments} setIgnorePayments={setIgnorePayments} setCourt={setCourt} setDate={setDate} setContractJur={setContractJur} /> }
        {showNoParams && <NoParams />}
        {showExecutiveChoises && <ExecutiveChooses setShow={setShow} setLoading={setLoading} setError={setError} />}
        <ButtonInForm formId='submitSelectDocument' loading={loading} />
        <div className="error">{error}</div>
        </CustomModal>
    );
};

export default SelectDoument;