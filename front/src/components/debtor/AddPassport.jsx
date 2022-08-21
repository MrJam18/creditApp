import React, {useRef, useState} from 'react';
import CustomModal from "../dummyComponents/CustomModal";
import styles from '*/debtorInfo.module.css';
import TextField from "@mui/material/TextField";
import PassportTypeSelect from "./PassportTypeSelect";
import {makeStyles} from "@mui/styles";
import {standardFontSize} from "../../utils/standardFontSize";
import ButtonInForm from "../dummyComponents/ButtonInForm";
import {formDataConverter} from "../../utils/formDataConverter";
import {useError} from "../../hooks/useError";
import {useDispatch} from "react-redux";
import {useParams} from "react-router";
import {definePassport} from "../../store/debtors/actions";

const useStyles = makeStyles({
    input: {
        marginBottom: '8px',
        maxWidth: '250px',
    },
    checkbox: {
        width: '160px',
        lineHeight: 1.2,
        marginLeft: '55px'
    },
    smallInput: {
        width: '176px',
    },
    button: {
        width: '50%',
        height: '35px',
    },
})

const AddPassport = ({setShow}) => {
    const {debtorId} = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [type,setType] = useState('1');
    const {setError, ErrorComp} = useError();
    const [loading, setLoading] = useState(false);
    const formRef = useRef();
    const onSubmit = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        try{
        const data = formDataConverter(formRef.current.elements);
        if(type === 'noPassport') throw new Error('Введите измененные данные!');
        data.typeId = type;
        await dispatch(definePassport(debtorId, data));
        setShow(false);
        }
        catch (e) {
            console.log(e);
            setError(e.message)
        }
        finally {
            setLoading(false);
        }


    }

    return (
        <CustomModal header='Изменение данных' setShow={setShow} >
            <div className="header_small margin-bottom_10">Укажите паспортные данные</div>
            <div className={styles.addPassport__fullWidthInput}>
                <PassportTypeSelect type={type} setType={setType} />
            </div>
            <form onSubmit={onSubmit} ref={formRef}>
            {type !== 'noPassport' && <>
                <div className={styles.addPassport__inputBlock}>
                    <TextField label='Серия'  variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} name='series' className={classes.smallInput} required size = 'small' />
                    <TextField label='Номер'  variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} name='number' className={classes.smallInput} required size = 'small'/>
                </div>
                <div className={styles.addPassport__fullWidthInput}>
                    <TextField label='Кем выдан' name='issued_by'  variant="standard" fullWidth size = 'small' sx={{ '& .MuiInput-root': standardFontSize, '& .MuiInputLabel-root': standardFontSize}}/>
                </div>
                <div className={styles.addPassport__inputBlock}>
                    <TextField size ='small' label='Дата выдачи' name='issued_date'  variant="standard" type='date' InputLabelProps={{shrink: true}} className={classes.smallInput}/>
                    <TextField size ='small' label='Код подразделения'  variant="standard" name='gov_unit_code' className={classes.smallInput} />
                </div>
            </>}
            <ButtonInForm loading={loading} />
            </form>
            <ErrorComp />
        </CustomModal>
    );
};

export default AddPassport;