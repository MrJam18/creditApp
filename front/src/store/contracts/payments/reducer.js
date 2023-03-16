import { createSlice } from "@reduxjs/toolkit";

const initState = {
    list: [],
    total: 0,
    loading: true,
    error: false
}

// export const paymentsReducer = (state = initState, action) => {
//     switch(action.type) {
//         case 'PAYMENTS::CHANGE_LIST':
//             return {
//                 ...state,
//                 list: action.payload
//             }
//         // case 'CONTRACTS::GET_CURRENT': 
//         //     return {
//         //         ...state,
//         //     current: action.payload
//         //     }
//         case 'PAYMENTS::CHANGE_TOTAL':
//             return {
//                 ...state,
//                 total: action.payload
//             }

//         default:
//             return state
//     }
// }


export const paymentsSlice = createSlice({
    name: "PAYMENTS",
    initialState: initState,
    reducers: {
        setList(state, action) {
            state.list = action.payload.list;
            state.total = action.payload.total;
        },
        setTotal(state, action) {
            state.total = action.payload;
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
    }
})