import React, {useEffect, useRef} from 'react';
import TextField from "@mui/material/TextField";
import {capitalizeFirstLetter} from "../../utils/text/capitalize";
import {validityHandler} from "../../utils/inputs/validityHandler";

let suggestionsHandler = null;

const CustomInput = React.forwardRef(({autofocus = false, disabled= false, defaultValue=null, label, pattern=null, variant='standard', required=true, type, size, fullwidth=true, className, name, customValidity, noSubmit = false}, ref) => {
  label = capitalizeFirstLetter(label);
  const noSubmitHandler = (ev) => {
      if(ev.code === 'Enter') ev.preventDefault();
  }
  const inputRef = useRef();
  useEffect(() => {
        if(ref) ref.current = inputRef.current;
    }, [inputRef.current]);
  useEffect(()=> {
      if(customValidity) {
          const input = inputRef.current;
          input.removeEventListener('change', suggestionsHandler);
          suggestionsHandler = () => validityHandler(input, customValidity);
          validityHandler(input, customValidity);
          input.addEventListener('change', suggestionsHandler);
      }
  }, [customValidity])
 return (
  <TextField onKeyDown={noSubmit ? noSubmitHandler : null} autoFocus={autofocus} disabled={disabled} defaultValue={defaultValue} label={label} inputProps={{pattern}} inputRef={inputRef} variant={variant} required={required} InputLabelProps={type === 'date' ? { shrink: true } : null} className={className} name={name} fullWidth type={type} size={size} />
 );
});

export default CustomInput;