const getFullAddress = require("../../utils/getFullAddress");
const { Head, Header, Indent, HeaderWithoutBreaks, Text, Signature } = require("./docxClasses");
const {incline} = require('lvovich');
const { changeDateFormat } = require("../../utils/dates/changeDateFormat");
const { Document } = require("docx");
const getFullName = require("../../utils/getFullName");

module.exports = async function courtReqForIDDoc (contract) {
    const creditor = contract.organization;
    const court = contract.court;
    const debtor = contract.debtor;
    creditor.fullAddress = await getFullAddress(creditor.get({plain: true}));
    court.fullAddress = await getFullAddress(court.get({plain: true}));
    debtor.fullAddress = await getFullAddress(debtor.get({plain: true}));
    debtor.fullName = getFullName(debtor);
    const genitiveDebtor = incline({first: debtor.name, last: debtor.surname, middle: debtor.patronymic}, 'genitive');
    const document = {
        children: [
            new Head(`В ${court.name}`),
            new Head("Адрес:"),
            new Head(court.fullAddress),
            new Head("Взыскатель:"),
            new Head(creditor.name),
            new Head('Адрес:'),
            new Head(creditor.fullAddress),
            new Head(`ИНН ${creditor.INN}, КПП ${creditor.KPP}`),
            new Head(`Банковские реквизиты:`),
            new Head(`${creditor.requisits}`),
            new Head('Должник:'),
            new Head(debtor.fullName),
            new Head('Адрес:'),
            new Head(debtor.fullAddress),
            new Head(`Дата рождения: ${changeDateFormat(debtor.birth_date)} г.`),
            new Head('Место рождения:'),
            new Head(debtor.birth_place),
            new Header('Запрос исполнительного документа.'),
            new Indent(`${changeDateFormat(contract.statusChanged)} г. в ${court.name} было подано заявление о выдаче судебного приказа о взыскании задолженности по договору займа с ${ genitiveDebtor.last} ${genitiveDebtor.first} ${genitiveDebtor.middle} в пользу ${creditor.name}.`),
            new Indent(`До настоящего времени никакого определения или судебного приказа по вышеуказанному заявлению получено взыскателем не было.`),
            new Indent(`На основании изложенного, руководствуясь ст. 35 ГПК РФ,`),
            new HeaderWithoutBreaks(`Прошу:`),
            new Text(`1. Выдать определение или судебный приказ, вынесенный на основании заявления о выдаче судебного приказа о взыскании задолженности по договору займа с ${ genitiveDebtor.last} ${genitiveDebtor.first} ${genitiveDebtor.middle} в пользу ${creditor.name}.`),
            new Text(`2. Данное определение или судебный приказ направить почтой по адресу взыскателя: ${creditor.fullAddress}`),
            new Signature('Мамедов Д. Р.')
        ]
    }
    const doc = new Document({
        creator: 'creditApp',
        sections: [document]
    });
    return doc;
}