import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import styles from '../../css/agents.module.css';
import { makeStyles } from '@mui/styles';
import AddAgent from './AddAgent';

const useStyles = makeStyles({
     toolBarButton: {
       width: 'auto'
     }
})


const AgentsToolBar = () => {
    const classes = useStyles();
    const [showAddAgent, setShowAddAgent] = useState(false);
    const addOrgClickHandler = () => {
        setShowAddAgent(true);
    }
    return (
        <div className={styles.toolbar}>
            { showAddAgent && <AddAgent show={showAddAgent} setShow={setShowAddAgent} /> }
            <Button variant="text" onClick={addOrgClickHandler} className={classes.toolBarButton}><FontAwesomeIcon icon={solid('plus')} className={styles.addIcon}/> Добавить</Button>
        </div>
    );
};

export default AgentsToolBar;