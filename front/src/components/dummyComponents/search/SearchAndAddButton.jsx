import React from 'react';
import EasySearch from "./EasySearch";
import styles from "../../../css/searchAndAddButton.module.css";
import AddIcon from "@mui/icons-material/Add";
import {Fab} from "@mui/material";

const SearchAndAddButton = ({label, value, required, serverAddress, onClickButton, setValue, customStyles}) => {

    return (
        <div className={styles.main}>
           <EasySearch label={label} value={value} required={required} serverAddress={serverAddress} customStyles={customStyles ?? {width: '93%'}} setValue={setValue} />
            <Fab size="small" type={'button'} onClick={onClickButton} color='primary' className={styles.addChipButton} aria-label="add">
                <AddIcon />
            </Fab>
        </div>
    );
};

export default SearchAndAddButton;