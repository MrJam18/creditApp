import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {cessionsSelector} from "../../store/cessions/selectors";
import {cessionsSlice} from "../../store/cessions/reducer";
import ChangerUI from "./UI/ChangerUI";
import {addCessionGroup} from "../../store/cessions/actions";

const actions = cessionsSlice.actions;

const CessionAdder = ({ setShow }) => {
 const dispatch = useDispatch();
 const info = useSelector(cessionsSelector.getInfo);
 const error = useSelector(cessionsSelector.selectInfoError);
 const activeCession = useSelector(cessionsSelector.selectActiveCession);
 const forceUpdate = useSelector(cessionsSelector.forceUpdate);

 const onSubmit = async (name, defaultCession) => {
  await dispatch(addCessionGroup(name, defaultCession));
  setShow(false);
 }
 useEffect(()=> {
  return () => {
   dispatch(actions.setInfoDefault());
  }
 }, []);

 return (
  <>
   <ChangerUI error={error} info={info} onSubmit={onSubmit} activeCession={activeCession} setShow={setShow} forceUpdate={forceUpdate} header='Добавление группы цессий' />
  </>
 );
};

export default CessionAdder;