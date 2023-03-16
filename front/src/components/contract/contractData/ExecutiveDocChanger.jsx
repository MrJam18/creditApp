import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {contractsSelectors} from '../../../store/contracts/selectors';
import CustomModal from '../../dummyComponents/CustomModal';
import EasySelect from '../../dummyComponents/EasySelect';
import styles from '../../../css/contract.module.css';
import ButtonInForm from '../../dummyComponents/ButtonInForm';
import { useParams } from 'react-router';
import { formDataConverter } from '../../../utils/formDataConverter';
import {setExecutiveDoc} from '../../../store/contracts/actions';
import CreateBailiff from "./CreateBailiff";
import CourtCreator from "./CourtCreator";
import SearchAndAddButton from "../../dummyComponents/search/SearchAndAddButton";
import EasyInput from "../../dummyComponents/EasyInput";
import CustomInput from "../../dummyComponents/CustomInput";
import useModal from "../../../hooks/useModal";

const types = [{name: 'Судебный приказ', id: 1}, {name: 'Исполнительный лист', id: 2}]


const ExecutiveDocChanger = ({setShow}) => {

    const dispatch = useDispatch();
    const executiveDoc = useSelector(contractsSelectors.getExecutiveDoc);
    const formRef = useRef();
    const {contractId} = useParams();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bailiff, setBailiff] = useState(executiveDoc.bailiff);
    const [showCreateBailiff, setShowCreateBailiff] = useState(false);
    const [typeId, setTypeId] = useState(executiveDoc.typeId);
    const courtFromStore = useSelector(contractsSelectors.getCourt);
    const [court, setCourt] = useState(courtFromStore);
    const showCourtCreator = useModal();
    const onClickCreateBailiff = () => {
        setShowCreateBailiff(true);
    }
    const onSubmit = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        const formData = formDataConverter(formRef);
        try {
        await dispatch(setExecutiveDoc(formData, court, bailiff, typeId, contractId, executiveDoc.id));
        setShow(false);
        } catch(e) {
            setLoading(false);
            setError(e.message);
        }
        setLoading(false);

    }
    return (
        <CustomModal customStyles={{width: 500}} show setShow={setShow}>
        <div className={'header_small'}>Изменение исполнительного документа</div>
        <form ref={formRef} onSubmit={onSubmit} >
            <div className={styles.executiveChoises__main}>
                {showCreateBailiff && <CreateBailiff setShow={setShowCreateBailiff} setNewValue={setBailiff} /> }
                {showCourtCreator.show && <CourtCreator setValue={setCourt} setShow={showCourtCreator.setShow} show={showCourtCreator.show} /> }
                <div className={styles.contentBlock}>
                    <SearchAndAddButton value={court} onClickButton={showCourtCreator.setShowTrue} serverAddress={'courts/findByName'} required setValue={setCourt} label='Суд, вынесший решение' />
                </div>
                <div className={styles.executiveChoises__bailiffBlock}>
                    <SearchAndAddButton value={bailiff} serverAddress={'bailiffs/search'} required setValue={setBailiff} label='Отдел судебных приставов-исполнителей' onClickButton={onClickCreateBailiff} />
                </div>
                <div className={styles.contentBlock}>
                    <EasyInput size={'small'}  className={styles.smallInput} pattern='lessThenNow' defaultValue={executiveDoc.dateIssue} type='date' name='dateIssue' required label='дата ИД' />
                    <CustomInput size={'small'} customValidity={'номер в формате ББ№ЧЧЧЧЧЧЧЧ или Ч-ЧЧЧЧ/ЧЧЧЧ где Ч - это число, Б-это буква.'} className={styles.smallInput} pattern='(^[А-Яа-яЁё]{2}№\d+$)|^\d{1}-\d+\/\d{4}$'  defaultValue={executiveDoc.number} name='number' required label='Номер ИД' />
                </div>
                <div className={styles.contentBlock}>
                    <EasySelect name='typeId' onChange={(value)=>setTypeId(value)} variants={types} defaultValue={executiveDoc.typeId} label='Тип исполнительного документа *' />
                </div>
                <div className={styles.smallHeader}>Инфомация о взысканных суммах</div>
                <div className={styles.contentBlock}>
                    <EasyInput className={styles.smallInput} size={'small'} defaultValue={executiveDoc.main} name='main' variant='standard' pattern='float' required label='осн. долг' />
                    <EasyInput className={styles.smallInput} size={'small'} defaultValue={executiveDoc.percents} name='percents' variant='standard' pattern='float'  required label='Проценты' />
                </div>
                <div className={styles.contentBlock}>
                    <EasyInput className={styles.smallInput} size={'small'} defaultValue={executiveDoc.penalties} name='penalties' variant='standard' pattern='float' required label='Неустойка' />
                    <EasyInput className={styles.smallInput} size={'small'} defaultValue={executiveDoc.fee} name='fee' variant='standard' pattern='float' required label='Госпошлина' />
                </div>
                {typeId === 2 &&
                    <div className={styles.contentBlock}>
                        <EasyInput className={styles.smallInput} required defaultValue={executiveDoc.resolutionNumber} name='resolutionNumber' size={'small'} variant='standard' label='номер решения' />
                        <EasyInput size={'small'} className={styles.smallInput} required defaultValue={executiveDoc.resolutionDate} InputLabelProps={{shrink: true}} name='resolutionDate' type='date' pattern='lessThenNow' variant='standard' label='дата решения' />
                    </div>
                }
            </div>
            {error && <div className="error">{error}</div>}
            <ButtonInForm loading={loading} />
            </form>
        </CustomModal>

    );
};

export default ExecutiveDocChanger;