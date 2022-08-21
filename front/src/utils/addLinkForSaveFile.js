import { serverInsideStaticContractsAddress } from './serverApi';
import downloadIcon from '../img/doc.png';
import styles from '../css/start.module.css'
const regExp = new RegExp(`^${serverInsideStaticContractsAddress}`)


export const addLinksForSaveFile = (rows, onClick) => {
    let completeRows = [];
    rows.forEach((el)=> {
        let row = {...el}
        if (regExp.test(el.result)) row.result =  <button onClick={onClick} data-id= {el.id} data-object={el.actionObject.name} data-path={el.result} className={'antibutton'+ ' ' + styles.actions__downloadButton}>
            <img src={downloadIcon} className={styles.downloadIcon} alt="download" />
        </button>
        completeRows.push(row);
        })
        return completeRows;
}