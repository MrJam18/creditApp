import api from '../../http';
import { organizationsSlice } from './reducer';
import {setAlert} from '../alert/actions'

const actions = organizationsSlice.actions;




export const findOrganizations = (val, setError) => async (dispatch) => {
    dispatch(actions.fetchPending());
    try{
    const {data} = await api.get('creditors/getSearchList?value=' + val);
    dispatch(actions.setSearchList(data));
    dispatch(actions.fetchSuccess());
    }
    catch(e) {
        dispatch(actions.fetchError(e.message));
        setError(e.message);
    }

}

export const addBanksRequisites = (name, BIK) => async dispatch => {
    const {data} = await api.post('creditors/addBankRequisites', {name, BIK});
    dispatch(setAlert('Успешно!', "Банковские реквизиты успешно добавлены."));
    dispatch(actions.setNewBanksRequisites({name, id: data.id}));
}

export const recieveOrgList = (limit, page, order) => async dispatch => {
    dispatch(actions.fetchPending());
    try{
        const { data } = await api.get(`creditors/getList?limit=${limit}&page=${page}&order=${order}`)
        dispatch(actions.setList(data));
        dispatch(actions.fetchSuccess());
    } catch(e) {
        dispatch(actions.fetchError(e.message));
    }
}

export const addCreditor = (data) => async dispatch  => {
        data.bankRequisitesId = data.bankRequisites.id;
        delete data.bankRequisites;
        await api.post('creditors/addOne', data);
        await dispatch(recieveOrgList(25, 1, ['createdAt', 'ASC']));
        dispatch(setAlert('Успешно!', "Кредитор успешно создан"));
}

export const changeCreditor = (data) => async dispatch => {
        await api.post('creditors/changeOne', data);
        dispatch(actions.setCreditor(undefined));
        await dispatch(recieveOrgList(25, 1, ['createdAt', 'ASC']));
        dispatch(setAlert('Успешно!', "Кредитор успешно изменен"));
}

export const deleteOrganization = (id) => async dispatch => {
    dispatch(actions.fetchPending());
    try{
        await api.post('creditors/deleteOne', {id});
        await dispatch(recieveOrgList(25, 1, ['createdAt', 'ASC']));
        dispatch(setAlert('Успешно!', "Организация успешно удалена"));
        dispatch(actions.fetchSuccess());
    }
    catch(e) {
        dispatch(actions.fetchError(e.message));
        throw new Error(e.message);
    }
}

export const changeDefaultCession = (creditorId, cession) => async dispatch => {
    await api.post('creditors/changeDefaultCession', {creditorId, cessionId: cession ? cession.id : null});
    dispatch(actions.setDefaultCessionForCreditor(cession));
    dispatch(setAlert('Успешно!', "Цессия по умолчанию изменена"));
}
export const receiveCreditor = (creditorId) => async dispatch => {
    try {
        const {data} = await api.get('creditors/getCreditor?creditorId=' + creditorId);
        dispatch(actions.setCreditor(data));
    } catch (e) {
        dispatch(setAlert('Ошибка!', "Данные о кредиторе не получены.", 'error'));
    }

}
