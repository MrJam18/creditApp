import React from 'react';
import CreateBailiff from "../../contract/contractData/CreateBailiff";
import CustomSearch from "../CustomSearch";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import styles from '*/dummySearch.module.css';
import useModal from "../../../hooks/useModal";
import {useDispatch, useSelector} from "react-redux";
import {getBailiffsSearchList} from "../../../store/bailiffs/selectors";
import {recieveBailiffsSearchList} from "../../../store/bailiffs/actions";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    icon: {
        width: '35px',
        height: '50px',
        fontSize: '5px'
    },
})

const BailiffSearcher = ({setBailiff, setError}) => {
    const classes = useStyles();
    const createBailiff = useModal();
    const bailiffs = useSelector(getBailiffsSearchList);
    const dispatch = useDispatch();
    const onSearch = async (searchString) => {
        try{
            await dispatch(recieveBailiffsSearchList(searchString))
        }
        catch(e){
            setError(e.message)
        }
    }
    const onChoose = (val) => {
        setBailiff(val);
    }
    const onClickCreateBailiff = () => {
        createBailiff.setShowTrue();
    }

    return (
        <div className={styles.main}>
                <CustomSearch results={bailiffs} onSearch={onSearch} onClick={onChoose} label='Отдел судебных приставов-исполнителей *' customStyles={{width: '100%'}} />
                <button className='antibutton antipadding' type='button' onClick={onClickCreateBailiff} ><AddOutlinedIcon fontSize='small' className={classes.icon} /> </button>
                {createBailiff.show && <CreateBailiff setShow={createBailiff.setShow} /> }
        </div>
    );
};

export default BailiffSearcher;