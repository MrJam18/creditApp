import React from 'react';
import styles from "../../css/content.module.css";

const Content = ({children, boxStyles = null, boxClassName = null, header = null}) => {
    return (
        <div className={styles.firstWindow + ' ' +  styles.background}>
            <div className={styles.header}>{header}</div>
            <div style={boxStyles} className={styles.contentBox + ' ' + boxClassName}>
                {children}
            </div>
        </div>
    );
};

export default Content;