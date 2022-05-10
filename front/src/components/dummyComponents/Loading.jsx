import React, { useState } from 'react';
import styles from '../../css/loading.module.css'

const Loading = ({addStyles}) => {
    return (
            <div className= {styles.ldsRing} style={addStyles}><div></div><div></div><div></div><div></div></div>
    );
};

export default Loading;