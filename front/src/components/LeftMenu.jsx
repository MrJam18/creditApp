import { MenuItem } from '@mui/material';
import {Drawer} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOpenLeftMenu, setOpenLeftMenu } from '../store/global';
import styles from '../css/leftMenu.module.css'
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    menuItem: {
        padding: '10px 20px',
        fontSize: '17.5px',
        fontWeight: '600',
        paddingRight: '30px'
    },
});
const LeftMenu = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const open = useSelector(getOpenLeftMenu);
    const closeMenu = () => {
        dispatch(setOpenLeftMenu(false));
    }
    return (
        <div>
            <Drawer transitionDuration={180} onClose={closeMenu} open={open}>
                <div className={styles.main}>
                <NavLink onClick={closeMenu} to='organizations' className={({isActive}) => isActive ? styles.link + ' ' + styles.link_active : styles.link } >
                <MenuItem className={classes.menuItem} >Организации</MenuItem>
                </NavLink>
                <NavLink to='cessions' onClick={closeMenu} className={({isActive}) => isActive ? styles.link + ' ' + styles.link_active : styles.link } >
                <MenuItem className={classes.menuItem} divider>Цессии</MenuItem>
                </NavLink>
                <NavLink onClick={closeMenu} to='agents' className={({isActive}) => isActive ? styles.link + ' ' + styles.link_active : styles.link } >
                <MenuItem className={classes.menuItem} divider>Представители</MenuItem>
                </NavLink>
                <MenuItem className={classes.menuItem} divider>Мои задачи</MenuItem>
                <MenuItem className={classes.menuItem} divider>Настройки</MenuItem>
                <MenuItem className={classes.menuItem} divider>Настройки</MenuItem>
                </div>
            </Drawer>
        </div>
    );
};

export default LeftMenu;