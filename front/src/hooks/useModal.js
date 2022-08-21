import {useState} from "react";

export default function useModal(){
    const [show, setShow] = useState(false);
    const setShowTrue = () => {
        setShow(true);
    }
    return {
        show, setShow, setShowTrue
    }
}