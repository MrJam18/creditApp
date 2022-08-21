import React from 'react';
import styles from 'css/contract.module.css';
import {useSelector} from "react-redux";
import {selectExisting, selectLoadingExisting} from "../../../store/contracts/selectors";
import Loading from "../../dummyComponents/Loading";
import {Button} from "@mui/material";
import api from "../../../http";
import {useParams} from "react-router";
import {alertHandler} from "../../../utils/errorHandler";

const DocumentsGetter = ({ documentName }) => {
 const status = useSelector(selectExisting[documentName]);
 const {contractId} = useParams();
 const loading = useSelector(selectLoadingExisting);
 const currentLoading = useSelector(selectExisting['loading' + documentName]);
 const loadHandler = async () => {
  try{
   await api.saveFile(`files/getContractFile?fileName=${documentName}&contractId=${contractId}`, documentName + '.pdf');
  }
  catch (e) {
   alertHandler(e, 'Ошибка получения файла')
  }

 }
 return (
  <div className={styles.documents__getter}>
   {loading || currentLoading ? <Loading addStyles={{margin: '0px 15px 0px 50px', minHeight: '30px', }} size={28} bold={4} /> :
       status ? <Button size='small' variant='contained' onClick={loadHandler} >Загрузить файл</Button> : <div className={styles.documents__noDocuments}>Нет файлов для загрузки</div> }
  </div>
 );
};

export default DocumentsGetter;