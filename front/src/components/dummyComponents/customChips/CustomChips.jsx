import React from 'react';
import {Chip, Fab} from "@mui/material";
import styles from 'css/customChips.module.css';
import AddIcon from '@mui/icons-material/Add';
import useModal from "../../../hooks/useModal";
import AddModal from "./AddModal";



const CustomChips = ({list = [], setList, header, addHeader}) => {
 const addModal = useModal();
 const deleteHandler = (index) => () => {
  setList((list)=> {
   const newList = [...list];
   newList.splice(index, 1);
   return newList;
  })
 };
 const addHandler = () => {
  addModal.setShowTrue();
 }
 return (
  <>
   <div className={styles.header}>{header}</div>
   <div className={styles.main}>
    <div className={styles.chips}>
   {
    list.map((el, index)=>
      <Chip
          className={styles.chip}
          key={index}
          size='small'
          data-index={index}
          label={el}
          onDelete={deleteHandler(index)}
      />
    )
   }
    </div>
    <Fab size="small" onClick={addHandler} color="secondary" className={styles.addChipButton} aria-label="add">
     <AddIcon />
    </Fab>
    {addModal.show && <AddModal addHeader={addHeader} setShow={addModal.setShow} setList={setList} /> }
   </div>
  </>
 );
};

export default CustomChips;