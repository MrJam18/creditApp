import { MenuItem, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../../css/customSearch.module.css'
import useDebounce from '../../hooks/useDebounce';
import { makeStyles } from '@mui/styles';
import api from "../../http";

const useStyles = makeStyles({
 result: {
  whiteSpace: 'break-spaces !important',
  width: '100%',
  backgroundColor: 'white',
  opacity: 100,
  zIndex: '2',
  '&:hover': {
   zIndex: 2,
   backgroundColor: '#ebebeb;',
   '& .Mui-selected': {
    backgroundColor: 'green'
   }
  }
 }
})

const EasySearch = ({label, customStyles, serverAddress, delay = 300, setValue, changedValue, defaultValue, required, getValue}) => {
 const [results, setResults] = useState([]);
 const onSearch = async (val) => {
  const {data} = await api.get(serverAddress + `?value=${val}`);
  setResults(data);
 }
 const classes = useStyles();
 const input = useRef();
 const debouncedSearch = useDebounce(onSearch, delay);
 const changeInputHandler = async (ev) => {
  const value = ev.target.value;
  if(value !== '') debouncedSearch(value);
 }
 const chooseHandler = (ev)=> {
  const value = ev.currentTarget.getAttribute('data-name');
  const id = ev.currentTarget.getAttribute('data-id');
  if (input.current.value !== value) input.current.value = value;
  input.current.setCustomValidity('');
  setResults([]);
  const data = {id, name: value};
  if(getValue) data[getValue] = ev.currentTarget.getAttribute('data-value');
  setValue(data);
 }
 useEffect(()=> {
  return ()=> {
   setResults([]);
  }
 }, []);
 useEffect(()=> {
  if(changedValue){
   setValue(changedValue);
   input.current.value = changedValue.name;
   setResults([]);
   input.current.setCustomValidity('');
  }
 }, [changedValue]);

 const Results = results.map((result,)=>{
  return(
      <MenuItem key={result.id} className={classes.result} tabIndex={0} data-name={result.name} focusVisibleClassName={styles.selected} data-id={result.id} data-value={getValue ? result[getValue] : null} onClick={chooseHandler}  > {result.name} </MenuItem>
  )
 })
 useEffect(()=> {
  if(defaultValue){
   const data = {
    id: defaultValue.id,
    name: defaultValue.name
   }
   if(getValue) data[getValue] = defaultValue[getValue];
   setValue(data);
   if(required) input.current.setCustomValidity('');
  }
  else {
   if(required) input.current.setCustomValidity('Введите название и выберите из списка!');
  }
  return () => {
   setResults([]);
  }
 }, []);


 return (
     <div style={customStyles} className={styles.main} >
      <TextField size='small' label={label} InputLabelProps={{shrink: true}} required={required} defaultValue={defaultValue?.name} variant='standard' inputRef={input} onChange={changeInputHandler} fullWidth />
      <div className={styles.results}>{Results}</div>
     </div>
 );
}

export default EasySearch;