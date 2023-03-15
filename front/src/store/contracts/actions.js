import { setAlert } from "../alert/actions";
import api, { saveFile, saveFilePost } from "../../http";
import { contractsSlice } from "./reducer";
import { paymentsSlice } from './payments/reducer'

const actions = contractsSlice.actions;
const paymentsActions = paymentsSlice.actions;

export const createContract = (data, setError) => async (dispatch) =>  {
    try {
        dispatch(actions.fetchPending);
        const response = await api.post('contracts/createOne', data);
        dispatch(actions.fetchSuccess);
        return response;
}
    catch(e) {
        dispatch(actions.fetchError(e.message));
        setError(e.message);
        dispatch(setAlert('Ошибка!', "Ошибка при создании контракта", 'error'))
        return null;
    } 
}
export const getCurrentContract = (id) => async (dispatch) => {
    try {
        dispatch(actions.fetchPending());
        const {data} = await api.get('contracts/getContract?id=' + id);
        dispatch(actions.setCurrentContract(data.contract));
        dispatch(paymentsActions.setList({list: data.payments.list, total: data.payments.total}));
        if(data.executiveDoc){
            dispatch(actions.setExecutiveDoc(data.executiveDoc));
        }
        dispatch(actions.fetchSuccess());
    }
    catch(e) {
        dispatch(setAlert('Ошибка получения контракта!', e.message, 'error'));
        dispatch(actions.fetchError(e.message))
        return null;
    } 
}

export const changeContract = async (data) => async (dispatch) => {
    try {
        await api.post('contracts/changeContract', data);
        // if (response.message) throw new Error(response.message);
    }
    catch(e) {
        dispatch(actions.fetchError(e.message));
        dispatch(setAlert('Ошибка запроса на сервер!', e.message, 'error'));
        throw new Error('Ошибка запроса на сервер!' + e.message)
    }
}

export const createCourtOrder = (data) => async(dispatch) => {
    try{
        const response = await saveFile(`documents/createCourtOrder?contractId=${data.contractId}&courtId=${data.courtId}&userId=${data.userId}&date=${data.date}`, `order${data.contractId}.docx`);
        return response;
    }
    catch(e) {
        dispatch(setAlert('Ошибка запроса на сервер!', e.message, 'error'));
        dispatch(actions.fetchError(e.message));
    }
}

export const createDocument = (path, docName) => async (dispatch) => {
    try {
        const response = await saveFile(`documents/${path}`, docName + '.docx')
        return response;
    }
    catch(e) {
        dispatch(setAlert('Ошибка запроса на сервер!', e.message, 'error'));
        dispatch(actions.fetchError(e.message));
        throw new Error(e.message)
    }
}

export const recieveLimitationsList = (limit, page, order) => async dispatch => {
    const {data} = await api.get(`contracts/getLimitationsList?limit=${limit}&page=${page}&order=${order}`)
    dispatch(actions.setLimitations({list: data.rows, total: data.count}));
}

export const createIPInitDoc = (data) => async () => {
    await saveFilePost('documents/createIPInit', data, "ЗВИП № " + data.contractId + '.docx');
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