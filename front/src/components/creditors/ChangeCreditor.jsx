import { Button } from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import CustomModal from '../dummyComponents/CustomModal';
import { makeStyles } from '@mui/styles';
import ButtonInForm from '../dummyComponents/ButtonInForm';
import { useDispatch, useSelector } from 'react-redux';
import {getOrgsLoading} from '../../store/creditors/selectors'
import {deleteOrganization, receiveCreditor} from '../../store/creditors/actions';
import Creditor from "./Creditor";
import {useError} from "../../hooks/useError";
import {ChangeCreditorController} from "../../controllers/ChangeCreditorController";
import {setloading} from "../../store/global";
import styles from 'css/orgs.module.css';
import DefaultCessionChanger from "./DefaultCessionChanger";
import Loading from "../dummyComponents/Loading";
import {getCreditor} from "../../store/creditors/selectors";

const useStyles = makeStyles({
    button: {
        width: '25%',
        height: '31px'
    },
    cessionButton: {
        width: '45%',
        height: '31px'
    }
})



const ChangeCreditor = ({creditorId, setShow}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const creditor = useSelector(getCreditor);
    const [address, setAddress] = useState('default');
    const error = useError(false);
    const [loading, setLoading] = useState(false);
    const [isOrg, setIsOrg] = useState(creditor?.typeId !== 3);
    const [fixedStyles, setFixedStyles] = useState();
    const [bankRequisites, setBankRequisites] = useState();
    const [showDefaultCessionChanger, setShowDefaultCessionChanger]= useState(false);
    const buttonLoading = useSelector(getOrgsLoading);
    const form = useRef();

    const formHandler = async (ev) => {
        ev.preventDefault();
        const data = {
            bankRequisitesId: bankRequisites.id,
            address,
            id: creditor.id,
            requisitesId: creditor.requisite.id
        }
        const controller = new ChangeCreditorController(error.setError, setloading, setShow, data, form);
        await controller.handle();
    }

    const deleteHandler = async () => {
        error.noError();
        try{
        await dispatch(deleteOrganization(creditor.id));
        setShow(false);
        }
        catch(e){
            error.setError(e);
        }
    }
    const onClose = () => {
        error.noError();
    }
    const onStart = async () => {
        if(!creditor || creditorId !== creditor.id)
        {
            setLoading(true);
            await dispatch(receiveCreditor(creditorId));
            setLoading(false);
        }
    }
    useEffect(onStart, []);
    useEffect(()=> {
        if(creditor) {
            setBankRequisites(creditor.requisite.bankRequisite);
            setIsOrg(creditor.typeId !== 3)
        }
    }, [creditor]);

    return (
        <div>
            <form onSubmit={formHandler} ref={form}>
            <CustomModal onClose={onClose} show={true} setShow={setShow} fixedStyles={fixedStyles} customStyles={{minWidth: '500px', minHeight: '543px'}}>
                <div className="header_small">Изменение кредитора</div>
                {loading && <Loading size='90' bold='9' addStyles={{padding: '120px'}} />}
                {!loading && <>
                    <div className={styles.buttons}>
                    <Button color='error' onClick={deleteHandler} className={classes.button} variant='contained' > Удалить </Button>
                    <Button color='success' onClick={()=>setShowDefaultCessionChanger(true)} className={classes.cessionButton} variant='contained' >Цессия по умолчанию</Button>
                    </div>
                    <Creditor setAddress={setAddress} defaultRequisites={creditor?.requisite} setBankRequisites={setBankRequisites} setFixedStyles={setFixedStyles} defaultValues={creditor} setIsOrg={setIsOrg} isOrg={isOrg} bankRequisites={bankRequisites} />
                    <div className="margin-bottom_10">
                        <ButtonInForm loading={buttonLoading} />
                    </div>
                    {error.comp()}
                </>}
                {showDefaultCessionChanger && <DefaultCessionChanger cession={creditor.cession} creditorId={creditor.id} setShow={setShowDefaultCessionChanger} />}
            </CustomModal>

            </form>

        </div>
    );
};

export default ChangeCreditor;