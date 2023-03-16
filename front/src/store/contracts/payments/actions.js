import { act } from "@testing-library/react";
import api from "../../../http";
import { setAlert } from "../../alert/actions";
import { setloading } from "../../global";
import { getCurrentContract } from "../actions";
import { paymentsSlice } from "./reducer";

const actions = paymentsSlice.actions;



export const addPayment = (payment, contractId) => async (dispatch) => {
        await api.post('payments/add', {payment, contractId});
        await dispatch(recievePaymentsPage(contractId));
        dispatch(setAlert('Успешно', 'Платеж успешно добавлен'));
}
export const changePayment = (payment, contractId) => async (dispatch) => {
    await api.post('payments/change', {payment, contractId});
    await dispatch(recievePaymentsPage(contractId));
    dispatch(setAlert('Успешно', 'Платеж успешно изменен'));
}
export const deletePayment = (paymentId, contractId) => async (dispatch) => {
        await api.delete(`payments/deleteOne?id=${paymentId}&contractId=${contractId}`);
        await dispatch(recievePaymentsPage(contractId));
        dispatch(setAlert('Успешно', 'Платеж успешно удален'));
}

export const recievePaymentsPage = (contractId, page = 1, limit = 10, orderField = 'date', orderType = 'ASC') => async dispatch => {
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
