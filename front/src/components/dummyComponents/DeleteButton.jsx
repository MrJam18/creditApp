import React from 'react';
import {Button} from "@mui/material";

const DeleteButton = ({onClick, text='Удалить'}) => {

 return (
  <>
   <Button color='error' variant='contained' onClick={onClick} style={{width: 'auto'}} >{text}</Button>
  </>
 );
};

export default DeleteButton;