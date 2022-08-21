import {useState} from "react";

export const useError = () => {
    const [error, changeError] = useState(false);
    const setError = (e) => {
        if(e.response?.data?.message){
            changeError(e.response.data.message);
        }
        else changeError(e.message);
    }
    const ErrorComp = () => error ? <div className='error'>{error}</div> : <></>
    return {error, setError, ErrorComp}
}