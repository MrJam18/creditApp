import React, {useRef, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {formDataConverter} from "../../../utils/formDataConverter";
import {addPayment} from "../../../store/contracts/payments/actions";
import {setAlert} from "../../../store/alert/actions";
import CustomModal from "../../dummyComponents/CustomModal";
import Payment from "./Payment";
import ButtonInForm from "../../dummyComponents/ButtonInForm";
import {contractsSelectors} from "../../../store/contracts/selectors";
import {compareDatesBool} from "../../../utils/dates/compareDatesBool";

const AddPayment = ({ setModal })=> {
 const { contractId } = useParams();
 const contract = useSelector(contractsSelectors.getCurrent);
 const dispatch = useDispatch();
 const form = useRef();
 const [error, setError] = useState(false);
 const [loading, setLoading] = useState(false);
 const handleClose = ev => {
  setModal(false);
  setError(false);
  setLoading(false);
 }
 const formHandler = async (ev) => {
  ev.preventDefault();
  setLoading(true);
  const payment = formDataConverter(form);
  try {
   if(compareDatesBool(contract.date_issue, payment.date)) throw new Error('Дата платежа не может быть меньше даты выдачи договора.');
   await dispatch(addPayment(payment, contractId));
   dispatch(setAlert('Успешно!', 'Платеж успешно добавлен!'));
   setModal(false);
  } catch (e) {
   setError(e.message)
  } finally {
   setLoading(false);
  }
 }
 return <CustomModal onClose={handleClose} customStyles={{width: '300px'}} setShow={setModal} >
     <form onSubmit={formHandler} ref={form}>
     <Payment />
      <ButtonInForm loading={loading} />
      <div className="error">{error}</div>
     </form>
   </CustomModal>
}

export default AddPayment;