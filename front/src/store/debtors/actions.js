import api from "../../http";
import { debtorsSlice } from "./reducer";
import { setAlert } from "../alert/actions";
import { listSlice } from "../list/reducer";

const actions = debtorsSlice.actions;
const listActions = listSlice.actions;




export const debtorCreator = (data, address, setError) => async () => {
    listActions.setListLoading(true);
    const now = Date.now();
    const birthDate = Date.parse(data.birthDate);
    if ((/[^а-яА-Яё]/.test(data.name) || /[^а-яА-Яё]/.test(data.surname) || /[^а-яА-Яё]/.test(data.patronymic)) && data.isForeign === false) throw new Error('Фамилия, имя и отчество должны быть заполнены только русскими буквами!');
    if (now < birthDate) throw new Error('Дата рождения должна быть меньше текущей даты!');
    if (data.passportType !== 'noPassport') {
        if (!/^\d{4}$/.test(data.series) && data.passportType === '1') throw new Error('Серия паспорта должна состоять из 4 цифр!');
        else if (!/^\d{6}$/.test(data.number) && data.passportType === '1') throw new Error('Номер паспорта должен состоять из 6 цифр!');
        const issueDate = Date.parse(data.issued_date);
        if (now < issueDate) throw new Error('Дата выдачи должна быть меньше текущей даты!');
        if (!/^\d{3}-\d{3}$/.test(data.govCode) && data.passportType === '1') throw new Error('код подразделения должен быть формата "111-111"!')
    }
        try {
            const debtor = {
                surname: data.surname,
                name: data.name,
                patronymic: data.patronymic,
                birth_date: data.birthDate,
                birth_place: data.birthPlace
            }
            let passport;
            if (data.typeId === 'noPassport') passport = 'noPassport'
            else {
                passport = {
                    type: data.typeId,
                    series: data.series,
                    number: data.number,
                    issued_by: data.issue,
                    issued_date: data.issueDate,
                    gov_unit_code: data.govCode
                }
            }
            const response = await api.post('debtors/createOne', {debtor, address, passport})
            return response.data;
        } catch (e) {
            console.log(e)
            setError(e.message)
        } finally {
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