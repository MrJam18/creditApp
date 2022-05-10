import { createSlice } from "@reduxjs/toolkit"

const initState = {
    list: [],
    total: 0,
    loading: false,
    error: false,
    order: ['createdAt', 'DESC'],
    searchList: [],
}


const agentsSlice = createSlice({
    name: 'agents',
    initialState: initState,
    reducers: {
        setList(state, action) {
            state.list = action.payload.rows;
            state.total = action.payload.count;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setOrder(state, action) {
            state.order = action.payload;
        },
        setSearchList(state, action) {
            state.searchList = action.payload
        },
        setDefaultAgent(state, action) {
            state.defaultAgent = action.payload
        },
        fetchSuccess(state, action) {
            state.error = false;
            state.loading = false;
        },
        fetchError(state, action) {
            console.log(action);
            state.loading = false;
            state.error = action.payload;
        },
        fetchPending(state, action) {
            state.loading = true;
        },

    },
})

export default agentsSlice;