import { createSlice } from "@reduxjs/toolkit"

const initState = {
    isOnline: false,
    loading: true,
    user: {},
    error: false,
}


const usersSlice = createSlice({
    name: 'users',
    initialState: initState,
    reducers: {
        login(state, action){
            state.isOnline = true;
            state.user = action.payload
        },
        logout(state, action) {
            state.isOnline = false;
            state.user = {}
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
    extraReducers: {
        // [tryLogin.fulfilled.type]: (state, action) => {
        //     state.loading = false;
        //     state.error = false;
        // },
        // [tryLogin.rejected.type]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },
        // [tryLogin.pending.type]: (state) => {
        //     state.loading = true;
        // }
    }
})

export default usersSlice;