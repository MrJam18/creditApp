import React from 'react';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';

const useStyles = makeStyles({
    main: {
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        marginTop: '15px',
         width: '50%'
     },
})

const ButtonInForm = ({loading, onClick, formId}) => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
        <LoadingButton loading={loading} onClick={onClick} type='submit' form={formId} variant='contained' className={classes.button}>Подтвердить </LoadingButton> 
        </div>    
    );
};

export default ButtonInForm;