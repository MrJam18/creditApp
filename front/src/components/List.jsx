import {useDispatch, useSelector} from 'react-redux';
import styles from '../css/list.module.css'
import { getContracts } from '../store/contracts/selectors';
import Debtors from './Debtors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import AddDebtor from './AddDebtor';
import { useEffect, useState } from 'react';
import Loading from './dummyComponents/Loading';
import Pagination from './dummyComponents/Pagination';
import AddContract from './addContract/AddContract';
import { useLocation } from 'react-router';
import { getList, getListLoading, getListTotal } from '../store/list/selectors';
import { recieveList } from '../store/list/actions';




const List = () => {
    const {state} = useLocation();
    const dispatch = useDispatch();
    const loading = useSelector(getListLoading);
    const debtors = useSelector(getList);
    const contracts = useSelector(getContracts);
    const total = useSelector(getListTotal);
    const [addDebtor, setAddDebtor] = useState(false);
    const [addContract, setAddContract] = useState(false);

    const openAddDebtor = ()=> {
      setAddDebtor(true)
    }

    const pageChanger = async (limit, page) => {
      await dispatch(recieveList(limit, page));
    }

    useEffect(()=> dispatch(recieveList(25, 1, state)), [state]);
    const debtorsList = debtors.map(debtor => <Debtors debtor = { debtor } contracts = {contracts[debtor.id]} key={debtor.id} setAddContract= {setAddContract}/>)

    return (
        <div className='background firstWindow'>
          {addContract && <AddContract debtorId={addContract} setShow={setAddContract} />}
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