import {setAlert} from "../store/alert/actions";
import {store} from "../index";
import {useState} from "react";

// export class ErrorHandler extends React.Component
// {
//     // export const useError = () => {
//     // const [error, setError] = useState(false);
//     // const errorComp = () => error && <div className='error'>{error}</div>
//     // return [ setError, errorComp, error ]
//     error = false;
//     setError;
//     errorComp;
//     constructor(setError) {
//         [this.error, this.setError] = useState(false);
//         this.errorComp = () => this.error && <div className='error'>{this.error}</div>
//         return [ this.setError, this.errorComp, this.error]
//     }
//     static setAlert(e) {
//         console.log(e);
//         store.dispatch(setAlert('Ошибка!', e.message, 'error'));
//     }
//     changeError(e) {
//         console.log(e);
//         this.setError(e.message);
//     }
//     clearError() {
//         this.setError(false);
//     }
//
// }


/**
 * @param e{Error} error object
 * @param header{string} header for error;
 */
export const alertHandler = (e, header = 'Ошибка!') => {
    console.error(e);
    store.dispatch(setAlert(header, e.message, 'error'));
}