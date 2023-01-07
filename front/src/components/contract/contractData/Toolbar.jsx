import React, { useState } from 'react';
import styles from '../../../css/contract.module.css';
import selectDocument from '../../../img/documents-folder.png'
import SelectDocument from './SelectDocument';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Warning from '../../dummyComponents/Warning';
import { Navigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { deleteContract } from '../../../store/contracts/actions';





const Toolbar = () => {
    const {contractId} = useParams();
    const dispatch = useDispatch();
    const [showSelectDocument, setShowSelectDocument] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [navigate, setNavigate] = useState(false);
    const selectDocumentClickHandler = () => {
        setShowSelectDocument(true);
    }
    const onClickDeleteButton = () => {
        setShowDeleteWarning(true)
    }
    const onSubmitDeleteContract = async () => {
        await dispatch(deleteContract(contractId));
        setNavigate(true);
    }
    if(navigate) {
        return <Navigate to='/list' replace />
    }
    return (
        <div className={styles.dataToolbar}>
            <button title='удалить договор' className={'antibutton' + ' ' + styles.dataToolbar__deleteIcon} onClick={onClickDeleteButton} ><DeleteForeverIcon fontSize='inherit' /></button>
            <button className='antibutton' title='создать документ' onClick={selectDocumentClickHandler}><img src={selectDocument} className={styles.dataToolbar__icon + ' ' + styles.dataToolbar__customIcon}  />
            </button>
            {showDeleteWarning && <Warning text={"Вы уверены, что хотите удалить договор?"} onSubmit={onSubmitDeleteContract} setShow={setShowDeleteWarning} />}
            {/*{showFastDocumentCreator && <FastDocumentCreator show={showFastDocumentCreator} setShow={setShowFastDocumentCreator}  /> }*/}
            { showSelectDocument &&  <SelectDocument show={showSelectDocument} setShow={setShowSelectDocument} /> }
        </div>
    );
};

export default Toolbar;