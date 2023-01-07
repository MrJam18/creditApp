import React, {useCallback} from 'react';
import CustomModal from "../../dummyComponents/CustomModal";
import Loading from "../../dummyComponents/Loading";
import Toolbar from "../Toolbar";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import CustomButton from "../../dummyComponents/CustomButton";
import NameChanger from "../NameChanger";
import Cession from "../Cession";

const ChangerUI = ({ error, info, activeCession, header, setShow, forceUpdate, showDeleteGroup, cessionName, onSubmit }) => {
 const ActiveCession = useCallback(() => info.loading ? null : <Cession data={info.rows[activeCession]} />, [activeCession, info.loading, forceUpdate]);

 return (
  <>
   <CustomModal customStyles={{width: '510px', minHeight: '473px'}} fixedStyles={{top: '-63px'}} setShow={setShow} header={header} >
    <div className="header_small margin-bottom_10">{cessionName}</div>
    {
     info.loading ? <Loading size='90' bold='9' addStyles={{padding: '120px'}} /> : <>
      <Toolbar showDeleteGroup={showDeleteGroup} />
      <ActiveCession />
      <MobileStepper
          variant="dots"
          steps={info.count}
          position="static"
          activeStep={activeCession}
          sx={{maxWidth: 1000, flexGrow: 1}}
          nextButton={
           <Button name='next' form='cessionData' type='submit' size="small"  disabled={activeCession === info.count - 1}>
            след. цессия
            <KeyboardArrowRight sx={{paddingBottom: '4px'}} />
           </Button>
          }
          backButton={
           <Button name='prev' form='cessionData' type='submit' size="small" disabled={activeCession === 0}>
            <KeyboardArrowLeft sx={{paddingBottom: '4px'}} />
            пред. цессия
           </Button>
          }
      />
      <CustomButton text={'Продолжить'} formId='cessionData' />
      {error && <div className="error"> {error} </div>  }
      {info.showConfirm && <NameChanger name={cessionName} onSubmit={onSubmit} />}
     </>
    }
   </CustomModal>
  </>
 );
};

export default ChangerUI;