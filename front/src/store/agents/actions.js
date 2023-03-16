import agentsSlice from "./reducer";
import api from "../../http";
import { setGlobalError } from "../global";


const actions = agentsSlice.actions


export const recieveAgentsList = (page, limit) => async (dispatch, getState) => {
    try{
        const order = getState().agents.order;
        dispatch(actions.fetchPending());
        const { data } = await api.get(`agents/getList?page=${page}&limit=${limit}&order=${order}`)
        if(data.count) {
        dispatch(actions.setList(data));
        }
        dispatch(actions.fetchSuccess());
    }
    catch(e){
        dispatch(setGlobalError(e.message));
    }
};

export const addAgent = data => async (dispatch) => {
    try{
        dispatch(actions.fetchPending());
        await api.post('agents/addOne', data);
        dispatch(actions.fetchSuccess());
        dispatch(recieveAgentsList(1, 25))
    }
    catch(e){
        dispatch(actions.fetchError(e.message));
        throw new Error(e.message);
    }
}

export const changeAgent = data => async (dispatch) => {
    try{
        dispatch(actions.fetchPending());
        await api.post('agents/changeOne', data);
        dispatch(actions.fetchSuccess());
        dispatch(recieveAgentsList(1, 25));
    }
    catch(e){
        dispatch(actions.fetchError(e.message));
        throw new Error(e.message);
    }
}

export const deleteAgent = id => async dispatch => {
    try{
        dispatch(actions.fetchPending());
        await api.post('agents/deleteOne', {id})
        dispatch(actions.fetchSuccess());
        dispatch(recieveAgentsList(1, 25));
    }
    catch(e){
        dispatch(actions.fetchError(e.message));
        throw new Error(e.message);
    }
}

export const searchAgents = searchString => async dispatch => {
    try{
        dispatch(actions.fetchPending());
        const {data} = await api.get(`agents/getSearchList?searchString=${searchString}`);
        dispatch(actions.setSearchList(data));
        dispatch(actions.fetchSuccess());
    }
    catch(e){
        dispatch(actions.fetchError(e.message));
        throw new Error(e.message);
    }
}
export const recieveDefaultAgent = () => async dispatch => {
    try{
        dispatch(actions.fetchPending());
        const { data } = await api.get('agents/getDefault');
        dispatch(actions.setDefaultAgent(data));
        dispatch(actions.fetchSuccess());
    }
    catch(e){
        dispatch(actions.fetchError(e.message));
        throw new Error(e.message);
    }
}
