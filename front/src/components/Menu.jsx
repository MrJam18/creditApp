import styles from '../css/menu.module.css'
import { NavLink } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { getIsOnline } from '../store/users/selectors';
import { tryLogout } from '../store/users/actions';
import {setAlert} from '../store/alert/actions';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import { setOpenLeftMenu } from '../store/global';

const useStyles = makeStyles({
  leftMenu: {
    paddingLeft: '20px',
    cursor: 'pointer'
  }
})
  const Menu = () => {
    const classes = useStyles();
    const isOnline = useSelector(getIsOnline);
    const dispatch = useDispatch();
    const onLogout = async () => {
      try{
        await dispatch(tryLogout());
        setAlert('Успешно!', "Вы успешно вышли.");
      }
      catch(e) {
        console.log(e);
        setAlert('Ошибка!', e.message, 'error');
      }
    }
    const onClickLeftMenuButton = () => {
      dispatch(setOpenLeftMenu(true));
    }
    const AuthButton = () => <li className= {styles.element + ' ' + styles.element_left}>
          {isOnline ? <button style={{paddingBottom: '13px', paddingTop: '1px'}} className={styles.link + ' ' + 'antibutton'} onClick={onLogout} >Выйти</button> :  <NavLink to='login' className = {({isActive}) => isActive ? styles.link + ' ' + styles.link_active : styles.link } >Войти
         </NavLink>}
        </li>
        return (
          <ul className= {styles.main}>
            <button className='antibutton' onClick={onClickLeftMenuButton}>
            <MenuIcon className={classes.leftMenu} />
            </button>
            <AuthButton />
        <Search/>
        <li className= { styles.element}><NavLink to='/' className = {({isActive}) => isActive ? styles.link + ' ' + styles.link_active : styles.link } >На главную
         </NavLink></li>
                 <li className= { styles.element}><NavLink to='list' className = {({isActive}) => isActive ? styles.link + ' ' + styles.link_active : styles.link } >Список договоров
         </NavLink></li>
     </ul>
      );
  };
  
  export default Menu;