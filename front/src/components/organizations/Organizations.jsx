import React from 'react';
import OrgList from './OrgList';
import styles from '../../css/orgs.module.css';
import { useSelector } from 'react-redux';
import { getUserId } from '../../store/users/selectors';
import OrgToolBar from './OrgToolBar';



const Organizations = () => {
    const userId = useSelector(getUserId);

    return (
        <div className="firstWindow background">
             <div className="header">Управление организациями</div>
            <div className={"contentBox" + ' ' + styles.main}>
                <div className="header_small">Cписок</div>
                <OrgToolBar />
                <OrgList userId={userId} />

            </div>
        </div>
    );
};

export default Organizations;