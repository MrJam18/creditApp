import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from "../css/addContract.module.css";
import {InputLabel, MenuItem, Select} from "@mui/material";
import EasyInput from "./dummyComponents/EasyInput";
import EasySearch from "./dummyComponents/search/EasySearch";
import {contractsSelectors} from "../store/contracts/selectors";
import {useError} from "../hooks/useError";
import {makeStyles} from "@mui/styles";
import {cessionsSlice} from "../store/cessions/reducer";
import {organizationsSlice} from "../store/creditors/reducer";
import {recieveStatuses} from "../store/contracts/actions";
import EasySelect from "./dummyComponents/EasySelect";
import ButtonInForm from "./dummyComponents/ButtonInForm";
import CustomModal from "./dummyComponents/CustomModal";
import {AddContractController} from "../controllers/AddContractController";
import {capitalizeFirstLetter} from "../utils/text/capitalize";

const cessionsActions = cessionsSlice.actions;
const defaultCession = {name: 'Принадлежит выдавшей организации', id: null};

export const useStyles = makeStyles({
    input: {
        marginBottom: '10px',
        width: '45%'
    },
    checkbox: {
        width: '160px',
        lineHeight: 1.2,
        marginLeft: '55px'
    },
    smallInput: {
        width: '225px',
    },
    button: {
        width: '50%',
        height: '35px',
    },
    selectLabel: {
        alignSelf: 'baseline',
        fontSize: '12px',
        lineHeight: '16.2px'
    },
    fullWidthLabel: {
        color: 'black',
        lineHeight: '16.2px',
        marginBottom: '5px'
    },
    input_small: {
        width: '150px',
        marginBottom: '10px'
    },
    button_small: {
        width: '100%'
    }

});

const AddContract = ({debtorId, setShow}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [contractType, setContractType] = useState('1');
    const contractName = useRef();
    const formRef = useRef();
    const statuses = useSelector(contractsSelectors.getStatuses);
    const error = useError();
    const [loading, setLoading] = useState();
    const [cession, setCession] = useState(defaultCession);
    const [creditor, setCreditor] = useState();
    const [statusId, setStatusId] = useState('1');

    const contractTypeHandler = ev => {
        setContractType(ev.target.value);
        if (ev.target.value === '1') contractName.current.value = 'договор займа'
        else contractName.current.value = 'кредитный договор'
    }

    const startHandler = () => {
        error.noError();
        dispatch(organizationsSlice.actions.setSearchList([]));
        dispatch(cessionsActions.setSearchList([]));
        dispatch(recieveStatuses());
    }
    const formHandler = async(ev)=> {
        ev.preventDefault();
        const data = {
            cessionId: cession?.id, creditorId: creditor?.id, statusId, debtorId
        }
        const controller = new AddContractController(error.setError, setLoading, setShow, data, formRef);
        await controller.handle();
    }
    useEffect(startHandler, []);
    useEffect(()=> {
        if(creditor?.cession) {
            setCession(creditor.cession);
        }
        else setCession(defaultCession);
    }, [creditor]);

 return (
     <CustomModal customStyles={{width: '500px'}} setShow={setShow} show >
         <form ref={formRef}  onSubmit={formHandler}>
             <div>
                 <div className={styles.header + ' ' + 'marginTop_0'}>Данные о договоре</div>
                 <div className={styles.contractData}>
                     <div className={styles.selectBlock + ' ' + classes.input }>
                         <InputLabel id="contractType" required className={classes.selectLabel}>тип договора</InputLabel>
                         <Select fullWidth variant='standard' labelId="contractType"
                                 value={contractType}
                                 name= 'typeId'
                                 onChange= {contractTypeHandler}
                         >
                             <MenuItem value='1'>договор займа</MenuItem>
                             <MenuItem value='2'>кредитный договор</MenuItem>
                         </Select>
                     </div>
                     <EasyInput label='название договора'   name='name' defaultValue={contractType === '1' ? 'договор займа' : 'кредитный договор'} ref={contractName} required className={classes.input} />
                     <EasyInput label='Номер договора'   name='number' required className={classes.input}/>
                     <EasyInput label='Дата выдачи'  type='date' pattern='lessThenNow' name='date_issue'  required className={classes.input} />
                     <EasyInput label='сумма выдачи'  name='sum_issue' pattern='float' required className={classes.input} />
                     <EasyInput label='дата исполнения' type='date' name='due_date' pattern='lessThenNow' required className={classes.input} />
                     <EasyInput label='проц. ставка (% год.)'   name='percent' pattern='float' required className={classes.input} />
                     <EasyInput label='неустойка (% год.)' name='penalty' pattern='float' required className={classes.input} />
                 </div>
                 <div className={styles.selectMargin}>
                     <EasySearch label='кредитор, которому принадлежит заем' value={creditor} getValue='cession' required serverAddress={'creditors/getSearchWithCessions'} setValue={setCreditor} />
                 </div>
                 <div className={styles.selectMargin}>
                     <EasySearch label='договор цессии, по которому приобретен займ' value={cession}  required serverAddress={'cessions/getNameList'} setValue={setCession} />
                 </div>
                 <div className={'center'}>
                     <EasySelect defaultValue={'1'} variants={statuses} key={statuses.id} onChange={ (id)=> setStatusId(id)} label='Статус' style={{width: '45%'}}/>
                 </div>
             </div>
             <ButtonInForm loading={loading} />
             {error.comp()}
         </form>
     </CustomModal>
 );
};

export default AddContract;