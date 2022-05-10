import api from '../../http';
import { organizationsSlice } from './reducer';
import {setAlert} from '../alert/actions'

const actions = organizationsSlice.actions;



// export const setOrganizationsNames = (data) => ({
//     type: 'ORGANIZATIONS::CHANGE_NAMES',
//     payload: data
// })
// export const setOrganizationsLoading = (data) => ({
//     type: 'ORGANIZATIONS::SET_LOADING',
//     payload: data
// })


export const findOrganizations = (val, setError) => async (dispatch) => {
    dispatch(actions.fetchPending());
    try{
    const {data} = await api.get('organizations/getSearchList?value=' + val);
    dispatch(actions.setSearchList(data));
    dispatch(actions.fetchSuccess());
    }
    catch(e) {
        dispatch(actions.fetchError(e.message));
        setError(e.message);
    }

}

export const recieveOrgList = (limit, page, order) => async dispatch => {
    dispatch(actions.fetchPending());
    try{
        const { data } = await api.get(`organizations/getList?limit=${limit}&page=${page}&order=${order}`)
        dispatch(actions.setList(data));
        dispatch(actions.fetchSuccess());
    } catch(e) {
        dispatch(actions.fetchError(e.message));
    }
}

export const addOrganization = (data) => async dispatch  => {
    dispatch(actions.fetchPending());
    try{
        await api.post('organizations/addOne', data);
        await dispatch(recieveOrgList(25, 1, ['createdAt', 'ASC']));
        dispatch(setAlert('Успешно!', "Организация успешно создана"));
        dispatch(actions.fetchSuccess());
    }
    catch(e) {
        dispatch(actions.fetchError(e.message));
        throw new Error(e.message);
    }
}

export const changeOrganization = (data) => async dispatch => {
    dispatch(actions.fetchPending());
    try{
        await api.post('organizations/changeOne', data);
        await dispatch(recieveOrgList(25, 1, ['createdAt', 'ASC']));
        dispatch(setAlert('Успешно!', "Организация успешно Изменена"));
        dispatch(actions.fetchSuccess());
    }
    catch(e) {
        dispatch(actions.fetchError(e.message));
        throw new Error(e.message);
    }
}

export const deleteOrganization = (id) => async dispatch => {
    dispatch(actions.fetchPending());
    try{
        await api.post('organizations/deleteOne', {id});
        await dispatch(recieveOrgList(25, 1, ['createdAt', 'ASC']));
        dispatch(setAlert('Успешно!', "Организация успешно удалена"));
        dispatch(actions.fetchSuccess());
    }
    catch(e) {
        dispatch(actions.fetchError(e.message));
        throw new Error(e.message);
    }
}
