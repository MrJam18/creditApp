import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import CustomModal from "../dummyComponents/CustomModal";
import EasySearch from "../dummyComponents/search/EasySearch";
import CustomCheckBox from "../dummyComponents/CustomCheckBox";
import {changeDefaultCession} from "../../store/creditors/actions";
import {useError} from "../../hooks/useError";
import ButtonInForm from "../dummyComponents/ButtonInForm";

const DefaultCessionChanger = ({setShow, cession, creditorId}) => {
    const dispatch = useDispatch();
    const [cessionState, setCessionState] = useState(cession);
    const [noDefault, setNoDefault] = useState(!cession);
    const [loading, setLoading] = useState(false);
    const error = useError();
    const onSubmit = async () => {
        try{
            if(!cessionState && !noDefault) throw new Error('Введите название цессии и выберите из списка!');
            const cession = noDefault ? null : cessionState;
            setLoading(true);
            error.noError();
            await dispatch(changeDefaultCession(creditorId, cession));
            setShow(false);
        } catch (e) {
            error.setError(e);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(()=> {
        if(noDefault) setCessionState(null);
    }, [noDefault]);

 return (
  <CustomModal setShow={setShow}>
      <div className="header_small">Укажите цессию по умолчанию</div>
      <div className="margin-bottom_10">
      <EasySearch label='название цессии' disabled={noDefault} value={cessionState} required serverAddress={'cessions/getNameList'} setValue={setCessionState} />
      </div>
      <CustomCheckBox checked={noDefault} setChecked={setNoDefault} label={'Нет цессии по умолчанию'} />
      <ButtonInForm loading={loading} onClick={onSubmit}  type='button' />
      {error.comp()}
  </CustomModal>
 );
};

export default DefaultCessionChanger;