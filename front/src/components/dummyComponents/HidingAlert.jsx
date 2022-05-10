import { Alert, AlertTitle, Collapse,} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../css/hidingAlert.module.css';
import { hideAlert } from '../../store/alert/actions';
import { getAlert } from '../../store/alert/selectors';

const useStyles = makeStyles({
  block: {
    whiteSpace: 'nowrap',
    marginTop: '20px',
  }
}
);

const HidingAlert = () => {
    const alert = useSelector(getAlert);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(()=> setTimeout(()=> dispatch(hideAlert()),3000), [alert])
    return (
        <div className={"position_relative " + styles.main}>
        <div className={"position_absolute " + styles.block}>
        <Collapse in={alert} orientation='horizontal' easing='0.2s' className={classes.block}>
        <Alert severity={alert.type}>
        <AlertTitle>{alert.header}</AlertTitle>
        {alert.text}
      </Alert>
      </Collapse>
      </div>
      </div>
    );
};

export default HidingAlert;