import { createSlice } from "@reduxjs/toolkit"

const initState = {
    current: null,
    executiveDoc: {},
    court: null,
    list: [],
    limitations: [],
    totalLimitations: [],
    existingFiles: {
        cancelDecision: {
            status: false,
            loading: false
        },
        contract: {
            status: false,
            loading: false
        },
        courtOrder: {
            status: false,
            loading: false
        },
        IPEnd: {
            status: false,
            loading: false
        },
        IPInit: {
            status: false,
            loading: false
        },
        receivingOrder: {
            status: false,
            loading: false
        }
    },
    loadingExisting: true,
    statuses: [
        {
            id: 1,
            name: 'Не готов'
        }
    ],
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
            state.executiveDoc = action.payload;
        },
        setExecutiveDocName(state, action) {
            if(state.current) {
                state.current.executiveDocName = action.payload;
            }
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
        },
        setStatuses(state, action) {
            state.statuses = action.payload;
        },
        setExistingFiles(state, action) {
            const currentState = state.existingFiles;
            for(let key in currentState) {
                currentState[key].status = action.payload[key];
            }
        },
        setCurrentExisting(state, action) {
            state.existingFiles[action.payload.fileName].status = action.payload.status;
        },
        setCurrentLoadingExisting(state, action) {
            state.existingFiles[action.payload.fileName].loading = action.payload.status;
        },
        setLoadingExisting(state, action) {
            state.loadingExisting = action.payload;
        },
        setCourt(state, action) {
            state.court = action.payload;
        },
        reset: ()=> initState
    },
})
