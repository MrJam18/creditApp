import React, {useRef, useState} from 'react';
import CustomModal from "../dummyComponents/CustomModal";
import CustomInput from "../dummyComponents/CustomInput";
import styles from "../../css/orgs.module.css";
import {useError} from "../../hooks/useError";
import ButtonInForm from "../dummyComponents/ButtonInForm";
import {AddBanksRequisitesController} from "../../controllers/AddBanksRequisitesController";

const AddBanksRequisites = ({setShow}) => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const {comp, setError, noError} = useError();
    const onSubmit = async ()=> {
        const controller = new AddBanksRequisitesController(setError, setLoading, setShow, null, formRef);
        await controller.handle();
    }
    return (
  <CustomModal customClassName={styles.addBankModal} fixedStyles={{bottom: '50%'}} setShow={setShow} >
      <div className="block-header">Укажите реквизиты банка</div>
      <form ref={formRef}>
      <div className="inputs-box">
        <CustomInput label='имя банка' name='name' noSubmit required />
      </div>
      <div className="inputs-box">
        <CustomInput label="БИК" noSubmit name='BIK' required />
      </div>
      <ButtonInForm  onClick={onSubmit} type='button' loading={loading}   />
      </form>
      {comp()}
  </CustomModal>
 );
};

export default AddBanksRequisites;