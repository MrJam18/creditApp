import React from 'react';
import styles from "../../css/cessions.module.css";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {deleteCessionInfoHandler} from "../../store/cessions/actions";
import Warning from "../dummyComponents/Warning";
import useModal from "../../hooks/useModal";
import {cessionsSelector} from "../../store/cessions/selectors";
import {deleteCessionGroup} from "../../store/cessions/actions";


const Toolbar = ({showDeleteGroup}) => {
    const dispatch = useDispatch();
    const cessionId = useSelector(cessionsSelector.selectInfoCessionId);
    const deleteGroupWarning = useModal();
    const onDelete = () => {
        dispatch(deleteCessionInfoHandler());
    }
    const onClickDeleteGroup = () => {
        deleteGroupWarning.setShowTrue();
    }
    const onDeleteGroup = async () => {
       await dispatch(deleteCessionGroup(cessionId));
    }
 return (
  <>
   <div className={styles.toolbar}>
       <div className={styles.leftBox}>
           {showDeleteGroup && <Button variant='contained' color='error' onClick={onClickDeleteGroup} >Удалить группу</Button> }
       </div>
       <div className={styles.rightBox}>
       <Button variant='contained' sx={{backgroundColor: '#346a9f'}} onClick={onDelete} className={styles.toolbar__button} >Удалить</Button>
       <Button variant='contained' color='success' form='cessionData' name='add' type='submit' className={styles.toolbar__button} >добавить</Button>
       </div>
       { deleteGroupWarning.show && <Warning onSubmit={onDeleteGroup} setShow={deleteGroupWarning.setShow} text='Вы уверены, что хотите удалить группу? Отменить это действие будет невозможно.' /> }
   </div>
   
  </>
 );
};

export default Toolbar;