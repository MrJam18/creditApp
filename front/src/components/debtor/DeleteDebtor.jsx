import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Warning from "../dummyComponents/Warning";
import {useDispatch} from "react-redux";
import {deleteDebtor} from "../../store/debtors/actions";
import {useParams} from "react-router";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate} from "react-router";

const DeleteDebtorView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {debtorId} = useParams();
    const icon = () => <DeleteForeverIcon sx={{fontSize: '30px'}} />
    const onSubmit = async () => {
        dispatch(deleteDebtor(debtorId));
        navigate('../../list');
    }
    const toolWindow = ({setShow}) => <Warning text={'Вы действительно хотите удалить должника? Все договора должника также будут удалены! Отменить это действие будет невозможно'} onSubmit={onSubmit} setShow={setShow} />
    return {icon, toolWindow}
};

export default DeleteDebtorView;