import React, { useRef, useState } from 'react';
import CustomModal from '../../dummyComponents/CustomModal';
import styles from '../../../css/contract.module.css'
import { TextField } from '@mui/material';
import Address from '../../Address';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../../store/alert/actions';
import ButtonInForm from '../../dummyComponents/ButtonInForm'
import { createBailiff } from '../../../store/bailiffs/actions';

const CreateBailiff = ({setShow}) => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState();
    const nameRef = useRef();

    const onSubmit = async (ev) => {
        ev.preventDefault();
        if (!address) setError('Заполните адрес!');
        else {
            const name = nameRef.current.value;
            setLoading(true);
            setError(false);
            try{
                await dispatch(createBailiff({name, address}));
                dispatch(setAlert('Успешно!', "ОСП успешно добавлен!"));
                setShow(false);
            }
            catch(e){
                if(e.message === "SequelizeUniqueConstraintError") setError('Данный отдел уже существует!')
                else setError(e.message) ;
            }
            finally{
                setLoading(false)
            }
        }
    }
    return (
        <CustomModal show={true} setShow={setShow}>
            <div className={styles.courtCreator}>
             <div className='header_small'>Создание Отдела судебных приставов.</div>
             <form onSubmit={onSubmit} >
             <div className={styles.courtCreator__inputMargin}>
             <TextField label='Название Отдела'  variant='standard' inputRef={nameRef} required fullWidth />
             </div>
             <div className={styles.courtCreator__inputMargin}>
             <Address setAdressForDB={setAddress} />
             </div>
             <ButtonInForm loading={loading} />
             </form>
             {error && <div className='error'>{error}</div>}
             </div>
        </CustomModal>
    );
};

export default CreateBailiff;