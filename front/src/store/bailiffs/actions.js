import api from "../../http";
import {bailiffsSlice} from './reducer';

const actions = bailiffsSlice.actions;


export const recieveBailiffsSearchList = searchString => async dispatch => {
    const {data} = await api.get(`bailiffs/search?searchString=${searchString}`);
    dispatch(actions.setSearchList(data));
}

export const createBailiff = (bailiff) => async () => {
       const {data} = await api.post('bailiffs/createOne', bailiff);
       return data;
}