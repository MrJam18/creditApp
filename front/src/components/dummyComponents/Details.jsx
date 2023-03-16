import { ListItemButton } from '@mui/material';
import React, { useState } from 'react';
import ArrowDirection from './ArrowDirection';
import styles from '../../css/details.module.css'

const Details = ({header, children, id, buttons}) => {
    const [arrow, setArrow] = useState(false);
    
    return (
            <div className={styles.main} id = {id}>
                <ListItemButton onClick={()=> setArrow(!arrow)} className={styles.header}>
                    {header}  <ArrowDirection arrow = {arrow} /> {buttons}
                </ListItemButton>
                    <div className={arrow ? styles.open  + ' ' + styles.always : styles.close + ' ' + styles.always}>
                        {children}
                    </div>
            </div>
    
    );
};

export default Details;