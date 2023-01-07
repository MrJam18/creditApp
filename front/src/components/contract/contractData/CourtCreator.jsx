import React, { useEffect, useRef, useState } from 'react';
import CustomModal from '../../dummyComponents/CustomModal';
import styles from '../../../css/contract.module.css'
import { TextField } from '@mui/material';
import Address from '../../dummyComponents/Address/Address';
import { useDispatch, useSelector } from 'react-redux';
import { getCourtsLevels, getCourtsTypes } from '../../../store/courts/selectors';
import EasySelect from '../../dummyComponents/EasySelect';
import { createCourt, recieveCourtLevels, recieveCourtTypes } from '../../../store/courts/actions';
import {formDataConverter} from '../../../utils/formDataConverter'
import { setAlert } from '../../../store/alert/actions';
import ButtonInForm from '../../dummyComponents/ButtonInForm'

const CourtCreator = ({show, setShow, setValue}) => {
    const dispatch = useDispatch();
    const form = useRef();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState();
    const [addressError, setAddressError] = useState(false);
    const levels = useSelector(getCourtsLevels);
    const types = useSelector(getCourtsTypes);
    const getNecessary =  async () => {
       await dispatch(recieveCourtTypes());
       await dispatch(recieveCourtLevels());
    }
    useEffect(getNecessary, []);
    const onSubmit = async () => {
        const data = formDataConverter(form.current.elements);
        if (!address) setError('Заполните адрес!');
        else {
            setLoading(true);
            setError(false);
            try{
                const court = await dispatch(createCourt(data, address));
                setValue({
                    name: court.name,
                    id: court.id
                });
                dispatch(setAlert('Успешно!', "Суд успешно добавлен!"));
                setShow(false);
            }
            catch(e){
                if(e?.response?.data?.message) setError(e.response.data.message);
                else setError(e.message);
            }
            setLoading(false)
            
        }
    }
    return (
        <CustomModal show={show} setShow={setShow}>
            <div className={styles.courtCreator}>
             <div className='header_small'>Создание суда.</div>
             <form ref={form} >
             <div className={styles.courtCreator__inputMargin}>
             <TextField label='Название суда' variant='standard' required name='name' fullWidth />
             </div>
             <div className={styles.courtCreator__inputMargin}>
             <EasySelect name='courtTypeId' label='Подведомственность' initValue={1} variants={types} />
             </div>
             <div className={styles.courtCreator__inputMargin}>
             <EasySelect name='courtLevelId' label='Уровень' variants={levels} />
             </div>
             <div className={styles.courtCreator__inputMargin}>
             <Address error={addressError} setError={setAddressError} setAdressForDB={setAddress} />
             </div>
             <ButtonInForm type='button' loading={loading} onClick={onSubmit} />
             </form>
             {error && <div className='error'>{error}</div>}
             </div>
        </CustomModal>
    );
};

export default CourtCreator;