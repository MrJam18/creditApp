import React, { useEffect, useState } from 'react';
import styles from '../../../css/contract.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import FastDocumentCreator from './FastDocumentCreator';
import selectDocument from '../../../img/documents-folder.png'
import SelectDoument from './SelectDoument';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Warning from '../../dummyComponents/Warning';
import { Navigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { deleteContract } from '../../../store/contracts/actions';





const Toolbar = () => {
    const {contractId} = useParams();
    const dispatch = useDispatch();
    const [showFastDocumentCreator, setShowFastDocumentCreator] = useState(false);
    const [showSelectDocument, setShowSelectDocument] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [navigate, setNavigate] = useState(false);
    const fastDocumentClickHandler = () => {
        setShowFastDocumentCreator(true);
    }
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
            <button className={'antibutton' + ' ' + styles.dataToolbar__deleteIcon} onClick={onClickDeleteButton} ><DeleteForeverIcon fontSize='inherit' /></button>
            <button className='antibutton' onClick={fastDocumentClickHandler}><FontAwesomeIcon icon={solid('file')} className={styles.dataToolbar__icon} />
            </button>
            <button className='antibutton' onClick={selectDocumentClickHandler}><img src={selectDocument} className={styles.dataToolbar__icon + ' ' + styles.dataToolbar__customIcon}  />
            </button>
            {showDeleteWarning && <Warning text={"Вы уверены, что хотите удалить договор?"} onSubmit={onSubmitDeleteContract} setShow={setShowDeleteWarning} />}
            {showFastDocumentCreator && <FastDocumentCreator show={showFastDocumentCreator} setShow={setShowFastDocumentCreator}  /> }
            { showSelectDocument &&  <SelectDoument show={showSelectDocument} setShow={setShowSelectDocument} /> }
        </div>
    );
};

export default Toolbar;