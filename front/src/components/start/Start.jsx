import React from 'react';
import styles from '../../css/start.module.css';
import LastActions from './LastActions';
import Limits from './Limits';
import Tasks from './Tasks';
import Refferences from './Referrences'

const Start = () => {
    return (
        <div className={styles.main}>
            <Tasks />
            <Limits />
            <LastActions />
            <Refferences />
            
        </div>
    );
};

export default Start;