import { Input, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from '../css/adress.module.css'
import { sendForDBMatches } from '../store/adresses/actions';
import {useSelector, useDispatch} from 'react-redux';
import useDebounce from '../hooks/useDebounce';
import { useRef } from 'react';
import { socket } from '../utils/webSockets';

const Adress = () => {
    const input = useRef('');
    const dispatch = useDispatch();
    const debouncedDispatch = useDebounce(dispatch, 1000);
    const [foundedAdresses, setFoundedAdresses]  = useState([]);
    const [disableAdress, setDisableAdress] = useState(false);
    const recieveAdressFragments = (adress) => {
       let adressArray;
       let adressTypesArray = [];
        if (/,/g.test(adress)) adressArray = adress.split(',');
        else if (/\s/g.test(adress)) adressArray = adress.split(/\s/g);
        else return [];
        adressArray = adressArray.reduce((acc, el) => {
            if (acc.length < 7 && el !== ''){
                if (/\./.test(el)) {
                    adressTypesArray.push(/.+\./g.exec(el));
                    el = el.replace(/.+\./, '');
                    if (el === '') return acc;
                }
                el = el.toLowerCase()
                acc.push(el.trim());
            } 
            return acc;
        }, []);   
        if (/^\d*$/.test(adressArray[0]) && adressArray[0].length === 6 ) adressArray.shift();
        console.log(adressArray);
        return {adressArray, adressTypesArray};
    }
    const changeInputHandler = (e) => {
        debouncedDispatch(sendForDBMatches(recieveAdressFragments(e.target.value).adressArray));
    }
    const adressChoiceHandler = (index) => {
        console.log(foundedAdresses[index]);
        setDisableAdress(!disableAdress);
        console.log(input.current.value);
        input.current.value = foundedAdresses[index];
    }
    useEffect(()=> {
        socket.onopen = () => console.log('Подключение установлено')
        socket.onmessage = (ev) => {
            const adressMatches = (JSON.parse(ev.data));
            let adressRows = [];
            for(let i = 0; i<adressMatches.regions.length; i++) {
                const adressRow = `${adressMatches.regions[i]}, ${adressMatches.cityTypes[i]} ${adressMatches.cities[i]}, ${adressMatches.streetTypes[i]} ${adressMatches.streets[i]}`;
                adressRows.push(adressRow);
            }
            setFoundedAdresses(adressRows);
        }
    }, [])
    // dispatch(sendForDBMatches(recieveAdressFragments(fullADressInput.value)));
    return (
        <div className={styles.main}>
            <div className={styles.header}>Адрес</div>
            Выберите адрес из списка. Если подходящего адреса нет, то нажмите +. 
            Пример: 426065, УР, ижевск, петрова*, 33*, 132*
            <div className={"position_relative" + ' ' + styles.inputWithMatches}>
           <Input fullWidth inputRef= {input} onChange={changeInputHandler} disabled= {disableAdress && true}/>
           <div className={styles.foundedAdresses + ' ' + 'position_absolute'}>
           {
               foundedAdresses.map((adress, index)=> 
                   <MenuItem full key = {index} onClick={()=> adressChoiceHandler(index)}>{adress}</MenuItem>

               )
           }
            </div>
            </div>
            
            {/* <button onClick={debouncedSearch}>button</button> */}

        </div>
    );
};

export default Adress;