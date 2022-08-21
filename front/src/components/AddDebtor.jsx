import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import styles from '../css/addDebtor.module.css'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useRef } from 'react';
import Address from './Address';
import { debtorCreator } from '../store/debtors/actions';
import { useDispatch } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import { setAlert } from '../store/alert/actions';
import { recieveList } from '../store/list/actions';
import {standardFontSize} from "../utils/standardFontSize";
import PassportTypeSelect from "./debtor/PassportTypeSelect";

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
        width: '225px',
    },
    button: {
        width: '50%',
        height: '35px',
    },
})

const AddDebtor = ({setAddDebtor}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [isforeign, setIsForeign] = useState(false);
    const [noPatronymic, setNoPatronymic] = useState(false);
    const [noBirthDate, setNoBirthDate] = useState(false);
    const [noBirthPlace, setNoBirthPlace] = useState(false);
    const [passportType, setPassportType] = useState('1');
    const [errorAddress, setErrorAddress] = useState(true);
    const [adressForDB, setAdressForDB] = useState();
    const [loading, setLoading] = useState(false);
    const debtorForm = useRef();
    const [error, setError] = useState(false);

    const checkBoxHandler = (state, setState) => {
        setState(!state);
        
    }
    const changePassportTypeHandler = (ev) => {
        setPassportType(ev.target.value);
    }
    const formHandler = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        setError(false);
        const form = debtorForm.current.elements;
        const now = Date.now();
        const birthDate = Date.parse(form.birthDate.value);
        try {
            if (!adressForDB) throw new Error('Укажите Адрес!');
            if ((/[^а-яА-Я]/.test(form.name.value) || /[^а-яА-Я]/.test(form.surname.value) || /[^а-яА-Я]/.test(form.patronymic.value)) && isforeign === false) throw new Error('Фамилия, имя и отчество должны быть заполнены только русскими буквами!');
            if (now < birthDate) throw new Error('Дата рождения должна быть меньше текущей даты!');
            if (passportType !== 'noPassport') {
                if (!/^\d{4}$/.test(form.series.value) && passportType === '1') throw new Error('Серия паспорта должна состоять из 4 цифр!');
                else if (!/^\d{6}$/.test(form.number.value) && passportType === '1') throw new Error('Номер паспорта должен состоять из 6 цифр!');
                const issueDate = Date.parse(form.issueDate.value);
                if (now < issueDate) throw new Error('Дата выдачи должна быть меньше текущей даты!');
                if (!/^\d{3}-\d{3}$/.test(form.govCode.value) && passportType === '1') throw new Error('код подразделения должен быть формата "111-111"!')
            }
           const response = await dispatch(debtorCreator(form, adressForDB, setError));
           if (response.message) throw new Error(response.message);
            setAddDebtor(false);
            dispatch(setAlert('Успешно', "Должник успешно добавлен!"));
            await dispatch(recieveList(25,1));
        }
           catch(e) {
               console.log(e)
               setError(e.message);
           }
           finally {
            setLoading(false);
        }
    }
    return (
        <div className='background secondWindow'>
            <form onSubmit={formHandler} ref={debtorForm}>
            <div className="header">Создание должника</div>
            <div className={"contentBox" + ' ' + styles.main__block}>
                <div className="closingButton">
                <FontAwesomeIcon icon={solid("xmark")} className='xmark' onClick={()=> setAddDebtor(false)}/>
                </div>
                <div className={styles.debtor__block}>
                <div className={styles.header  + ' ' + styles.header_first }>Информация о должнике</div>
                    <div className="position_relative">
                        <TextField label='Фамилия'  size='small' name='surname' required variant= 'standard' className={classes.input}  sx={{ '& .MuiInput-root': standardFontSize, '& .MuiInputLabel-root': standardFontSize}} fullWidth/>
          <FormControlLabel onClick={()=> checkBoxHandler(isforeign, setIsForeign)} control = {<Checkbox    size= 'small' inputProps={{ tabIndex: "-1" }}/>} sx={{ '& .MuiTypography-root': standardFontSize}}
           label= 'иностранный гражданин' className={classes.checkbox + ' ' + 'position_absolute'}/>
          </div>
          <div className="position_relative">
                        <TextField label='Имя'  size='small' required sx={{ '& .MuiInput-root': standardFontSize, '& .MuiInputLabel-root': standardFontSize}}  variant= 'standard' className={classes.input} fullWidth name='name'/>
          </div>
          <div className="position_relative">
                        <TextField label='Отчество'  size='small' name='patronymic' required variant= 'standard' className={classes.input}   sx={{ '& .MuiInput-root': standardFontSize, '& .MuiInputLabel-root': standardFontSize}} disabled = {noPatronymic && true} fullWidth/>
          <FormControlLabel  control = {<Checkbox    size= 'small' inputProps={{ tabIndex: "-1" }}/>} sx={{ '& .MuiTypography-root': standardFontSize}}
           label= 'нет отчества' className={classes.checkbox + ' ' + 'position_absolute'} onClick={()=> checkBoxHandler(noPatronymic, setNoPatronymic)}/>
          </div>
          <div className="position_relative">
                        <TextField label='Дата рождения' name='birthDate'  size='small' required  InputLabelProps={{ shrink: true}} variant= 'standard' className={classes.input}  sx={{ '& .MuiInput-root': standardFontSize, '& .MuiInputLabel-root': standardFontSize}} disabled = {noBirthDate && true} fullWidth type='date'/>
          <FormControlLabel  control = {<Checkbox   size= 'small' inputProps={{ tabIndex: "-1" }}/>} sx={{ '& .MuiTypography-root': standardFontSize}}
           label= 'не знаю даты рождения' className={classes.checkbox + ' ' + 'position_absolute'} onClick={()=> checkBoxHandler(noBirthDate, setNoBirthDate)}/>
          </div>
          <div className="position_relative">
                        <TextField label='Место рождения' name='birthPlace'  size='small' required variant= 'standard' className={classes.input} disabled= {noBirthPlace && true}   sx={{ '& .MuiInput-root': standardFontSize, '& .MuiInputLabel-root': standardFontSize}} fullWidth/>
          <FormControlLabel  control = {<Checkbox    size= 'small' inputProps={{ tabIndex: "-1" }} />} sx={{ '& .MuiTypography-root': standardFontSize}}
           label= 'не знаю места рождения' className={classes.checkbox + ' ' + 'position_absolute'} onClick={()=> checkBoxHandler(noBirthPlace, setNoBirthPlace)}/>
          </div>
        </div>         
            <Address error= {errorAddress} setError= {setErrorAddress} setAdressForDB= {setAdressForDB} />
             <div className={styles.passportBlock}>
             <div className={styles.header}>Паспортные данные</div>
        <div className={styles.passport__fullWidthInput + ' ' + styles.passport_block  + ' ' + 'margin_0' }>
            <PassportTypeSelect type={passportType} setType={setPassportType} />
        </div>
                 {passportType !== 'noPassport' && <>
                     <div className={styles.passport_block  + ' ' + styles.passport__flexBlock }>
                     <TextField label='Серия'  variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} name='series' className={classes.smallInput} required size = 'small' />
                     <TextField label='Номер'  variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} name='number' className={classes.smallInput} required size = 'small'/>
                 </div>
                     <div className={styles.passport__fullWidthInput + ' ' + styles.passport_block}>
                     <TextField label='Выдан' name='issue'  variant="standard" fullWidth size = 'small' sx={{ '& .MuiInput-root': standardFontSize, '& .MuiInputLabel-root': standardFontSize}}/>
                     </div>
                     <div className={styles.passport_block  + ' ' + styles.passport__flexBlock }>
                     <TextField size = 'small' label='Дата выдачи' name='issueDate'  variant="standard" type='date' InputLabelProps={{shrink: true}} className={classes.smallInput}/>
                     <TextField size = 'small' label='Код подразделения'  variant="standard" name='govCode' className={classes.smallInput} />
                     </div>
                     </>}
             </div>
            
    <div className='button_submit'><LoadingButton loading={loading} variant="contained" size="large" type='submit' className={classes.button}>
          Подтвердить
        </LoadingButton></div>
        {error && <div className={styles.error}>{error}</div>}
        </div>
        </form>
        </div>
    );
};

export default AddDebtor;