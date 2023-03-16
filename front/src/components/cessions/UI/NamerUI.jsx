import React from 'react';
import CustomModal from "../../dummyComponents/CustomModal";
import {TextField} from "@mui/material";
import ButtonInForm from "../../dummyComponents/ButtonInForm";

const NamerUI = ({setShow, onSubmit, nameInput, error, ErrorComp, loading}) => {

 return (
     <CustomModal setShow={setShow} >
      <form onSubmit={onSubmit}>
       <div className="header">Укажите название группы цессий</div>
       <div className="margin-bottom_10">
        <TextField multiline maxRows={10} fullWidth {...nameInput} />
       </div>
       <div className="margin-bottom_10">
        <ButtonInForm loading={loading} />
        {error && <ErrorComp />}
       </div>
      </form>
     </CustomModal>
 );
};

export default NamerUI;