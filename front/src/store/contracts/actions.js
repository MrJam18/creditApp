import {setAlert} from "../alert/actions";
import api, {saveFile, saveFilePost} from "../../http";
import {contractsSlice} from "./reducer";
import {paymentsSlice} from './payments/reducer'
import {recieveList} from "../list/actions";
import {alertHandler} from "../../utils/errorHandler";


const actions = contractsSlice.actions;
const paymentsActions = paymentsSlice.actions;


export const createContract = (data) => async (dispatch) =>  {
    dispatch(actions.fetchPending);
    await api.post('contracts/createOne', data);
    dispatch(actions.fetchSuccess);
    await dispatch(recieveList());
    dispatch(setAlert('Успешно', "Контракт успешно создан"));
    // catch(e) {
    //     dispatch(actions.fetchError(e.message));
    //     setError(e.message);
    //     dispatch(setAlert('Ошибка!', "Ошибка при создании контракта", 'error'))
    //     return null;
    // }
}
export const getCurrentContract = (id) => async (dispatch) => {
        dispatch(actions.fetchPending());
        const {data} = await api.get('contracts/getContract?id=' + id);
        dispatch(actions.setCurrentContract(data.contract));
        if (data.executiveDoc) {
            dispatch(actions.setExecutiveDoc(data.executiveDoc));
        }
        dispatch(actions.fetchSuccess());
}

export const changeContract = (data, contractId) => async (dispatch) => {
    try {
        console.log(1232)
        await api.post('contracts/changeContract', {...data, contractId});
        dispatch(setAlert('Успешно', 'Контракт успешно изменен'));
        await dispatch( getCurrentContract(contractId));
        // if (response.message) throw new Error(response.message);
    }
    catch(e) {
        dispatch(actions.fetchError(e.message));
        dispatch(setAlert('Ошибка запроса на сервер!', e.message, 'error'));
        throw new Error('Ошибка запроса на сервер!' + e.message)
    }
}

export const createCourtClaim = (data) => async () => {
        const response = await saveFilePost(`documents/createCourtClaim`, data, `${data.type + data.contractId}.docx`);
        return response;
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

export const createIPInitDoc = (data) => async () => {
    await saveFilePost('files/createIPInit', data, "ЗВИП № " + data.contractId + '.docx');
}

export const changeOrCreateExecutiveDoc = data => async dispatch => {
    await api.post('contracts/setExecutiveDoc', data);
    await dispatch(getCurrentContract(data.contractId));
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