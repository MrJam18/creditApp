import React, { useState } from 'react';
import { countDays } from '../../../utils/countDays';
import Changer from '../../dummyComponents/Changer'
import styles from '../../../css/contract.module.css';
import { useSelector } from 'react-redux';
import { chandeDateFormatOnRus } from '../../../utils/changeDateFormat';
import { getContract } from '../../../store/contracts/selectors';
import Toolbar from './Toolbar'
import { getPayments } from '../../../store/contracts/payments/selectors';
import ExecutiveDocChanger from './ExecutiveDocChanger';


const ContractData = ({contractId}) => {
    const contract = useSelector(getContract);
    const debtor = contract.debtor;
    const payments = useSelector(getPayments);
    const [opensStatus, setOpenStatus] = useState(false);
    const [openNumber, setOpenNumber] = useState(false);
    const [openissueDate, setOpenissueDate] = useState(false);
    const [openSumIssue, setOpenSumIssue] = useState(false);
    const [openDueDate, setOpenDueDate] = useState(false);
    const [openPercent, setOpenPercent] = useState(false);
    const [openPenalty, setOpenPenalty] = useState(false);
    const [showExecutiveDocChanger, setShowExecutiveDocChanger] = useState(false);
    const [showDeleteContract, setShowDeletContract] = useState(false);
    const onClickExecutiveDoc = () => {
        setShowExecutiveDocChanger(true);
    }
    return (
        <div className={styles.content}>
            {showExecutiveDocChanger && <ExecutiveDocChanger setShow={setShowExecutiveDocChanger}/>}
                <div className={styles.header_small}>Информация о договоре.</div>
                <Toolbar />
                <div className={styles.content__text}>
                    <div className={styles.content__block}>
                        <span className={styles.content_header}>Должник:</span>  <button className={styles.content__link + ' ' + 'antibutton'} > {`${debtor.surname} ${debtor.name} ${debtor.patronymic}`}
                        </button>
                    </div>
                    <div className={styles.content__block}>
                        <span className={styles.content_header}>Cтатус:</span>  <button className={styles.content__link + ' ' + 'antibutton'} onClick= {(ev)=> setOpenStatus({
                            DBName: 'status', 
                            header: 'Укажите актуальный статус.',
                            defaultValue: ev.target.innerText
                            },
                            )}> {contract.status.name} </button>
                        <Changer contractId = {contractId} data = {opensStatus} setModal = {setOpenStatus}/>
                    </div>
                    <div className={styles.content__block}>
                        <span className={styles.content_header}>Выдавшая организация:</span> <span className={styles.content__link}> <button className={styles.content__button + ' ' + 'antibutton'}> {`${contract.organization.name}`} </button> </span>
                    </div>
                    <div className={styles.content__block}>
                        <span className={styles.content_header}>Договор цессии:</span>  <button className={styles.content__link + ' ' + 'antibutton'}> { contract.cession ? contract.cession.name : 'не заключался'} </button>
                    </div>
                    <div className={styles.content__block}>
                        <span className={styles.content_header}>номер договора: </span> <span className={styles.content__link}><button className={styles.content__button + ' ' + 'antibutton'} onClick= {(ev)=> setOpenNumber({DBName: 'number',
                    header: 'Введите номер договора', 
                    defaultValue: ev.target.innerText})}> {contract.number} </button>
                        </span>
                        <Changer contractId = {contractId} data = {openNumber} setModal = {setOpenNumber}/>
                    </div>
                    <div className={styles.content__block}>
                        <span className={styles.content_header}>дата выдачи: </span><span className={styles.content__link} onClick= {(ev)=> setOpenissueDate({DBName: 'date_issue', header: 'Введите дату выдачи.',
                         defaultValue: ev.currentTarget.querySelector('.antibutton').innerText, type: 'date'})}><button className={styles.content__button + ' ' + 'antibutton'}> {chandeDateFormatOnRus(contract.date_issue)}</button> г.</span> 
                        <Changer contractId = {contractId} data = {openissueDate} setModal = {setOpenissueDate}/>
                    </div>
                    <div className={styles.content__block}>
                        <span className={styles.content_header}>cумма выдачи: </span> <span className={styles.content__link} onClick= {(ev)=> setOpenSumIssue({DBName: 'sum_issue', header: "Введите сумму выдачи.",
                        defaultValue: ev.currentTarget.querySelector('.antibutton').innerText})} >  <button className={styles.content__button + ' ' + 'antibutton'} > {contract.sum_issue} </button> руб.
                        </span>
                        <Changer contractId = {contractId} data = {openSumIssue} setModal = {setOpenSumIssue}/>
                    </div>
                    <div className={styles.content__block}>
                        <span className={styles.content_header}>дата исполнения: </span>
                        <span className={styles.content__link} onClick= {(ev)=> setOpenDueDate({DBName: 'due_date', header: "Введите дату исполнения обязательств.",
                        defaultValue: ev.currentTarget.querySelector('.antibutton').innerText, type: 'date'})} >
                          <button className={styles.content__button + ' ' + 'antibutton'} > {`${chandeDateFormatOnRus(contract.due_date)}`} </button> г.
                        </span>
                        <Changer contractId = {contractId} data = {openDueDate} setModal = {setOpenDueDate}/>
                    </div>
                    <div className={styles.content__block}>
                        <span className={styles.content_header}>дней просрочки: </span>
                          <button className={styles.content__link + ' ' + 'antibutton'}> {`${countDays(contract.due_date)}`} дней </button>
                    </div>
                    <div className={styles.content__block}>
                        <span className={styles.content_header}>осн. долг на сегодня: </span>
                          <button className={styles.content__link + ' ' + 'antibutton'}> {`${contract.mainToday}`} руб. </button>
                    </div>
                    <div className={styles.content__block}>
                        <span className={styles.content_header + ' ' + 'forFirst'}>процентная ставка: </span>
                        <span className={styles.content__link} onClick= {(ev)=>
                            setOpenPercent({DBName: 'percent', header: "Введите проц. ставку в процентах годовых.", defaultValue: ev.currentTarget.querySelector('.antibutton').innerText})} >
                          <button className={styles.content__button + ' ' + 'antibutton'} > {`${contract.percent}`} </button> % годовых
                        </span>
                        <Changer contractId = {contractId} data = {openPercent} setModal = {setOpenPercent}/>
                    </div>
                    <div className={styles.content__block}>
                        <span className={styles.content_header}>проценты на сегодня: </span>  <button className={styles.content__link + ' ' + 'antibutton'}> {`${contract.percentToday}`} руб. </button>
                    </div>
                    <div className={styles.content__block}>
                        <span className={styles.content_header}>неустойка: </span> 
                        <span className={styles.content__link} onClick= {(ev)=> setOpenPenalty({DBName: 'penalty', header: 'Введите неустойку в процентах годовых.', defaultValue: ev.currentTarget.querySelector('.antibutton').innerText})} >
                         <button className={styles.content__button + ' ' + 'antibutton'} > {`${contract.penalty}`} </button> % годовых
                        </span>
                        <Changer contractId = {contractId} data = {openPenalty} setModal = {setOpenPenalty}/>
                    </div>
                    <div className={styles.content__block}>
                        <span className={styles.content_header}>неустойка на сегодня: </span>  <button className={styles.content__link + ' ' + 'antibutton'}> {`${contract.penaltyToday}`} руб. </button>
                    </div>
                    <div className={styles.content__block}>
                        <span className={styles.content_header}>количество платежей: </span>  <button className={styles.content__link + ' ' + 'antibutton'}> {`${payments.length}`}</button>
                    </div>
                    <div className={styles.content__block}>
                        <span className={styles.content_header}>дата создания в базе: </span>  <button className={styles.content__link + ' ' + 'antibutton'}> {`${chandeDateFormatOnRus(contract.createdAt)} г.`}</button>
                    </div>
                    <div className={styles.content__fullBlock}>
                    <span className={styles.content_header}>Суд: </span>  <button className={styles.content__link + ' ' + 'antibutton'}> {contract.court}</button>
                    </div>
                    <div className={styles.content__fullBlock}>
                    <span className={styles.content_header}>Отдел суд. приставов: </span>  <button className={styles.content__link + ' ' + 'antibutton'}> {contract.bailiff}</button>
                    </div>
                    <div className={styles.content__fullBlock}>
                    <span className={styles.content_header}>Исполнительный документ: </span>  <button onClick={onClickExecutiveDoc} className={styles.content__link + ' ' + 'antibutton'}> {contract.executiveDocName}</button>
                    </div>
                </div>
            </div>
    );
};

export default ContractData;