import LoadingButton from '@mui/lab/LoadingButton';
import { Modal, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../css/changer.module.css';
import { setAlert } from '../../store/alert/actions';
import { changeContract, getCurrentContract } from '../../store/contracts/actions';
import { changeDateFormatOnISO } from '../../utils/changeDateFormat';

const useStyles = makeStyles({
    modal: {
        position: 'absolute',

    },
    button: {
       marginTop: '15px',
        width: '40%'
    }
})

const Changer = ({data, setModal, contractId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const input = useRef();
    const [error, setError] = useState(false);
    const handleClose = ev => {
    setModal(false);
    setError(false);
    }
    const changeHandler = async () => {
        setError(false);
        setLoading(true);
        const requestData = {
            contractId,
            changingField: {
                [data.DBName]: input.current.value
            }
        }
        try {
        await dispatch(await changeContract(requestData))
        await dispatch(getCurrentContract(contractId));
        dispatch(setAlert('Успешно!', "Контракт успешно изменен!"));
        setModal(false);
        
        } 
        catch(e) {
            setError(e.message)
        }
        finally{
        setLoading(false);
        }
    }
    
    const ModalChildren = React.forwardRef((props, ref) => <div className={styles.contentBox}> <h3 className={styles.header} id="child-modal-title">{data.header}</h3>
    <form onSubmit={changeHandler}>
    <TextField fullWidth defaultValue={data.type === 'date' ? changeDateFormatOnISO(data.defaultValue) : data.defaultValue} inputRef={input} type= {data.type} />
    <LoadingButton loading={loading} type='submit' variant='contained' className={classes.button}>Подтвердить </LoadingButton> 
    <div className="error">{error}</div>
    </form>
    </div>
    )
    return (
        <div className={styles.relative}>
                <Modal onBackdropClick={handleClose} 
                open={data}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                className= {classes.modal}
                >
                   <ModalChildren/>
                </Modal>
                </div>
    );
};

export default Changer;