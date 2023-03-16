import {useState} from "react";

export const useShow = () => {
    const [show, setShow] = useState(false);
    const setTrue = () => {
        setShow(true);
    }
    const setFalse = () => {
        setShow(false);
    }
    return {
        state: show,
        setTrue,
        setFalse,
        setShow
    }
}