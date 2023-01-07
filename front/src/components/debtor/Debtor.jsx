import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { recieveDebtor } from "../../store/debtors/actions";
import { getDebtor, getDebtorLoading } from "../../store/debtors/selectors";
import InnerMenu from "../dummyComponents/InnerMenu";
import Info from "./DebtorInfo";
import Loading from '../dummyComponents/Loading';
import styles from '../../css/debtor.module.css';


const menu = [{
    value: 'info',
    label: 'Информация',
    component: <Info />
},
{
    value: 'actions',
    label: 'Действия'
},
{
    value: 'comments',
    label: 'Комментарии'
}   
];

const Debtor = () => {
    const { debtorId } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector(getDebtorLoading);
    const debtor = useSelector(getDebtor);
    const [menuValue, setMenuValue] = useState('info');
    const menuSelector = () => {
        switch (menuValue) {
            case 'info':
            return <Info debtor={debtor}/>
            default:
                return <Info debtor={debtor} />
        }
        
    }

    useEffect( async ()=> {
        await dispatch(recieveDebtor(debtorId));
    }, []);
    return (
    <div className={'background firstWindow'}>
       <div className="header">{ loading ? 'Загрузка' : 'Должник ' + debtor.initials }</div>
    <div className={"contentBox" + ' ' + styles.main}>
    <InnerMenu menu={menu} menuValue={menuValue} setMenuValue = {setMenuValue} />
        {loading ? <div className="center"><Loading/></div> : menuSelector()    }
    </div>
    </div>
    );
};


export default Debtor;