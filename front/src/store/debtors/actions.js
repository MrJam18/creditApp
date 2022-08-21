import api from "../../http";
import { debtorsSlice } from "./reducer";
import { setAlert } from "../alert/actions";
import { listSlice } from "../list/reducer";

const actions = debtorsSlice.actions;
const listActions = listSlice.actions;



export const debtorCreator = (form, address, setError) => async () =>  {
    listActions.setListLoading(true);
    try {    
        const debtor = {
            surname: form.surname.value,
            name: form.name.value,
            patronymic: form.patronymic.value,
            birth_date: form.birthDate.value,
            birth_place: form.birthPlace.value
        }
        let passport;
        if(form.typeId.value === 'noPassport') passport = 'noPassport'
        else{
            passport = {
                type: form.typeId.value,
                series: form.series.value,
                number: form.number.value,
                issued_by: form.issue.value,
                issued_date: form.issueDate.value,
                gov_unit_code: form.govCode.value
            }
        }
        const {data} = await api.post('debtors/createOne', {debtor, address, passport})
        return data;
}
    catch(e) {
        console.log(e)
        setError(e.message)
    }
    finally {
        listActions.setListLoading(false);
    } 
}


export const recieveDebtor = (id) => async (dispatch) => {
    dispatch(actions.setLoading(true));
    try{
        const {data} = await api.get('/debtors/getDebtor?id=' + id);
       // dispatch(actions.getData(data));
        dispatch(actions.setPassport(data.passport));
        delete data.passport;
        dispatch(actions.setData(data));
    }
    catch(e){
        setAlert('Ошибка при получении должника', e.message, 'error');
    }
    finally {
        dispatch(actions.setLoading(false));
    }
}

export const changeDebtor = (data, id) => async (dispatch) => {
    await api.post('debtors/setDebtor', {...data, id});
    dispatch(setAlert('Успешно', "Должник успешно изменен"));
    await dispatch(recieveDebtor(id));
}

export const changePassport = (data, id, debtorId) => async (dispatch) => {
    await api.post('debtors/setPassport', {...data, id});
    dispatch(setAlert('Успешно', "Должник успешно изменен"));
    await dispatch(recieveDebtor(debtorId));
}

export const deleteDebtor = (id) => async (dispatch) => {
    try {
        await api.post('debtors/deleteOne', {id});
        dispatch(setAlert('Успешно', "Должник успешно удален"));
    }
    catch(e){
        alert(e);
    }
}

export const definePassport = (debtorId, data) => async (dispatch) => {
    const now = new Date();
    const issuedDate = Date.parse(data.issued_date);
    if (!/^\d{4}$/.test(data.series) && data.typeId === '1') throw new Error('Серия паспорта должна состоять из 4 цифр!');
    if (!/^\d{6}$/.test(data.number) && data.typeId === '1') throw new Error('Номер паспорта должен состоять из 6 цифр!');
    if (now < issuedDate) throw new Error('Дата выдачи должна быть меньше текущей даты!');
    if (!/^\d{3}-\d{3}$/.test(data.gov_unit_code) && data.typeId === '1') throw new Error('код подразделения должен быть формата "111-111"!');
    await api.post('debtors/definePassport', {...data, debtorId});
    dispatch(setAlert('Успешно', "Паспортные данные успешно добавлены"));
    await dispatch(recieveDebtor(debtorId));
}