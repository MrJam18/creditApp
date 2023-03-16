import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchList: [], 
}


export const bailiffsSlice = createSlice({
    name: 'bailiffs',
    initialState,
    reducers: {
        setSearchList(state, action) {
            state.searchList = action.payload
        }
    }

})