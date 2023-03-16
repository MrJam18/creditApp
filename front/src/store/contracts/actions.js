import {setAlert} from "../alert/actions";
import api, {saveFile, saveFilePost} from "../../http";
import {contractsSlice} from "./reducer";
import {paymentsSlice} from './payments/reducer'
import {recieveList} from "../list/actions";
import {alertHandler} from "../../utils/errorHandler";


const actions = contractsSlice.actions;
const paymentsActions = paymentsSlice.actions;


export const createContract = (data) => async (dispatch) =>  {
    await api.post('contracts/createOne', data);
    dispatch(setAlert('Успешно', "Контракт успешно создан"));
    await dispatch(recieveList());
}
export const getCurrentContract = (id) => async (dispatch) => {
    dispatch(actions.fetchPending());
    const {data} = await api.get('contracts/getContract?id=' + id);
    dispatch(actions.setCurrentContract(data.contract));
    if (data.contract.executiveDoc) {
        dispatch(actions.setExecutiveDoc(data.contract.executiveDoc));
    }
    if(data.contract.court) {
        dispatch(actions.setCourt(data.contract.court));
    }
    dispatch(actions.fetchSuccess());
}

export const changeContract = (data, contractId) => async (dispatch) => {
    try {
        await api.post('contracts/changeContract', {...data, contractId});
        dispatch(setAlert('Успешно', 'Контракт успешно изменен'));
        await dispatch( getCurrentContract(contractId));
    }
    catch(e) {
        dispatch(actions.fetchError(e.message));
        dispatch(setAlert('Ошибка запроса на сервер!', e.message, 'error'));
        throw new Error('Ошибка запроса на сервер!' + e.message)
    }
}

export const createCourtClaim = (data) => async (dispatch) => {
    await saveFilePost(`documents/createCourtClaim`, data, `${data.type + data.contractId}.docx`);
    dispatch(setAlert('Успешно', "Заявление успешно создано."));
}

export const createDocument = (path, docName) => async (dispatch) => {
    try {
        return await saveFile(`documents/${path}`, docName + '.docx');
    }
    catch(e) {
        dispatch(setAlert('Ошибка запроса на сервер!', e.message, 'error'));
        dispatch(actions.fetchError(e.message));
        throw new Error(e.message);
    }
}

export const recieveLimitationsList = (limit, page, order) => async dispatch => {
    const {data} = await api.get(`contracts/getLimitationsList?limit=${limit}&page=${page}&order=${order}`)
    dispatch(actions.setLimitations({list: data.rows, total: data.count}));
}

export const createIPInitDoc = (contractId, agentId) => async (dispatch, getState) => {
    if(!getState().contracts.executiveDoc.id) throw new Error('Укажите данные исполнительного документа!');
    await saveFilePost('documents/createIPInit', {contractId, agentId}, `ЗВИП по договору ${contractId}.docx`);
    dispatch(setAlert('Успешно', "Заявление успешно создано."));
}

export const setExecutiveDoc = (formData, court, bailiff, typeId, contractId, executiveDocId) => async dispatch => {
    if(!court) throw new Error('укажите суд, вынесший решение!');
    if(!bailiff) throw new Error('Укажите отдел судебных приставов!');
    if(!typeId) throw new Error('Укажите тип исполнительного документа!');
    const sendingExecutiveDoc = {
        ...formData,
        courtId: court.id,
        bailiffId: bailiff.id,
        typeId,
        contractId,
        id: executiveDocId || null
    }
    console.log(sendingExecutiveDoc)
    const {data} = await api.post('executiveDocs/setExecutiveDoc', sendingExecutiveDoc);
    const executiveDocForStore = {
        ...formData,
        court,
        bailiff,
        typeId,
        id: data.id
    }
    dispatch(actions.setExecutiveDoc(executiveDocForStore));
    dispatch(actions.setExecutiveDocName(data.executiveDocName));
    dispatch(setAlert('Успешно', 'Исполнительный документ успешно изменен/установлен'));
}

export const deleteContract = id => async dispatch => {
    await api.post('contracts/deleteOne', {id});
    dispatch(setAlert('Успешно', "Договор успешно удален"));
}

export const recieveStatuses = () => async dispatch => {
   const {data} = await api.get('contracts/getStatuses');
    dispatch(actions.setStatuses(data));
}
export const getExistingFiles = (contractId) => async dispatch => {
    try {
        dispatch(actions.setLoadingExisting(true));
        const {data} = await api.get('files/getExistingFiles?contractId=' + contractId);
        dispatch(actions.setExistingFiles(data));
    }
    catch (e) {
        alertHandler(e, 'ошибка получения файлов');
    }
    finally {
        dispatch(actions.setLoadingExisting(false));
    }
}

export const deleteContractFile = (contractId, fileName) => async dispatch => {
    try {
        dispatch(actions.setCurrentLoadingExisting({fileName, status: true}));
        await api.post('files/deleteContractFile', {contractId, fileName});
        dispatch(actions.setCurrentExisting({fileName, status: false}));
        dispatch(setAlert('Успешно', "Файл успешно удалён"));
    }
    catch(e) {
        alertHandler(e, 'Ошибка удаления файла')
    }
    finally {
        dispatch(actions.setCurrentLoadingExisting({fileName, status: false}));
    }
}

export const uploadContractFile = (fileName, contractId, formData) => async dispatch => {
    try{
        dispatch(actions.setCurrentLoadingExisting({fileName, status: true}));
        formData.append('documentName', fileName);
        formData.append('contractId', contractId);
        await api.post(`files/uploadContractFile`, formData);
        dispatch(setAlert('Успешно', "Файл успешно загружен"));
        dispatch(actions.setCurrentExisting({fileName, status: true}));
    }
    catch (e) {
        alertHandler(e);
    }
    finally {
        dispatch(actions.setCurrentLoadingExisting({fileName, status: false}));
    }
}

export const receiveExecutiveDoc = (contractId) => async (dispatch) => {
    try {
        const {data} = await api.get('executiveDocs/getExecutiveDoc?contractId=' + contractId);
        return data;
    } catch (e) {
        dispatch(setAlert('Исп. документ не получен.', e.message, 'error'));
    }
}