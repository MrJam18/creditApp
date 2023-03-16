import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {recieveCessionInfo, sendCessionChanges} from "../../store/cessions/actions";
import {cessionsSelector} from "../../store/cessions/selectors";
import {cessionsSlice} from "../../store/cessions/reducer";
import ChangerUI from "./UI/ChangerUI";

const actions = cessionsSlice.actions;

const CessionChanger = ({ header }) => {
    const dispatch = useDispatch();
    const cessionId = useSelector(cessionsSelector.selectInfoCessionId);
    const info = useSelector(cessionsSelector.getInfo);
    const error = useSelector(cessionsSelector.selectInfoError);
    const activeCession = useSelector(cessionsSelector.selectActiveCession);
    const forceUpdate = useSelector(cessionsSelector.forceUpdate);
    useEffect(async ()=> {
       await dispatch(recieveCessionInfo(cessionId));
       return () => {
            dispatch(actions.setInfoDefault());
        }
    }, []);
    const setShow = (show) => {
        dispatch(actions.setInfoShow(show));
    }
    const onSubmit = async (name, defaultCession) => {
        await dispatch(sendCessionChanges(name, defaultCession));
    }
    return (
        <ChangerUI activeCession={activeCession} info={info} error={error} onSubmit={onSubmit} showDeleteGroup setShow={setShow} cessionName={header} header={'Изменение группы цессий'} forceUpdate={forceUpdate} />
    );
};

export default CessionChanger;