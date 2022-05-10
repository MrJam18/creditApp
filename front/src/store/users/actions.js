import AuthService from "../../services/authService";
import axios from 'axios';
import { serverApi } from "../../utils/serverApi";
import usersSlice from "./reducer";


const actions = usersSlice.actions


export const tryLogin = (data) => async dispatch => {
    try{
    dispatch(actions.fetchPending());
   const result = await AuthService.login(data.email, data.password);
   localStorage.setItem('token', result.data.accessToken);
   dispatch(actions.login(result.data.user))
   dispatch(actions.fetchSuccess());
    }
    catch(e){
        if (e.message === '401') return dispatch(actions.fetchError('Неверный email или пароль!'));
        else dispatch(actions.fetchError(e.message))
    }
};

export const tryLogout = () => async dispatch => {
    try{
    dispatch(actions.fetchPending());
   await AuthService.logout();
   localStorage.removeItem('token');
   dispatch(actions.logout());
   dispatch(actions.fetchSuccess());
    }
    catch(e){
        dispatch(actions.fetchError(e.message));
    }
    finally {
        dispatch(actions.setloading(false));
    }
}
export const checkAuth = () => async dispatch => {
    dispatch(actions.fetchPending());
    try {
        const response = await axios.get(serverApi + 'users/refresh', { withCredentials: true});
        localStorage.setItem('token', response.data.accessToken);
        dispatch(actions.login(response.data.user));
        dispatch(actions.fetchSuccess());
    }
    catch(e){
        dispatch(actions.fetchError(e.message));
    }
    finally {
        dispatch(actions.setloading(false));
    }
}