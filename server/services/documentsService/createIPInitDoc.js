const { Document } = require("docx");
const { Courts, Debtors, Organizations, Agents, Bailiffs } = require("../../models/connections");
const getFullAddressWithoutInclude = require("../../utils/adress/getFullAddressWithoutInclude");
const getFullName = require("../../utils/getFullName");
const {incline} = require('lvovich');
const { changeDateFormat } = require("../../utils/dates/changeDateFormat");
const getSurnameAndInititals = require("../../utils/getSurnameAndInititals");
const { BigHead, BigHeader, BigIndent, BigText, BigBoldWithTopBreak, BigSignature } = require("./classes/docxClassesBig");

module.exports = async function(contract, bailiffId, agentId, executiveDoc ) {
    const agent = await Agents.findByPk(agentId, {plain: true});
    const bailiff = await Bailiffs.findByPk(bailiffId, {plain: true});
    const creditor = await Organizations.findByPk(contract.organizationId, { plain: true });
    const debtor = await Debtors.findByPk(contract.debtorId, {attributes: ['surname', 'name', 'patronymic'], plain: true});
    const court = await Courts.findByPk(contract.courtId, { attributes: ['name'], plain: true});
    creditor.fullAddress = await getFullAddressWithoutInclude(creditor);
    agent.fullAddress = await getFullAddressWithoutInclude(agent);
    bailiff.fullAddress = await getFullAddressWithoutInclude(bailiff);
    agent.fullName = getFullName(agent);
    debtor.fullName = getFullName(debtor);
    executiveDoc.dateIssue = changeDateFormat(executiveDoc.dateIssue);
    executiveDoc.resolutionDate = executiveDoc.typeId == 2 ? changeDateFormat(executiveDoc.resolutionDate) : null;
    const genitiveDebtor = incline({first: debtor.name, last: debtor.surname, middle: debtor.patronymic}, 'genitive');
    const executiveDocType = executiveDoc.typeId == 1 ? 'Судебный приказ' : 'Исполнительный лист';
    const document = new Document({
        creator: 'creditApp',
        sections: [{
            children: [
                new BigHead(`В ${bailiff.name}`),
                new BigHead('Адрес:'),
                new BigHead(bailiff.fullAddress),
                new BigHead("Взыскатель:"),
                new BigHead(creditor.name),
                new BigHead('Адрес:'),
                new BigHead(creditor.fullAddress),
                new BigHead(`ИНН ${creditor.INN}, КПП ${creditor.KPP}`),
                new BigHead('Представитель:'),
                new BigHead(agent.fullName),
                new BigHead('Адрес:'),
                new BigHead(agent.fullAddress),
                new BigHeader('Заявление о возбуждении исполнительного производства.'),
                new BigIndent(`Прошу принять ${executiveDocType}${court && `, выданный судом: ${court.name}`}${executiveDoc.typeId == 2 ? ` по решению №${executiveDoc.resolutionNumber} от ${executiveDoc.resolutionDate} г.`: ''} по гражданскому делу №${executiveDoc.number} от ${executiveDoc.dateIssue} г. о взыскании задолженности с ${genitiveDebtor.last} ${genitiveDebtor.first} ${genitiveDebtor.middle} в пользу ${creditor.name} по договору займа в общем размере ${executiveDoc.sum} руб. Из них:`),
                new BigText(`${executiveDoc.main} руб. - Основной долг.`),
                new BigText(`${executiveDoc.percents} руб. - Проценты за пользование займом.`),
                new BigText(`${executiveDoc.penalties} руб. - Неустойка за просрочку исполнения обязательств.`),
                new BigText(`${executiveDoc.fee} руб. - Уплаченная в суд госпошлина.`),
                new BigIndent('Информация о должнике указана в исполнительном документе.'),
                new BigIndent('Взысканные денежные средства прошу перечислить на следующие реквизиты:'),
                new BigText(creditor.requisits),
                new BigIndent('Прошу направить постановление о возбуждении исполнительного производства заказным письмом с уведомлением о вручении согласно п. 4.8.3.4 приказа от 10 декабря 2010 г. N 682 «ОБ УТВЕРЖДЕНИИ ИНСТРУКЦИИ ПО ДЕЛОПРОИЗВОДСТВУ В ФЕДЕРАЛЬНОЙ СЛУЖБЕ СУДЕБНЫХ ПРИСТАВОВ».'),
                new BigIndent('В случае истечения срока добровольного исполнения требований, указанных в постановлении о возбуждении исполнительного производства, прошу установить временное ограничение на выезд из РФ в отношении должника.'),
                new BigBoldWithTopBreak('Приложение:'),
                new BigText(`- ${executiveDocType} №${executiveDoc.number} от ${executiveDoc.dateIssue} г.`),
                new BigText(`- ${agent.document}`),
                new BigSignature(getSurnameAndInititals(agent))
            ]
        }]
    })
    return document;
}