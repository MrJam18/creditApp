import React, { useState } from 'react';
import CustomModal from './CustomModal';
import styles from '../../css/warning.module.css'
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';
import { setAlert } from '../../store/alert/actions';

const useStyles = makeStyles({
    button: {
        width: '45%'
    }
})

const Warning = ({text, setShow, onSubmit}) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const onClickCancel = () => {
        setShow(false);
    }
    const onClickSubmit = async () => {
        setLoading(true)
        try{
            await onSubmit();
            setShow(false);
        }
        catch(e){
            setAlert('Ошибка', e.message, 'error')
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <CustomModal customStyles={{minHeight: '50px'}} show setShow={setShow}>
            <div className={styles.text}>{text}</div>
            <div className={styles.buttonBlock}>
                <LoadingButton loading={loading} onClick={onClickSubmit} className={classes.button} variant='contained' color='error'>Продолжить</LoadingButton>
                <Button className={classes.button} onClick={onClickCancel} variant='outlined'>Отмена</Button>
            </div>

        </CustomModal>
    );
};

export default Warning;