import React, { useRef, useState } from 'react';
import CustomModal from '../dummyComponents/CustomModal';
import ButtonInForm from '../dummyComponents/ButtonInForm';
import { useSelector } from 'react-redux';
import {getOrgsLoading} from '../../store/creditors/selectors'
import Creditor from "./Creditor";
import {AddCreditorController} from "../../controllers/AddCreditorController";
import {setloading} from "../../store/global";
import {useError} from "../../hooks/useError";



const AddCreditor = ({show, setShow}) => {
    const [address, setAddress ] = useState(false);
    const error = useError();
    const loading = useSelector(getOrgsLoading);
    const form = useRef();
    const [isOrg, setIsOrg] = useState(true);
    const [fixedStyles, setFixedStyles] = useState();
    const [bankRequisites, setBankRequisites] = useState();
    const formHandler = async (ev) => {
        ev.preventDefault();
        const data = {
            address,
            bankRequisites
        }
        const controller = new AddCreditorController(error.setError, setloading, setShow, data, form );
        await controller.handle();

    }

    return (
        <div>
            <form onSubmit={formHandler} ref={form}>
            <CustomModal show={show} fixedStyles={fixedStyles} setShow={setShow}  customStyles={{width: '500px'}}>
                <div className="header_small">Укажите данные кредитора</div>
                <Creditor bankRequisites={bankRequisites} setBankRequisites={setBankRequisites} isOrg={isOrg} setIsOrg={setIsOrg} setAddress={setAddress} setFixedStyles={setFixedStyles} />
                <div className="margin-bottom_10">
                    <ButtonInForm loading={loading} />
                </div>
                {error.comp()}
            </CustomModal>
            </form>
            
        </div>
    );
};

export default AddCreditor;