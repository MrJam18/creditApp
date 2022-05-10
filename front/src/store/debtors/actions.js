import { contractsSlice } from "../contracts/reducer";
import api from "../../http";

const contractsActions = contractsSlice.actions;

export const changeDebtorsListAction = (list, total) => ({
    type: 'DEBTORS::CHANGE_LIST',
    payload: {
        list, total
    }
})

export const setDebtorsLoading = isLoading => ({
    type: 'DEBTORS::SET_LOADING',
    payload: isLoading
})


export const debtorCreator = (form, address, setError) => async () =>  {
    try {    
        const debtor = {
            surname: form.surname.value,
            name: form.name.value,
            patronymic: form.patronymic.value,
            birth_date: form.birthDate.value,
            birth_place: form.birthPlace.value
        }
        const passport = {
            type: form.passportType.value,
            series: form.series.value,
            number: form.number.value,
            issued_by: form.issue.value,
            issued_date: form.issueDate.value,
            gov_unit_code: form.govCode.value
        }
        const {data} = await api.post('debtors/createOne', {debtor, address, passport})
        return data;
}
    catch(e) {
        setError(e.message)
    }
    finally {
        setDebtorsLoading(false);
    } 
}

export const getList = (limit, page) =>  async (dispatch) =>  {
    dispatch(setDebtorsLoading(true));
    try {
    const {data} = await api.get(`list/getList?limit=${limit}&page=${page}`);
    dispatch(contractsActions.setContracts(data.contractsList));
    dispatch(changeDebtorsListAction(data.debtorsList, data.totalRows));
    dispatch(setDebtorsLoading(false))
    }
    catch(e) {
        throw new Error(e.message)
    }
    finally{
        dispatch(setDebtorsLoading(false));
    }

}
