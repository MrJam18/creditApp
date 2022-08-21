import { createTheme, Divider, MenuItem, MenuList, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import styles from '../../css/innerMenu.module.css';
import { makeStyles } from '@mui/styles';
import '../../css/contractMenu.css';


const useStyles = makeStyles({
  item: {
      paddingBottom: '12px',
      paddingTop: '12px',
      cursor: 'pointer'
  },
  menu: {
    width: '100%',
  },
  divider: {
    margin: 0,
    border: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    height: '1px',
    width: '100%'
},
  menuContainer: {
    width: '35%'
},
  menuHeader: {
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer'
}
});

const InnerMenu = ({menu, menuValue, setMenuValue}) => {
    const classes = useStyles();
    const handleChangeMenu = (ev, newValue)=> {
      setMenuValue(newValue);
    }
    return (
      <>
        <div className={classes.menuContainer}>
            <Tabs value={menuValue} onChange={handleChangeMenu} className={classes.menu} centered variant='fullWidth'  aria-label="basic tabs example" orientation='vertical'>
              {menu.map((el, index)=> (
                <>
                <Tab value={el.value} label={el.label} ></Tab>
                <hr className={classes.divider} />
                </>
              ))}     
        </Tabs>
        </div>
        <Divider orientation='vertical' />
        </>
    );
};


export default InnerMenu;