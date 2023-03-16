import React from 'react';
import ToolbarAddButton from "../dummyComponents/ToolbarAddButton";
import {useDispatch} from "react-redux";
import useModal from "../../hooks/useModal";
import {cessionsSlice} from "../../store/cessions/reducer";
import CessionAdder from "./CessionAdder";

const actions = cessionsSlice.actions;

const AddButton = ({}) => {
    const dispatch = useDispatch();
    const addModal = useModal();
    const onClick = () => {
        dispatch(actions.setInfoRows({rows: [{}], count: 1}));
        dispatch(actions.setInfoLoading(false));
        addModal.setShowTrue();
    }
 return (
  <>
   <ToolbarAddButton onClick={onClick} />
      {addModal.show && <CessionAdder setShow={addModal.setShow} />}
  </>
 );
};

export default AddButton;