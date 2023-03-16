import {Column} from "../classes/Column";
import api from "../http";

const noChange = true;
const fullWidth = true;

const getContractStatuses = async () => {
    const {data} = await api.get('contracts/getStatuses');
    return data;
}

export const contractColumns = [new Column('Должник', 'debtorName', 'ref', {ref: '/debtors', refColName: 'debtorId'}), new Column('статус', "status", 'selected', {func: getContractStatuses}), new Column('Действующий кредитор', 'creditor', 'text', {noChange, style: 'fullString'}), new Column('первоначальный кредитор', 'firstCreditor', undefined, {noChange, style: 'fullString'}),  new Column('Договор цессии', 'cession', undefined, {noChange}), new Column('Номер договора', "number"), new Column('дата выдачи', 'date_issue', 'date'), new Column("сумма выдачи", 'sum_issue', 'money'), new Column('дата исполнения', 'due_date', 'date'), new Column('Количество дней просрочки', 'delayDays', undefined, {noChange}), new Column('осн. долг на сегодня', 'mainToday', 'money'), new Column('процентная ставка(год.)', 'percent', 'percent'), new Column('проценты на сегодня', 'percentToday', 'money', {noChange}), new Column('неустойка(год.)', 'penalty', 'percent' ), new Column('неустойка на сегодня', 'penaltyToday', 'money', {noChange}), new Column('Количество платежей', 'paymentsCount', 'text', {noChange}), new Column('Дата создания договора', 'createdAt', 'date', {noChange}), new Column('Исполнительный документ', 'executiveDocName', 'setter')];