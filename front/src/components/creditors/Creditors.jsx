import React from 'react';
import CreditorsList from './CreditorsList';
import styles from '../../css/orgs.module.css';
import { useSelector } from 'react-redux';
import { getUserId } from '../../store/users/selectors';
import CreditorsToolBar from './CreditorsToolBar';



const Creditors = () => {
    const userId = useSelector(getUserId);

    return (
        <div className="firstWindow background">
             <div className="header">Управление кредиторами</div>
            <div className={"contentBox" + ' ' + styles.main}>
                <div className="header_small">Cписок</div>
                <CreditorsToolBar />
                <CreditorsList userId={userId} />

            </div>
        </div>
    );
};

export default Creditors;