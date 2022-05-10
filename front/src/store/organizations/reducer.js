import { createSlice } from "@reduxjs/toolkit";

const initState = {
    loading: true,
    list: [],
    total: 0,
    searchList: [],
    error: false,
}
    
    
    

    
    
    
    // export const organizationsReducer = (state = initState, action) => {
    //     switch(action.type) {
    //         case 'ORGANIZATIONS::CHANGE_NAMES':
    //             return {
    //                 ...state,
    //                 names: action.payload
    //             }
    //         case 'ORGANIZATIONS::SET_LOADING':
    //             return {
    //                 ...state,
    //                 loading: action.payload
    //             }
    //         default:
    //             return state;
    //     }
    // }

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
        }
    }
})