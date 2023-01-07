import {setAlert} from "../store/alert/actions";
import {store} from "../index";



/**
 * @param e{Error} error object
 * @param header{string} header for error;
 */
export const alertHandler = (e, header = 'Ошибка!') => {
    console.error(e);
    const message = e.response?.data.message || e.message;
    console.log(message);
    store.dispatch(setAlert(header, message, 'error'));
}