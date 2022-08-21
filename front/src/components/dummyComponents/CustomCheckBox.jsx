import React from 'react';
import {Checkbox, FormControlLabel} from "@mui/material";
import {standardFontSize} from "../../utils/standardFontSize";


const CustomCheckBox = ({size='small', label, className, checked, setChecked, onChange, defaultValue, name}) => {

 const checkBoxHandler = (ev) => {
  setChecked(ev.target.checked);
  if(onChange) onChange(ev.target.checked);
 }

 return (
  <>
   <FormControlLabel onChange={checkBoxHandler} defaultValue={defaultValue} control={<Checkbox size={size} />} sx={{ '& .MuiTypography-root': standardFontSize}} label={label} className={className} checked={checked} name={name} />
  </>
 );
};

export default CustomCheckBox;