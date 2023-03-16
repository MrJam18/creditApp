import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {Button} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
 toolBarButton: {
  width: 'auto'
 },
 addIcon: {
  marginRight: '8px',
  width: '15px',
  fontSize: '6px',
  height: '18px'
 }
})

const ToolbarAddButton = ({onClick}) => {
const classes = useStyles();

 return (
   <Button variant="text" onClick={onClick} className={classes.toolBarButton}><FontAwesomeIcon icon={solid('plus')} className={classes.addIcon}/> Добавить</Button>
 );
};

export default ToolbarAddButton;