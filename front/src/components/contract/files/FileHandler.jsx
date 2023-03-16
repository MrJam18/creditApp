import React from 'react';
import styles from 'css/contract.module.css';
import DocumentsGetter from "./DocumentsGetter";
import FileChooseHandler from "../../dummyComponents/FileChooseHandler";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDispatch} from "react-redux";
import {useParams} from "react-router";
import {deleteContractFile, uploadContractFile} from "../../../store/contracts/actions";

const addButton = () => <FileUploadIcon sx={{color: 'black'}} className={styles.documents__uploadIcon + ' ' + styles.documents__icon} />
const DeleteButton = () => <DeleteForeverIcon color={'error'} className={styles.documents__deleteIcon + ' ' + styles.documents__icon} />

const FileHandler = ({header, documentName}) => {
    const {contractId} = useParams();
    const dispatch = useDispatch();
    const fileSender = async (formData) => {
        await dispatch(uploadContractFile(documentName, contractId, formData));
    }
    const deleteHandler = async () => {
        await dispatch(deleteContractFile(contractId, documentName));
    }
 return (
     <div className={styles.documents__fileHandler}>
       <div className={styles.documents__header}>{header}</div>
          <div className={styles.documents__files}>
               <DocumentsGetter documentName={documentName} />
                  <div className={styles.documents__uploadButtons}>
                      <FileChooseHandler types={'.pdf'} sendHandler={fileSender} action='add' title={'Загрузить'} Button={addButton}/>
                      <button title={'Удалить'} onClick={deleteHandler} className={styles.documents__deleteButton}><DeleteButton/></button>
                  </div>
          </div>
     </div>
 );
};

export default FileHandler;