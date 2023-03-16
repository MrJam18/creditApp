import React from 'react';
import {useDispatch} from "react-redux";
import {TextField} from "@mui/material";
import styles from '../../../css/adress.module.css';

const AddressInputManually = ({onChange}) => {
    const dispatch = useDispatch();
    return (
        <div className={styles.inputManually}>
            <TextField onChange={onChange} label={'123'} className={456} />
        </div>
    )
};

export default AddressInputManually;