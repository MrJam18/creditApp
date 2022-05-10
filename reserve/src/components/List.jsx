import {useSelector, useDispatch} from 'react-redux';
import { getDebtors } from '../store/list/debtors/selectors';
import styles from '../css/list.module.css'
import { ListItem, ListItemButton, ListItemText, ListSubheader} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { chandeDateFormatOnRus } from '../utils/changeDateFormat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

const useStyles = makeStyles(() => ({
  debtor: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  }
}))


const List = () => {
    const classes = useStyles();
    const {openContracts, setOpentContracts} = useState(false)
    const debtors = useSelector(getDebtors);
    const handleClick = () => {
      setOpentContracts(!openContracts);
    };
    const debtorsList = debtors.map(debtor =>
      <>
       <ListItemButton onClick={handleClick} className = {classes.debtor}>
      <ListItemText primary={`${debtor.surname} ${debtor.name} ${debtor.patronymic} ${chandeDateFormatOnRus(debtor.birthDate)} г.р.`} />
      <div className={styles.birthDate}></div>
      <div className={styles.contractsNumber}>Договоров: 0</div>
      <FontAwesomeIcon icon={solid('user-secret')} />
      <i classname="fa-solid fa-trash-undo"></i>
    </ListItemButton>
    </>
    )

    return (
        <div className='background'>
        <div className={"contentBox" + ' ' + styles.listBox}>
        <div>
         {debtorsList}
         </div>
        </div>
        </div>
    );
};

export default List;