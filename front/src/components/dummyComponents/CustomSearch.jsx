import { MenuItem, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../../css/customSearch.module.css'
import useDebounce from '../../hooks/useDebounce';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    result: {
        whiteSpace: 'break-spaces !important',
        width: '100%',
        backgroundColor: 'white',
        zIndex: '2',
        '&:hover': {
            zIndex: 2,
            backgroundColor: '#ebebeb;'
        }
    }
})

let cancelBlur = false;

const CustomSearch = ({label, results = [], onSearch, onClick, customStyles, delay = 300, setValue = null, defaultValue = ''}) => {
    const [resultsData, setResultsData] = useState(results);
    const classes = useStyles();
    const input = useRef();
    const [inputValue, setInputValue] = useState(defaultValue);
    const debouncedSearch = useDebounce(onSearch, delay);
    const changeInputHandler = async (ev) => {
        const value = ev.target.value;
        setInputValue(value);
        if(value !== '') debouncedSearch(value);
    }
    const chooseHandler = (ev)=> {
        cancelBlur = true
        const value = ev.currentTarget.getAttribute('dataName');
        const id = ev.currentTarget.getAttribute('dataId');
        if (inputValue !== value) setInputValue(value);
        setResultsData([]);
        onClick({value, id});
        setTimeout(()=> {
            cancelBlur = false;
        }, 1000);
    }

    const Results = resultsData.map((result)=>{
        return(
        <MenuItem key={result.id} className={classes.result} dataName={result.name} dataId={result.id} onClick={chooseHandler}  > {result.name} </MenuItem>
        )
    })
    useEffect(()=>{
        setResultsData(results)
    }, [results]);
    useEffect(()=>{
        if(setValue){
        setInputValue(setValue);
        setResultsData([]);
        }
    }, [setValue])
    useEffect(()=> {
        return () => {
            setResultsData([]);
            setInputValue(defaultValue);
        }
    }, []);
    const onBlur = () => {
       setTimeout(()=> {
           if(!cancelBlur) {
        setResultsData([]);
        onClick(false);
        setInputValue('');
           }
       }, 150);            
    }
    return (
        <div style={customStyles} className={styles.main} >
        <TextField size='small' value={inputValue} onBlur={onBlur} label={label} InputLabelProps={{shrink: true}} variant='standard' inputRef={input} onChange={changeInputHandler} fullWidth />
        <div className={styles.results}>{Results}</div>     
        </div>
    );
    }

export default CustomSearch;