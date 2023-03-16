import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import styles from '../../css/customSelect.module.css'
import useInput from '../../hooks/useInput';
import { InputLabel, MenuItem, Select } from '@mui/material';

const useStyles = makeStyles( {
    input: {
        marginBottom: '8px'
    },
    selectLabel: {
        alignSelf: 'baseline',
        fontSize: '12px',
        lineHeight: '16.2px'
    },
    fullWidthLabel: {
        color: 'black',
        lineHeight: '16.2px',
        marginBottom: '5px'
    },
})
const CustomSelect = ({name, label, initValue = '', children, style, customClassName, onChange }) => {
    const classes = useStyles();
    const [value, setValue] = useState(initValue);
    const onChangeValue = (ev) => {
        setValue(ev.target.value);
        if(onChange){
            onChange(ev.target.value);
        }
    }
    return (
            <div className={styles.selectBlock + ' ' + classes.input + ' ' + customClassName } style={style}>
                <InputLabel id={name} className={classes.fullWidthLabel}>{label}</InputLabel>
                <Select fullWidth onChange={onChangeValue} variant='standard' value={value} required labelId={name} 
                name={name}>
                        {children}
                </Select>
                
            </div>
    );
};

export default CustomSelect;