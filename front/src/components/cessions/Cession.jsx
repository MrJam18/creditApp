import React, {useRef, useState} from 'react';
import EasyInput from "../dummyComponents/EasyInput";
import CustomCheckBox from "../dummyComponents/CustomCheckBox";
import {makeStyles} from "@mui/styles";
import {smallInput} from '../../constants/css';
import EasySearch from 'components/dummyComponents/EasySearch';
import CustomChips from "../dummyComponents/customChips/CustomChips";
import {TextField} from "@mui/material";
import {getDefaultCessionText} from "../../utils/getDefaultCessionText";
import {formDataConverter} from "../../utils/formDataConverter";
import {useDispatch, useSelector} from "react-redux";
import {setCessionChanges} from "../../store/cessions/actions";
import {cessionsSelector} from "../../store/cessions/selectors";
import {cessionsSlice} from "../../store/cessions/reducer";

const actions = cessionsSlice.actions;

const useStyles = makeStyles({
    smallInput
})

const Cession = ({data = {}}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const textRef = useRef();
    const formRef = useRef();
    const cessionId = useSelector(cessionsSelector.selectInfoCessionId);
    const activeCession = useSelector(cessionsSelector.selectActiveCession);
    const [useDefaultText, setUseDefaultText] = useState(data.useDefaultText || true);
    const [assignee, setAssignee] = useState(false);
    const [assignor, setAssignor] = useState(false);
    const [enclosures, setEnclosures] = useState(data.enclosures || []);
    const handleNext = () => {
        dispatch(actions.setActiveCession(activeCession + 1))
    };
    const handleBack = () => {
        dispatch(actions.setActiveCession(activeCession - 1))
    };
    const onChangeDefaultCheckBox = () => {
        const form = formRef.current.elements;
        textRef.current.value = getDefaultCessionText(form.number.value, form.transferDate.value, assignee, assignor);
    }
    const formSubmitHandler = async (ev) => {
        ev.preventDefault();
        const data = formDataConverter(formRef);
        if(enclosures.length === 0) return dispatch(actions.setInfoError('Цессия должна иметь хотябы один подтверждающий документ!'));
        dispatch(setCessionChanges(data, assignee, assignor, enclosures, useDefaultText, activeCession, cessionId));
        switch(ev.nativeEvent.submitter.name){
            case('prev'):
                handleBack();
                break;
            case('next'):
                handleNext();
                break;
            case('add'):
                dispatch(actions.pushInfoRow());
                break;
            default:
                dispatch(actions.setLastInfo());
                dispatch(actions.setInfoShowConfirm(true));
        }
    }
    return (
        <div>
            <form onSubmit={formSubmitHandler} ref={formRef} id='cessionData'>
            <div className="small-inputs-box">
                <EasyInput autoFocus label='дата цессии' className={classes.smallInput} defaultValue={data.transferDate} type='date' name='transferDate' pattern='lessThenNow' required />
                <EasyInput label='Номер цессии' className={classes.smallInput} defaultValue={data.number} name='number' />
            </div>
            <div className="full-width-box">
                <EasySearch label={'Цедент'} required defaultValue={data.assignee}  serverAddress='organizations/getNameListForCessions' getValue='short' setValue={setAssignee} />
            </div>
            <div className="full-width-box">
               <EasySearch label='Цессионарий' required defaultValue={data.assignor} serverAddress='organizations/getNameListForCessions' getValue='short' setValue={setAssignor} />
            </div>
            <div className='full-width-box'>
                <CustomChips header='Подтверждающие документы' list={enclosures} setList={setEnclosures} addHeader='Введите название документа' />
            </div>
            <div className="small-inputs-box">
            <EasyInput label='Сумма цессии' defaultValue={data.sum} className={classes.smallInput} pattern='float'  name='sum' />
            <CustomCheckBox label='текст по умолчанию' className={classes.smallInput} onChange={onChangeDefaultCheckBox} checked={useDefaultText} setChecked={setUseDefaultText} />
            </div>
            <div className="full-width-box">
                <TextField inputRef={textRef} multiline maxRows={10} fullWidth name='text' disabled={useDefaultText} defaultValue={data.text} />
            </div>
            </form>
        </div>
    );
};

export default Cession;