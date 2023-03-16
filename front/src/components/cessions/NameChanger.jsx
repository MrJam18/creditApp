import React, {useEffect, useState} from 'react';
import CustomModal from "../dummyComponents/CustomModal";
import {cessionsSlice} from "../../store/cessions/reducer";
import {useDispatch, useSelector} from "react-redux";
import ButtonInForm from "../dummyComponents/ButtonInForm";
import {useError} from "../../hooks/useError";
import {cessionsSelector} from "../../store/cessions/selectors";
import {changeDateFormatOnRus} from "../../utils/changeDateFormat";
import {TextField} from "@mui/material";
import useInput from "../../hooks/useInput";
import CustomCheckBox from "../dummyComponents/CustomCheckBox";

const NameChanger = ({onSubmit, defCession, name}) => {
    const dispatch = useDispatch();
    const lastInfo = useSelector(cessionsSelector.selectLastInfo);
    const nameInput = useInput(name || `дог. ${lastInfo.number ? '№ ' + lastInfo.number : 'б/н'} от ${changeDateFormatOnRus(lastInfo.transferDate)} г. ${lastInfo.assignor.short} - ${lastInfo.assignee.short}`);
    const [loading, setLoading] = useState(false);
    const {error, setError, ErrorComp} = useError();
    const [defaultCession, setDefaultCession] = useState(defCession);
    const setShow = (show) => {
        dispatch(cessionsSlice.actions.setInfoShowConfirm(show));
    }
    useEffect(()=> {
        return ()=> setShow(false);
    }, []);
    const submitHandler = async (ev) => {
        setLoading(true);
        ev.preventDefault();
        try{
            await onSubmit(nameInput.value, defaultCession)
        }
        catch(e) {
            console.dir(e);
            setError(e);
        }
        finally {
            setLoading(false);
        }
    }
 return (
  <CustomModal setShow={setShow} >
      <form onSubmit={submitHandler}>
   <div className="header">Укажите название группы цессий</div>
          <div className="margin-bottom_10">
          <TextField multiline maxRows={10} fullWidth {...nameInput} />
          </div>
          <CustomCheckBox checked={defaultCession} setChecked={setDefaultCession} label={'Сделать цессией по умолчанию для кредитора'} size={'big'} />
          <div className="margin-bottom_10">
   <ButtonInForm loading={loading} />
          {error && <ErrorComp />}
          </div>
      </form>
  </CustomModal>
 );
};

export default NameChanger;