import { createSlice } from "@reduxjs/toolkit";

const initState = {
    loading: true,
    list: [],
    total: 0,
    searchList: [],
    error: false,
    newBanksRequisites: null,
    creditor: undefined
}

export const organizationsSlice = createSlice({
    name: 'organizations',
    initialState: initState,
    reducers: {
        setSearchList(state, action){
            state.searchList = action.payload
        },
        setList(state, action) {
            state.list = action.payload.rows;
            state.total = action.payload.count;
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
        },
        setNewBanksRequisites(state, action) {
            state.newBanksRequisites = action.payload;
        },
        setCreditor(state, action) {
            state.creditor = action.payload;
        },
        setDefaultCessionForCreditor(state, action) {
            if(state.creditor) state.creditor.cession = action.payload;
        }
    }
})