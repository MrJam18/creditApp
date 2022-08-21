import React, {useEffect, useRef} from 'react';
import {TextField} from "@mui/material";
import {capitalizeFirstLetter} from "../../utils/text/capitalize";
import {moreThenNow} from "../../utils/moreThenNow";

const EasyInput = React.forwardRef(({ label, name, className, type='text', autoFocus=false, required = false, pattern, defaultValue = null, disabled=false }, ref) => {
    const goodLabel = label ? capitalizeFirstLetter(label) : null;
    const inputRef = useRef();
    let suggestionsHandler;
    let currentPattern;
    if(pattern === 'float') {
        suggestionsHandler = (ev) => {
            const input = ev.target;
            if(input.validity.patternMismatch){
                input.setCustomValidity('Укажите данные в формате ч.чч, ч,чч или ч, где ч - это число')
            }
            else input.setCustomValidity('');
        }
        currentPattern = "^[0-9]+[\.,][0-9]{1,2}$|^[0-9]+$";
    }
    else if(type === 'date' && pattern === 'lessThenNow'){
        suggestionsHandler = (ev) => {
            const input = ev.target;
            if(moreThenNow(input.value)){
                input.setCustomValidity('дата не может быть больше текущей!')
            }
            else input.setCustomValidity('');
        }
    }

    useEffect(() => {
        if(ref) ref.current = inputRef.current;
    }, [inputRef.current]);

    return (
        <TextField autoFocus={autoFocus} disabled={disabled} defaultValue={defaultValue} label={goodLabel} onChange={suggestionsHandler} inputProps={{pattern: currentPattern}} inputRef={inputRef} variant={'standard'} required={required} InputLabelProps={type === 'date' ? { shrink: true } : null} className={className} name={name} fullWidth type={type} />
    );
});

export default EasyInput;