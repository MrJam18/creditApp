import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

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

const CustomButton = ({onClick, formId, text = 'Подтвердить'}) => {
 const classes = useStyles();
 return (
     <div className={classes.main}>
      <Button onClick={onClick} type={"submit"} form={formId} variant='contained' className={classes.button}>{text} </Button>
     </div>
 );
};

export default CustomButton;