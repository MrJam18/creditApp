// import React, {useEffect, useState} from 'react';
// import styles from 'D:/CreditApp/front/src/css/debtorInfo.module.css';
// import ChangerUI from "../dummyComponents/Columns/ChangerUI";
// import {useDispatch, useSelector} from "react-redux";
// import {prepareDataForColWrapper} from '../../utils/prepareForColumnWrapper'
// import {changeDebtorColumn} from "../../store/debtors/actions";
// import {useParams} from "react-router";
// let changedData;
//
// const ColumnsWrapper = ({column, object, tableName}) => {
//     const [data, setData] = useState([]);
//     const id = object.id;
//     const {debtorId} = useParams();
//     const dispatch = useDispatch();
//     const [showChanger, setShowChanger] = useState(false);
//     const changeColumnHandler = (ev) => {
//         const dataIndex = ev.currentTarget.getAttribute('data-index');
//         changedData = data[dataIndex];
//         if(changedData.type === 'noChange') return;
//         setShowChanger(true);
//     }
//     const sendReqForChangeData = async (data) => {
//        await dispatch(await changeDebtorColumn(data, tableName, debtorId));
//     }
//         useEffect(async ()=> {
//             let data = [];
//             if(column.type === 'composed') {
//                 column.options.forEach((el)=> {
//                     const element = prepareDataForColWrapper(el, object);
//                     data.push(element);
//                 })
//             }
//             else {
//                 const element = prepareDataForColWrapper(column, object);
//                 data.push(element);
//             }
//             if(column.type === 'selected'){
//                 data[0].select = await data[0].options();
//                 delete data[0].options;
//             }
//             setData(data);
//         }, []);
//     if(column.fullWidth) return(
//         <div key={column.colName} className={ styles.content__fullBlock }>
//             <div className={ styles.content__blockHeader + ' ' +  styles.content__blockHeader_center}>{column.name}: </div>
//             <div className={styles.content__fullWidthWrapper}>
//                 {data.map((el, index)=> <div className={ styles.content__link  + ' ' + 'antibutton'} onClick={changeColumnHandler} data-index={index}>{el.show}</div> )}
//             </div>
//             {showChanger && <ChangerUI data={changedData} id={id} setModal={setShowChanger} setReqData={sendReqForChangeData}/>}
//         </div>
//     )
//     return (
//             <div key={column.colName} className={ styles.content__block}>
//                 <span className={ styles.content__blockHeader }>{column.name}: </span>
//                 {data.map((el, index)=> <button className={ styles.content__link  + ' ' + 'antibutton' } onClick={changeColumnHandler} data-index={index}>{el.show}</button> )}
//                 {showChanger && <ChangerUI data={changedData} id={id} setReqData={sendReqForChangeData} setModal={setShowChanger} />}
//             </div>
//     );
// };
//
// export default ColumnsWrapper;