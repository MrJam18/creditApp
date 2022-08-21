import React from 'react';
import styles from 'D:/CreditApp/front/src/css/debtorInfo.module.css';
import {columns, passportColumns } from '../../constants/debtorColumns';
import deleteDebtorView from "./DeleteDebtor";
import Toolbar from "../dummyComponents/Toolbar";
import {Button} from "@mui/material";
import {makeStyles} from "@mui/styles";
import useModal from "../../hooks/useModal";
import AddPassport from "./AddPassport";
import BaseColumner from "../dummyComponents/Columns/BaseColumner";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {changeDebtor, changePassport} from "../../store/debtors/actions";
import { getPassport } from "../../store/debtors/selectors";


const useStyles = makeStyles({
    noPassportButton: {
        marginBottom: '10px',
        width: '50%',
        minWidth: '300px'
    }
})

const DebtorInfo = ({debtor}) => {
    const classes = useStyles();
    const {debtorId} = useParams();
    const passport = useSelector(getPassport);
    const dispatch = useDispatch();
    const addPassport = useModal();
    const debtorReqFunction = async (data) => {
       await dispatch(changeDebtor(data, debtorId));
    }
    const passportReqFunction = async (data) => {
        await dispatch(changePassport(data, passport.id, debtorId));
    }
    return (
        <div className={styles.content}>
            <div className={styles.header_small}>Информация о должнике</div>
            <Toolbar elements={[deleteDebtorView()]} />
            <div className={styles.info}>
               <BaseColumner columns={columns} data={debtor} reqFunction={debtorReqFunction} />
            </div>
            <div className={styles.header_small}>Паспортные данные</div>
            <div className={styles.info}>
                {
                    passport !== 'noPassport' ? <BaseColumner columns={passportColumns} data={passport} reqFunction={passportReqFunction} /> :
                    <>
                        <div className={styles.content__fullWidthWrapper + ' margin-bottom_20'}>
                            <div className={styles.content__link + ' ' + 'antibutton'}>У должника отсутствуют паспортные
                                данные!
                            </div>
                        </div>
                        <div className={styles.content__fullWidthWrapper}>
                            <Button variant={'contained'} className={classes.noPassportButton} onClick={addPassport.setShowTrue}> Заполнить паспортые
                                данные </Button>
                        </div>
                        { addPassport.show && <AddPassport setShow={addPassport.setShow} /> }
                    </>
                }
            </div>
        </div>
    );
};
export default DebtorInfo;