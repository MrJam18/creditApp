import { TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import styles from '../../css/orgs.module.css';
import CustomModal from '../dummyComponents/CustomModal';
import Address from '../Address'
import { makeStyles } from '@mui/styles';
import ButtonInForm from '../dummyComponents/ButtonInForm';
import { useDispatch, useSelector } from 'react-redux';
import {formDataConverter} from '../../utils/formDataConverter';
import {getOrgsLoading} from '../../store/organizations/selectors'
import { addOrganization } from '../../store/organizations/actions';

const useStyles = makeStyles({
    fullInput: {
        marginBottom: '10px'
    },
    smallInput: {
        width: '45%'
    },
    requisits: {
        height: '145px',
        marginBottom: '10px'
    }

})


const AddOrg = ({show, setShow}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ address, setAddress ] = useState(false);
    const [error, setError] = useState(false);
    const loading = useSelector(getOrgsLoading);
    const form = useRef();
    const formHandler = async (ev) => {
        try{
        ev.preventDefault();
        const elements = form.current.elements;
        if( !/^\d{10}$/.test(elements.INN.value)){
            return setError('ИНН должен содержать 10 цифр!');
        }
        if( !/^.{9}$/.test(elements.KPP.value) && elements.KPP.value !== '') {
            return setError('КПП должен содержать 9 цифр!');
        }
        if(!address){
            return setError('Укажите адрес!')
        }
        const data = formDataConverter(elements);
        await dispatch(addOrganization({
            organization: data, 
            address
        }))
        setShow(false);
        }
        catch(e){
            setError(e.message)
        }

    }

    return (
        <div>
            <form onSubmit={formHandler} ref={form}>
            <CustomModal show={show} setShow={setShow} customStyles={{width: '600px'}}>
                <div className="header_small">Введите данные организации</div>
            <TextField className={classes.fullInput} required name='name' label={"Название организации"} variant='standard' fullWidth />
            <TextField className={classes.fullInput} name='short' label={'Краткое название организации'} fullWidth variant='standard' />
            <div className={styles.smallInputsHolder}>
            <TextField className={classes.smallInput} required name='INN' label={'ИНН'} type='number' variant='standard' />
            <TextField className={classes.smallInput} name='KPP' label='КПП' type='number' variant='standard' />
            </div>
            <Address setAdressForDB={setAddress} setError={setError} />
            <TextField multiline rows='5' name='requisits' className={classes.requisits} label='Банковские реквизиты' fullWidth/>
            <ButtonInForm loading={loading} />
            <div className="error">{error}</div>
            </CustomModal>
            </form>
            
        </div>
    );
};

export default AddOrg;