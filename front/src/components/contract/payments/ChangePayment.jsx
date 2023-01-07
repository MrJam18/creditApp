import React, {useRef, useState} from 'react';
import Payment from "./Payment";
import ButtonInForm from "../../dummyComponents/ButtonInForm";
import CustomModal from "../../dummyComponents/CustomModal";
import {formDataConverter} from "../../../utils/formDataConverter";
import {useError} from "../../../hooks/useError";
import {useDispatch, useSelector} from "react-redux";
import {contractsSelectors} from "../../../store/contracts/selectors";
import {compareDatesBool} from "../../../utils/dates/compareDatesBool";
import DeleteButton from "../../dummyComponents/DeleteButton";
import {changePayment, deletePayment} from "../../../store/contracts/payments/actions";
import {useParams} from "react-router";

const ChangePayment = ({setShow, payment}) => {
    const [loading, setLoading] = useState(false);
    const contract = useSelector(contractsSelectors.getCurrent);
    const {contractId} = useParams();
    const error = useError();
    const form = useRef();
    const dispatch = useDispatch();
    const onSubmit = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        error.noError();
        try{
            const data = formDataConverter(form);
            data.id = payment.id;
            if(compareDatesBool(contract.date_issue, data.date)) throw new Error('Дата платежа не может быть меньше даты выдачи договора.');
            await dispatch(changePayment(data, contractId));
            setShow(false);
        }
        catch (e) {
            error.setError(e);
        }
        finally {
            setLoading(false);
        }
    }

    const deletePaymentHandler = async () => {
        try {
            setLoading(true);
            error.noError();
            await dispatch(deletePayment(payment.id, contractId));
            setShow(false);
        } catch (e) {
            error.setError(e);
        }
        finally {
            setLoading(false);
        }
    }

 return (
     <CustomModal customStyles={{width: '300px'}} setShow={setShow} >
         <div className="margin-bottom_20">
             <DeleteButton onClick={deletePaymentHandler} />
         </div>
      <form onSubmit={onSubmit} ref={form}>
       <Payment defaultValue={payment} />
       <ButtonInForm loading={loading} />
          {error.comp()}
      </form>
     </CustomModal>
 );
};

export default ChangePayment;