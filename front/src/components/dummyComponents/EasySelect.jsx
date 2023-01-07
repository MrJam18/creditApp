import React from 'react';
import { makeStyles } from '@mui/styles';
import styles from '../../css/customSelect.module.css'
import useInput from '../../hooks/useInput';
import { InputLabel, MenuItem, Select } from '@mui/material';

const useStyles = makeStyles( {
    selectLabel: {
        alignSelf: 'baseline',
        fontSize: '12px',
        lineHeight: '16.2px'
    },
    fullWidthLabel: {
        color: 'black',
        lineHeight: '16.2px',
        marginBottom: '5px',
        fontSize: '19px',
        fontWeight: 500,
        fontFamily: 'Roboto_slab, serif'
    },
})
const EasySelect = React.forwardRef(({name, label, initValue = '', variants, style, onChange, customClassName, defaultValue = ''}, ref) => {
    const classes = useStyles();
    const input = useInput(defaultValue);
    const Variants = variants.map((el)=> <MenuItem value={el.id} key={el.id}>{el.name}</MenuItem>);
    const changeHandler = (ev) => {
        input.onChange(ev);
        if(onChange) onChange(ev.target.value);
    }
    return (
            <div className={styles.selectBlock + ' ' + classes.input + ' ' + customClassName } style={style}>
                <InputLabel id={name} className={classes.fullWidthLabel} >{label}</InputLabel>
                <Select inputRef={ref} fullWidth defaultValue={defaultValue} variant='standard' labelId={name} {...input} onChange={changeHandler} name={name}>
                        {Variants}
                </Select>
                
            </div>
    );
});

export default EasySelect;