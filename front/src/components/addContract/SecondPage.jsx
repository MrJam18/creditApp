import React, {useRef, useState} from 'react';
import styles from '*/addContract.module.css';
import EasySelect from "../dummyComponents/EasySelect";
import {executiveDocTypes} from "../../constants/executiveDocTypes";
import {defaultAddContractMUI} from "./defaultMuiClasses";
import EasyInput from "../dummyComponents/EasyInput";
import {useError} from "../../hooks/useError";
import ButtonInForm from "../dummyComponents/ButtonInForm";
import {formDataConverter} from "../../utils/formDataConverter";
import CourtSearcher from "../dummyComponents/search/CourtSearcher";


const SecondPage = ({setData}) => {
    const classes = defaultAddContractMUI();
    const formRef = useRef();
    const {setError, ErrorComp} = useError();
    const [typeId, setTypeId] = useState(false);
    const [court, setCourt] = useState(false);
    const onSubmit = (ev) => {
        ev.preventDefault();
        setError(false);
        try{
            if(!typeId) throw new Error("Укажите вид исполнительного документа!");
            if(!court) throw new Error('Укажите суд, выдавший исполнительный документ!');
            const data = formDataConverter(formRef.current.elements);
            data.courtId = court.id;
            setData(data);
        }
        catch(e) {
            setError(e.message)
        }
    }

    return (
    <>
        <form ref={formRef} onSubmit={onSubmit} >
            <div className={styles.header}>Информация об исполнительном документе</div>
            <div className={styles.contractData}>
                <div className="fullWidthFlexBlock flex_JCC">
                <EasySelect name='typeId' onChange={(typeId)=> setTypeId(typeId)} variants={executiveDocTypes} customClassName={styles.block_75} label='Тип исполнительного документа' />
                </div>
                <EasyInput label='Номер исп. документа' required className={classes.input} name='number' />
                <EasyInput label='Дата выдачи' pattern={'lessThenNow'} required className={classes.input} name='dateIssue' type='date' />
                {typeId === 2 &&
                    <>
                    <EasyInput label='Номер решения' className={classes.input} name='resolutionNumber'/>
                    <EasyInput label='Дата решения' className={classes.input} name='resolutionDate' type='date' pattern='lessThenNow' />
                    </>
                }
                <div className="fullWidth">
                    <CourtSearcher setCourt={setCourt} />
                </div>
            </div>
            <div className={styles.noWeightHeader}>Информация о взысканных по исп. документу суммах</div>
            <div className={styles.contractData}>
                <EasyInput label='основной долг' required pattern='float' className={classes.input} name='main' />
                <EasyInput label='Проценты' required pattern='float' className={classes.input} name='percents' />
                <EasyInput label='Неустойка' required pattern='float' className={classes.input} name='penalties' />
                <EasyInput label='Гос. пошлина' required pattern='float' className={classes.input} name='fee' />
            </div>
            <ButtonInForm text='Продолжить' />
        </form>
        <ErrorComp />
            </>
        );
};

export default SecondPage;