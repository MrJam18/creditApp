import { createSlice } from "@reduxjs/toolkit";
import { setAlert } from "../alert/actions";

const initState = {
    list: [],
    total: 0,
    lastActionsList: [],
    lastActionsTotal: 0
}


export const actionsSlice = createSlice({
    name: 'actions',
    initialState: initState,
    reducers: {
        changeList(state, action){
            state.list = action.payload.list;
            state.total = action.payload.total;
        },
        changeLastActionsList(state, action) {
            state.lastActionsList = action.payload.list;
            state.lastActionsTotal = action.payload.total;
        },
        setloading(state, action) {
            state.loading = action.payload
        },
        fetchSuccess(state, action) {
            state.error = false;
            state.loading = false;
        },
        fetchError(state, action) {
            state.loading = false;
            state.error = action.payload;
            
        },
        fetchPending(state, action) {
            state.loading = true;
        }
    },
})