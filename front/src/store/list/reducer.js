import { createSlice } from "@reduxjs/toolkit"

const initialState = {
        data: [],
        totalRows: 0,
        loading: true
}
    





export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        changeList(state, action) {
            state.data = action.payload.list;
            state.totalRows = action.payload.rows;
        },
        setListLoading(state, action) {
            state.loading = action.payload;
        }
    }
})
