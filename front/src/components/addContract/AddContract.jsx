import React, {useEffect, useState} from 'react';
import FirstPage from "./FirstPage";
import Stepper from "../dummyComponents/Stepper";
import {useDispatch} from "react-redux";
import {createContract} from "../../store/contracts/actions";
import SecondPage from "./SecondPage";


let statusId = '1';
const setStatusId = (id) => statusId = id;
let send = {
    contract: {},
}

let Page = ({setData, setStatusId}) => <FirstPage setStatus={setStatusId} setData={setData}  />
const header = <div className="header">Создание договора</div>


const AddContract = ({debtorId, show, setShow}) => {
    const [isFirstPage, setIsFirstPage] = useState(true);
    const dispatch = useDispatch();
    const setFirst = async (data) => {
        send.contract = data;
        send.contract.statusId = statusId;
        if(statusId < '8'){
           return await sendData();
        }
        Page = () => <SecondPage setData={setSecond} />
        setIsFirstPage(false);
    }
    const setSecond = async (data) => {
        send.executiveDoc = data;
        await sendData();
    }
    const sendData = async () => {
        send.debtorId = debtorId;
        setIsFirstPage(true);
        await dispatch(createContract(send));
        setShow(false);
    }
    const setThird = data => send.other = data;
    useEffect(()=> {
        return ()=> {
            Page = ({setData}) => <FirstPage setStatus={setStatusId} setData={setData} />
            setIsFirstPage(true);
            setStatusId( '1');
            send = {
                contract: {},
            }
        }
    }, []);
    useEffect(()=> {

    })
    return (
        <>
            <Stepper setShow={setShow} customStyles={{width: '500px'}} fixedStyles={{top: '-75px',  }} header={header} firstPage={isFirstPage} >
                <Page setData={setFirst} />
            </Stepper>
        </>
    );
};

export default AddContract;