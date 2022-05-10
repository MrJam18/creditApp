import styles from '../css/menu.module.css'
import { NavLink } from 'react-router-dom';
import Search from './Search';


  const Menu = () => {
      return (
        <ul className= {styles.main}>
        <li className= {styles.element + ' ' + styles.element_left}><NavLink to='chats' className = {({isActive}) => isActive ? styles.link + ' ' + styles.link_active : styles.link } >Выйти</NavLink></li>
        <Search/>
                 <li className= { styles.element}><NavLink to='list' className = {({isActive}) => isActive ? styles.link + ' ' + styles.link_active : styles.link } >Список договоров
         </NavLink></li>
         <li className= { styles.element}><NavLink to='claim' className = {({isActive}) => isActive ? styles.link + ' ' + styles.link_active : styles.link } >Новый иск
         </NavLink></li>
         <li className= { styles.element}><NavLink to='settings' className = {({isActive}) => isActive ? styles.link + ' ' + styles.link_active : styles.link } >Настройки
         </NavLink></li> 
     </ul>
      );
  };
  
  export default Menu;