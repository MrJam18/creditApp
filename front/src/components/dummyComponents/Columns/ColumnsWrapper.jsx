import React, {useEffect, useState} from "react";
import {prepareDataForColWrapper} from "../../../utils/prepareForColumnWrapper";
import styles from "*/columnsWrapper.module.css";
import Changer from "./Changer";
import {useNavigate} from "react-router";

let changedData;

const ColumnsWrapper = ({column, data, reqFunction}) => {
    const [elements, setElements] = useState([]);
    const [showChanger, setShowChanger] = useState(false);
    let navigate = useNavigate();
    const clickColumnHandler = (ev) => {
        const dataIndex = ev.currentTarget.getAttribute('data-index');
        changedData = elements[dataIndex];
        if(changedData.noChange) return;
        if(changedData.type === 'ref') return navigate(changedData.ref);
        if(changedData.type === 'setter') return changedData.setter();
        setShowChanger(true);
    }
    useEffect(async ()=> {
        let elements = [];
        if(column.type === 'composed') {
            column.elements.forEach((el)=> {
                const element = prepareDataForColWrapper(el, data[el.colName]);
                elements.push(element);
            })
        }
        else {
            const element = prepareDataForColWrapper(column, data);
            elements.push(element);
        }
        if(column.type === 'selected'){
            elements[0].select = await elements[0].func();
            delete elements[0].func;
        }
        setElements(elements);
    }, [column, data]);
    if(column.style === 'fullWidth') return(
        <div key={column.colName} className={ styles.fullBlock }>
            <div className={ styles.blockHeader + ' ' +  styles.blockHeader_center}>{column.name}: </div>
            <div className={styles.fullWidthWrapper}>
                {elements.map((el, index)=> <div key={index} className={ styles.link  + ' ' + 'antibutton'} onClick={clickColumnHandler} data-index={index}>{el.show}</div> )}
            </div>
            {showChanger && <Changer data={changedData} setModal={setShowChanger} setReqData={reqFunction}/>}
        </div>
    )
    return (
        <div key={column.colName} className={ column.style ==='fullString' ? styles.fullBlock : styles.block }>
            <span className={ styles.blockHeader }>{column.name}: </span>
            {elements.map((el, index)=> <button key={index} className={ styles.link  + ' ' + 'antibutton' } onClick={clickColumnHandler} data-index={index}>{el.show}</button> )}
            {showChanger && <Changer data={changedData} setReqData={reqFunction} setModal={setShowChanger} />}
        </div>
    );
};

export default ColumnsWrapper;