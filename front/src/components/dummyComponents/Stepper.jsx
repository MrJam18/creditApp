import React from 'react';
import CustomModal from "./CustomModal";
import MovingModal from "./MovingModal";

let firstComponent;
const Stepper = ({firstPage = true, children, setShow, onClose, customStyles, fixedStyles, header, movingSpeed}) => {
    if(firstPage) {
        firstComponent = children;
        return (
            <CustomModal setShow={setShow} onClose={onClose} customStyles={customStyles} fixedStyles={fixedStyles} header={header}>
                {children}
            </CustomModal>
        );
    }
    else {
        return (
            <MovingModal setShow={setShow} onClose={onClose} customStyles={customStyles} fixedStyles={fixedStyles} header={header} firstComponent={firstComponent} movingSpeed={movingSpeed} >
                {children}
            </MovingModal>
        )
    }

};

export default Stepper;