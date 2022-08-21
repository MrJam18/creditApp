import React, {useRef} from 'react';
import styles from 'css/customChips.module.css';
import CustomModal from "../CustomModal";
import {Input} from "@mui/material";
import CustomButton from "../CustomButton";
import {useError} from "../../../hooks/useError";

const AddModal = ({setShow, addHeader, setList}) => {
    const inputRef = useRef();
    const {error, ErrorComp, setError} = useError();
    const onClick = () => {
        try{
            const inputValue = inputRef.current.value;
            if(!inputValue) throw Error('Введите название!');
            setList((list)=> {
                const newList = [...list];
                newList.push(inputValue);
                return newList;
            })
            setShow(false);
        }
        catch (e) {
            setError(e);
        }

    }
    const onKeyPress = (ev) => {
        if(ev.key === 'Enter') onClick();
    }
    return (
       <CustomModal customStyles={{minHeight: '120px'}} setShow={setShow}>
               <div className='header_small'>{addHeader}</div>
               <Input autoFocus inputRef={inputRef} required className={styles.addInput} fullWidth onKeyDown={onKeyPress} />
               <CustomButton onClick={onClick} text='Подтвердить' />
           {error && <ErrorComp /> }
       </CustomModal>
    );
};

export default AddModal;