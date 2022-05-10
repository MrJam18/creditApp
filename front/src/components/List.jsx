import {useDispatch, useSelector} from 'react-redux';
import { getDebtors, getDebtorsLoading, getTotalRows } from '../store/debtors/selectors';
import styles from '../css/list.module.css'
import { getContracts } from '../store/contracts/selectors';
import Debtor from './Debtor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import AddDebtor from './AddDebtor';
import { useEffect, useState } from 'react';
import Loading from './dummyComponents/Loading';
import Pagination from './dummyComponents/Pagination';
import AddContract from './AddContract';
import { getList } from '../store/debtors/actions';
import { setAlert } from '../store/alert/actions';




const List = () => {
    const dispatch = useDispatch();
    const loading = useSelector(getDebtorsLoading);
    const debtors = useSelector(getDebtors);
    const contracts = useSelector(getContracts);
    const total = useSelector(getTotalRows);
    const [addDebtor, setAddDebtor] = useState(false);
    const [addContract, setAddContract] = useState(false);
    const openAddDebtor = ()=> {
      setAddDebtor(true)
    }
    const getNecessary = async () => {
      try{
      await dispatch(getList(25, 1))
      }
      catch(e){
        setAlert('Ошибка подключения.', e.message, 'error')
      }
    }
    const pageChanger = async (limit, page) => {
      try{
      await dispatch(getList(limit, page));
      }
      catch(e){
        setAlert('Ошибка подключения.', e.message, 'error')
      }
    }
    useEffect(getNecessary, [])
    const debtorsList = debtors.map(debtor => <Debtor debtor = { debtor } contracts = {contracts[debtor.id]} key={debtor.id} setAddContract= {setAddContract}/>)

    return (
        <div className='background firstWindow'>
          {addContract && <AddContract debtorId={addContract} setShow={setAddContract} show={addContract}/>}
         {addDebtor && <AddDebtor setAddDebtor = {setAddDebtor}/> }
        <div className={"contentBox" + ' ' + styles.listBox}>
          <div className={styles.utils}>
          <button className={styles.buttonUtil} title= 'добавить должника' onClick={openAddDebtor}>
          <FontAwesomeIcon icon={solid('user-plus')} className = {styles.imgUtil}/>
          </button>
          <button className={styles.buttonUtil} title= 'сортировка по фамилии должника'>
          <FontAwesomeIcon icon={solid("arrow-down-a-z")} className = {styles.imgUtil}/>
          </button>
          <button className={styles.buttonUtil} title= 'сортировка по фамилии должника'>
          <FontAwesomeIcon icon={solid("arrow-down-z-a")} className = {styles.imgUtil}/>
          </button>
          <button className={styles.buttonUtil} title= 'сортировка по дате договора'>
          <FontAwesomeIcon icon={solid("sort-down")} className = {styles.imgUtil}/>
          </button>
          <button className={styles.buttonUtil} title= 'сортировка по дате договора'>
          <FontAwesomeIcon icon={solid("sort-up")} className = {styles.imgUtil}/>
          </button>
          <button className={styles.buttonUtil} title= 'настройка фильтра'>
          <FontAwesomeIcon icon={solid("filter")} className = {styles.imgUtil}/>
          </button>
          </div>
        <div>
          {loading ? <Loading/> : debtorsList }
         </div>
         <Pagination total={total} pageUpdater={pageChanger}/>
        </div>
        </div>
    );
};

export default List;