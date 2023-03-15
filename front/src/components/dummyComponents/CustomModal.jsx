import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from '../../css/customModal.module.css';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';


const CustomModal = ({children, show, setShow, onClose, customStyles, fixedStyles, header}) => {
    const closeHandler = () => {
        if (onClose){
            onClose();
        }
        setShow(false);
        
    }
    const stopClosing = (ev) => {
        ev.stopPropagation();
    }
    return (
        <>
        {show && <div className={styles.back} onMouseDown={closeHandler}>
            <div className={styles.fixed} style={fixedStyles}>
                <div className={styles.headerHolder}>{header}</div>
            <div className={styles.contentBox} style={customStyles} onMouseDown={stopClosing}>
            <div className={styles.closingButton} onClick= {closeHandler}>
                <FontAwesomeIcon icon={solid("xmark")} className={styles.xmark}/>
                </div>
                {children}
            </div>
            </div>
        </div>}
        </>
    );
};

export default CustomModal;