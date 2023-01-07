import React from 'react';
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import styles from 'css/leftMenu.changer.module.css';
import Address from "../dummyComponents/Address/Address";
import EasyInput from "../dummyComponents/EasyInput";

// const useStyles = makeStyles({
//  fullInput: {
//   marginBottom: '10px'
//  },
//  smallInput: {
//   width: '45%'
//  },
// })

const Agent = ({defaultValues = {
    enclosure: 'Копия доверенности представителя'
}, setAddress, setDefaultAgent, setNoShowGroup}) => {
 // const classes = useStyles();
 const onChangeDefaultAgent = ev => {
  setDefaultAgent(ev.target.checked);
 }
 const onChangeNoGroup = ev => {
  setNoShowGroup(ev.target.checked);
 }

 return (
  <>
   <TextField className={styles.fullInput} required name='surname' label={"Фамилия"} variant='standard' defaultValue={defaultValues.surname} fullWidth />
   <TextField className={styles.fullInput} required name='name' label={'Имя'} fullWidth variant='standard' defaultValue={defaultValues.name} />
   <TextField className={styles.fullInput} defaultValue={defaultValues.patronymic} name='patronymic' label={'Отчество'} variant='standard' fullWidth />
   <TextField className={styles.fullInput} defaultValue={defaultValues.enclosure} fullWidth required name='enclosure' label='Документ, подтверждающий полномочия' variant='standard' />
    <div className={styles.smallInputsHolder}>
        <EasyInput defaultValue={defaultValues.passportSeries} label={'Серия паспорта'} name={'passportSeries'} className={styles.smallInput} required type={'number'} />
        <EasyInput defaultValue={defaultValues.passportNumber} label={'Номер паспорта'} name={'passportNumber'} className={styles.smallInput} required type={'number'} />
    </div>
   <Address defaultValue={defaultValues.fullAddress} setAdressForDB={setAddress} />
   <FormControlLabel control={<Checkbox checked={defaultValues.defaultAgent} onChange={onChangeDefaultAgent}  />} label="Представитель по умолчанию" />
   <FormControlLabel control={<Checkbox checked={defaultValues.noShowGroup} onChange={onChangeNoGroup} />} label="Представитель не виден группе" />
  </>
 );
};

export default Agent;