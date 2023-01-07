import { MenuItem } from '@mui/material';
import React, {useState} from 'react';
import CustomModal from '../../dummyComponents/CustomModal';
import CustomSelect from '../../dummyComponents/CustomSelect';
import CourtChooses from './CourtChooses';
import styles from '../../../css/contract.module.css'
import ButtonInForm from '../../dummyComponents/ButtonInForm';
import ExecutiveChooses from './ExecutiveChooses';
import {useError} from "../../../hooks/useError";
import {useParams} from "react-router";


const NoParams = ()=> <div className={styles.selectedDoc__noParams}>Нет дополнительных параметров</div>;

const SelectDocument = ({show, setShow}) => {
    const error = useError();
    const [loading, setLoading] = useState(false);
    const {contractId} = useParams();
    const [showCourtChooses, setShowCourtChooses] = useState(false);
    const [showNoParams, setShowNoParams] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(false);
    const [showExecutiveChoises, setShowExecutiveChoises] = useState(false);
    const [fixedStyles, setFixedStyles] = useState(null);
    const docTypes = [{value: 'courtOrder', label: 'Судебный приказ'}, {value: 'claim', label: "Исковое заявление"}, {value: 'IDReqCourt', label: "Запрос на получение исп. документа у суда"}, {value: 'IPInit', label: "Заявление о возбуждении ИП"}, {value: 'IPIntrod', label: "Заявление об ознакомлении с материалами ИП"}, {value: 'reqDeliveryID', label: "Заявление о выдаче ИД после окончания ИП" }];
    const onCloseModal = () =>{
        setShowCourtChooses(false);
        setShowNoParams(true);
        error.noError();
        setSelectedDoc(false);
    }
    const paramsHandler = (val) => {
        switch(val){
            case 'courtOrder':
            case 'claim':
             setShowCourtChooses(true);
             setShowNoParams(false);
             setShowExecutiveChoises(false);
             break;   
            case 'IPInit':
                setShowExecutiveChoises(true);
                setShowNoParams(false);
                setShowCourtChooses(false);
                break;
            default:
                setShowNoParams(true);
                setShowCourtChooses(false);
                setShowExecutiveChoises(false);
                break;
        }
    }
    const onChangeDocTypes = (val) => {
        setSelectedDoc(val);
        paramsHandler(val);
    }
    const rows = docTypes.map((el)=> {
        return (<MenuItem value={el.value}> {el.label} </MenuItem>)
    });
    return (
        <CustomModal onClose={onCloseModal}  show={show} setShow={setShow} fixedStyles={fixedStyles} customStyles={{width: 500, left: '50%'}}>
        <div className="header_small">Управление документами</div>
        <CustomSelect name='document' onChange={onChangeDocTypes} label='Выберите документ из списка' >{rows}</CustomSelect>
        <div className="header_small">Дополнительные параметры</div>
        {showCourtChooses && <CourtChooses contractId={contractId} setLoading={setLoading} setError={error.setError} setShow={setShow}  selectedDoc={selectedDoc} setFixedStyles={setFixedStyles} /> }
        {showNoParams && <NoParams />}
        {showExecutiveChoises && <ExecutiveChooses contractId={contractId} setFixedStyles={setFixedStyles} setShow={setShow} setLoading={setLoading} setError={error.setError} />}
        <ButtonInForm formId='submitSelectDocument' loading={loading} customClassName={styles.selectDocument__button} />
            {error.comp()}
        </CustomModal>
    );
};

export default SelectDocument;