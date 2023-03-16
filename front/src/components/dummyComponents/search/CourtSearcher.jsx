import React, {useEffect} from 'react';
import CustomSearch from "./CustomSearch";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import styles from '*/dummySearch.module.css';
import {makeStyles} from "@mui/styles";
import {useDispatch, useSelector} from "react-redux";
import {getCourtsList} from "../../../store/courts/selectors";
import {clearCourtsList, findCourtsByName} from "../../../store/courts/actions";
import useModal from "../../../hooks/useModal";
import CourtCreator from "../../contract/contractData/CourtCreator";

const useStyles = makeStyles({
    icon: {
        width: '35px',
        height: '50px',
        fontSize: '5px'
    },
})

const CourtSearcher = ({setCourt}) => {
    const classes = useStyles();
    const courtsList = useSelector(getCourtsList);
    const dispatch = useDispatch();
    const onChangeCourtInput = (value) => {
        dispatch(findCourtsByName(value));
    }
    const courtCreator = useModal();
    const onChooseCourt = value =>{
        setCourt(value);
    }
    const changeShowCourtCreator = () =>{
        courtCreator.setShow(true);
    }
    useEffect(()=> {
        return () => {
        dispatch(clearCourtsList());
        }
    }, [])
    return (
        <div className={styles.main}>
            <CustomSearch label={"Название суда"} onSearch={onChangeCourtInput} results={courtsList} onClick={onChooseCourt} /> <button type='button' className='antibutton' onClick={changeShowCourtCreator}><AddOutlinedIcon fontSize='small' className={classes.icon} /> </button>
            {courtCreator.show && <CourtCreator show={courtCreator.show} setShow={courtCreator.setShow} />}
        </div>
    );
};

export default CourtSearcher;