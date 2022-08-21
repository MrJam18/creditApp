import { ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { chandeDateFormatOnRus } from '../utils/changeDateFormat';
import styles from '../css/list.module.css'
import Details from './dummyComponents/Details'
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const useStyles = makeStyles({
  debtorBlock: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  debtorName: {
    flex: 1
  }
})

const Debtors = ({debtor, contracts, setAddContract}) => { 
  const classes = useStyles();
  const navigate = useNavigate();
  const addContractHandler = () => setAddContract(debtor.id);
  const infoButtonHandler = (ev) => {
    ev.stopPropagation();
    navigate(`/debtors/${debtor.id}`);
  }
  const Header = 
      <>
      <ListItemText primary={`${debtor.surname} ${debtor.name} ${debtor.patronymic}, ${chandeDateFormatOnRus(debtor.birth_date)} г.р. Место рождения: ${debtor.birth_place}`} className={classes.header} />
      <div className={styles.birth_date}></div>
      <div className={styles.contractsNumber}>Договоров: {contracts?.length}</div>
      </>
  const buttons = <div className={styles.debtor__buttons} onClick={infoButtonHandler}><FontAwesomeIcon icon={solid('ellipsis-vertical')} className={styles.debtor__infoIcon} /></div>
      
    return (
      <>
      <div className={styles.debtor__block}>
    <Details header = {Header} id = {debtor.id} buttons= {buttons}>
    {contracts?.map(contract =>
      <Link to={`/contracts/${contract.id}`} key= {contract.id} className='antiLink'>
          <ListItemButton component= 'div' className={classes.debtorBlock}>
      <ListItemText primary={`договор № ${contract.number} выдан ${chandeDateFormatOnRus(contract.date_issue)} г.`} className={classes.debtorName}/>
      <div className={styles.issuingOrg}>{contract.organization.name}</div>
      <div className={styles.status}>{contract.status?.name}</div>
    </ListItemButton>
    </Link>
    )}
    <div className={styles.addContract__block}>
    <button className={styles.addContract__button} onClick= {addContractHandler}>
    <FontAwesomeIcon icon={solid('plus')} className={styles.addContract__icon}/>
    </button>
    </div>
    </Details>
    </div>
    </>
    )
    }
export default Debtors;