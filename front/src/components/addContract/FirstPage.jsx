import React, { useEffect, useRef, useState } from 'react';
import styles from '*/addContract.module.css';
import { InputLabel, MenuItem, Select } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { findCessions } from '#/cessions/actions';
import {cessionsSlice} from "../../store/cessions/reducer";
import { getOrganizationsSearchList } from '#/organizations/selectors';
import { findOrganizations } from '#/organizations/actions';
import { formDataConverter } from '%/formDataConverter';
import { recieveStatuses } from '#/contracts/actions';
import CustomSearch from '$/dummyComponents/CustomSearch';
import { organizationsSlice } from '#/organizations/reducer';
import {getContractStatuses} from "#/contracts/selectors";
import EasySelect from "$/dummyComponents/EasySelect";
import {defaultAddContractMUI} from "./defaultMuiClasses";
import EasyInput from "../dummyComponents/EasyInput";
import {useError} from "../../hooks/useError";
import {cessionsSelector} from "../../store/cessions/selectors";

const cessionsActions = cessionsSlice.actions;


const FirstPage = ({setStatus, setData}) => {
    const dispatch = useDispatch();
    const classes = defaultAddContractMUI();
    const [contractType, setContractType] = useState('1');
    const contractName = useRef();
    const formRef = useRef();
    const statuses = useSelector(getContractStatuses);
    const {ErrorComp, setError} = useError()
    const cessions = useSelector(cessionsSelector.getSearchList);
    const organizations = useSelector(getOrganizationsSearchList);
    const [cession, setCession] = useState({value: 'Принадлежит выдавшей организации', id: null});
    const [organization, setOrganization] = useState();
    const onChangeOrganizations = (val) => {
        dispatch(findOrganizations(val, setError));
    }
    const onChooseOrganization = (val) => {
        setOrganization(val);
    } 
    const onChangeCessions = (val) => {
        dispatch(findCessions(val, setError));
    }
    const onChooseCession = (val) => {
        setCession(val);
    }

    const contractTypeHandler = ev => {
        setContractType(ev.target.value);
        if (ev.target.value === '1') contractName.current.value = 'договор займа'
        else contractName.current.value = 'кредитный договор'  
    }

    const startHandler = () => {
        setError(false);
        dispatch(organizationsSlice.actions.setSearchList([]));
        dispatch(cessionsActions.setSearchList([]));
        dispatch(recieveStatuses());
    }
    useEffect(startHandler, []);
    const formHandler = async(ev)=> {
        ev.preventDefault();
        setError(false);
        const formData = formDataConverter(formRef.current.elements);
        try{
            if(!cession) throw new Error('Выберите договор цессии!');
            if(!organization) throw new Error('Выберите организацию, которой принадлежит заем!');
            const data = {
                ...formData, cessionId: cession.id, organizationId: organization.id
            }
            setData(data);
        }
        catch(e) {
            setError(e);
        }
    }
    return (
        <>
                <form ref={formRef}  onSubmit={formHandler}>
                <div className={styles.contractBlock}>
                <div className={styles.header + ' ' + 'marginTop_0'}>Данные о договоре</div>
            <div className={styles.contractData}>
                    <div className={styles.selectBlock + ' ' + classes.input }>
                <InputLabel id="contractType" required className={classes.selectLabel}>тип договора</InputLabel>
            <Select fullWidth variant='standard' labelId="contractType"
            value={contractType}
            name= 'typeId'
            onChange= {contractTypeHandler}
            >
            <MenuItem value='1'>договор займа</MenuItem>
            <MenuItem value='2'>кредитный договор</MenuItem>
            </Select>
            </div>
                <EasyInput label='название договора'   name='name' defaultValue={contractType === '1' ? 'договор займа' : 'кредитный договор'} ref={contractName} required className={classes.input} />
                <EasyInput label='Номер договора'   name='number' required className={classes.input}/>
                <EasyInput label='Дата выдачи'  type='date' pattern='lessThenNow' name='date_issue'  required className={classes.input} />
                <EasyInput label='сумма выдачи'  name='sum_issue' pattern='float' required className={classes.input} />
                <EasyInput label='дата исполнения' type='date' name='due_date' pattern='lessThenNow' required className={classes.input} />
                <EasyInput label='проц. ставка (% год.)'   name='percent' pattern='float' required className={classes.input} />
                <EasyInput label='неустойка (% год.)' name='penalty' pattern='float' required className={classes.input} />
                </div>
            <div className={styles.selectMargin}>
                <CustomSearch label='Организация, которой принадлежит заем' results={organizations} onSearch={onChangeOrganizations} onClick={onChooseOrganization}  />
            </div>
            <div className={styles.selectMargin}>
            <CustomSearch label='договор цессии, по которому приобретен займ' onSearch={onChangeCessions} results={cessions} onClick={onChooseCession} defaultValue={'Принадлежит выдавшей организации'} />
            </div>
            <div className={styles.selectMargin + ' center'}>
                <EasySelect defaultValue={'1'} variants={statuses} key={statuses.id} onChange={ (id)=> setStatus(id)} label='Статус' style={{width: '45%'}}/>
            </div>
                </div>
        <div className={'button_submit' + ' ' + styles.button_submit}><LoadingButton variant="contained" size="large" type='submit' className={classes.button}>
          Продолжить
        </LoadingButton></div>
                    <ErrorComp />
        </form>
        </>
    );
};

export default FirstPage;