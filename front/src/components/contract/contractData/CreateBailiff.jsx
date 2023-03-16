import React, { useRef, useState } from 'react';
import CustomModal from '../../dummyComponents/CustomModal';
import styles from '../../../css/contract.module.css'
import { TextField } from '@mui/material';
import Address from '../../dummyComponents/Address/Address';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../../store/alert/actions';
import { createBailiff } from '../../../store/bailiffs/actions';
import CustomLoadingButton from "../../dummyComponents/CustomLoadingButton";

const CreateBailiff = ({setShow, setNewValue}) => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState();
    const nameRef = useRef();

    const onSubmit = async () => {
        setError(false);
        setLoading(true);
        try{
            const name = nameRef.current.value;
            if(!name) throw new Error('Укажите имя отдела судебных приставов!');
            if (!address) throw new Error('Заполните адрес!');
            const newBailiff = await dispatch(createBailiff({name, address}));
            dispatch(setAlert('Успешно!', "ОСП успешно добавлен!"));
            setNewValue(newBailiff);
            setShow(false);
        }
        catch (e) {
            if(e.message === "SequelizeUniqueConstraintError") setError('Данный отдел уже существует!')
            else setError(e.message);
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <CustomModal show={true} setShow={setShow}>
            <div className={styles.courtCreator}>
             <div className='header_small'>Создание Отдела судебных приставов.</div>
             <div className={styles.courtCreator__inputMargin}>
             <TextField label='Название Отдела'  variant='standard' inputRef={nameRef} required fullWidth />
             </div>
             <div className={styles.courtCreator__inputMargin}>
             <Address setAdressForDB={setAddress} />
             </div>
                <CustomLoadingButton onClick={onSubmit} loading={loading} />
             {error && <div className='error'>{error}</div>}
             </div>
        </CustomModal>
    );
};

export default CreateBailiff;