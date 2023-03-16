import {useState} from "react";

export const useError = () => {
    const [error, changeError] = useState(false);
    const setError = (e) => {
        console.error(e);
        if(e.response?.data?.message){
            changeError(e.response.data.message);
        }
        else if(e.message) changeError(e.message);
        else changeError(e);
    }
    const noError = ()=> {
        changeError(false);
    }
    const comp = () => error ? <div className='error'>{error}</div> : <></>
    return {error, setError, comp, noError}
}