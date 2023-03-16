import { MenuItem, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../css/customSearch.module.css'
import useDebounce from '../../../hooks/useDebounce';
import { makeStyles } from '@mui/styles';
import api from "../../../http";

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

/**
 * Searching elements and setting result by function setValue.
 * @param {string} label header of search input.
 * @param {object} customStyles first priority styles.
 * @param {string} serverAddress server address for get list of values.
 * @param {number} delay delay after text input
 * @param {function} setValue function which setting value after clicking on element of a search list
 * @param {object} value current value
 * @param {number} value.id value id
 * @param {string} value.name name of value
 * @param {boolean} required if true input becomes required
 * @param {boolean} disabled if true input becomes disabled
 * @param onKeyDown function on event onKeyDown
 * @param {string | null} className className
 * @returns {JSX.Element}
 */
const EasySearch = ({label,
                     customStyles,
                     serverAddress, delay = 300,
                     setValue,
                     value,
                     required = false,
                     disabled = false,
                     onKeyDown = null,
                     className= null
}) => {
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
  const id = +ev.currentTarget.getAttribute('data-id');
  const find = results.find((el) => el.id === id);
  setValue(find);
 }
 useEffect(()=> {
  return ()=> {
   setResults([]);
  }
 }, []);
 useEffect(()=> {
   input.current.value = value ? value.name : '';
   setResults([]);
   input.current.setCustomValidity('');
 }, [value]);

 const Results = results.map((result,)=>{
  return(
      <MenuItem key={result.id} className={classes.result} tabIndex={0} focusVisibleClassName={styles.selected} data-id={result.id} onClick={chooseHandler}  > {result.name} </MenuItem>
  )
 })
 useEffect(()=> {
  if(required) {
   if(value) input.current.setCustomValidity('');
   else input.current.setCustomValidity('Введите название и выберите из списка!');
  }
  return () => {
   setResults([]);
  }
 }, []);


 return (
     <div style={customStyles} className={styles.main + (className ? ' ' + className : '')} >
      <TextField disabled={disabled} size='small' onKeyDown={onKeyDown} label={label} required={required} InputLabelProps={{shrink: true}} defaultValue={value?.name} variant='standard' inputRef={input} onChange={changeInputHandler} fullWidth />
      <div className={styles.results}>{Results}</div>
     </div>
 );
}

export default EasySearch;