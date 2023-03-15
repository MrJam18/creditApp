import { act } from "@testing-library/react";
import api from "../../../http";
import { setAlert } from "../../alert/actions";
import { setloading } from "../../global";
import { getCurrentContract } from "../actions";
import { paymentsSlice } from "./reducer";

const actions = paymentsSlice.actions;

export const setPayments = (list) => ({
type: 'PAYMENTS::CHANGE_LIST',
payload: list
})

export const setTotalPayments = total => ({
    type: 'PAYMENTS::CHANGE_TOTAL',
    payload: total
})


export const addPayment = (payment, contractId) => async (dispatch) => {
    dispatch(actions.fetchPending());
    try{
        await api.post('payments/add', {payment, contractId});
        await dispatch(getCurrentContract(contractId));
        dispatch(actions.fetchSuccess());
        //    dispatch(getCurrentContract(contractId));
        //    dispatch(setloading(false));
       
    }
    catch(e) {
        dispatch(actions.fetchError(e.message))
    }
}

export const deletePayment = (paymentId, contractId) => async (dispatch) => {
    dispatch(actions.fetchPending());
    try{
        await api.post('payments/deletePayment', {paymentId, contractId});
        await dispatch(getCurrentContract(contractId));
        dispatch(actions.fetchSuccess());
    }
    catch(e) {
        dispatch(actions.fetchError(e.message));
    }
}

export const recievePaymentsPage = (contractId, page, limit, orderField, orderType) => async dispatch => {
    dispatch(actions.fetchPending());
    try{
        const {data} = await api.get(`payments/getPayments?contractId=${contractId}&page=${page}&limit=${limit}&orderField=${orderField}&orderType=${orderType}`);
        dispatch(actions.setList({list: data.list, total: data.total}));
        dispatch(actions.fetchSuccess());
    }
    catch(e) {
        dispatch(actions.fetchError);
    }
}

// export const sortPayments = (field, type, contractId) => async dispatch => {
//     try{
//         dispatch(setloading(true));
//         const response = await(getjson(serverApi + `payments/sortPayments?field=${field}&type=${type}&contractId=${contractId}`));
//         dispatch(setPayments(response.list));
//         dispatch(setloading(false));
//     }
//     catch(e) {
//         throw new Error(e.message)
//     }
// }