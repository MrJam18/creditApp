import { createSlice } from "@reduxjs/toolkit"
import { reducer } from "../base/baseReducer"

const initialState = {
    data: {
        id: 0,
        surname: 'noname',
        name: 'noname',
        patronymic: 'noname',
        birth_date: 'noname',
        birth_place: 'noname',
        fullAddress: 'noname',
    },
    passport: {
        id: 0
    },
    comments: [],
    actions: [],
    loading: true,
    error: false    
}





export const debtorsSlice = createSlice({
    name: 'debtors',
    initialState,
    reducers: {
        ...reducer,
        setData(state, action) {
            state.data = action.payload
        },
        setPassport(state, action) {
            state.passport = action.payload
        }
        },
})
