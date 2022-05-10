import { createSlice } from "@reduxjs/toolkit"

const initState = {
    current: {},
    executiveDoc: {},
    list: [],
    limitations: [],
    totalLimitations: []
}

export const contractsSlice = createSlice({
    name: 'contracts',
    initialState: initState,
    reducers: {
        setContracts(state, action) {
            state.list = action.payload;
        },
        setCurrentContract(state, action) {
            state.current = action.payload;
        },
        setExecutiveDoc(state, action) {
            state.executiveDoc = action.payload
        },
        setLimitations(state, action) {
            state.limitations = action.payload.list;
            state.totalLimitations = action.payload.total;
        },
        setloading(state, action) {
            state.loading = action.payload;
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
