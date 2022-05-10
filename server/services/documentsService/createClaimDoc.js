const { Document } = require('docx');
const { changeDateFormat } = require('../../utils/dates/changeDateFormat');
const { countFeeClaim } = require('../../utils/countMoney/countFee');
const countDays = require('../../utils/dates/countDays');
const getFullName = require('../../utils/getFullName');
const {incline} = require('lvovich');
const {Head, Header, HeaderWithoutBreaks, Indent, Text, BoldWithTopBreak, Signature} = require('./docxClasses');
const { Courts, Agents } = require('../../models/models');
const getFullAddress = require('../../utils/getFullAddress');
const countAllWithPayments = require('../../utils/countMoney/countAllWithPayments');
const {countingTables} = require('./countingTable');
const countAllWithPaymentsIgnorePayments = require('../../utils/countMoney/countAllWithPaymentsIgnorePayments');
const getFullAddressWithoutInclude = require('../../utils/adress/getFullAddressWithoutInclude');
const getSurnameAndInititals = require('../../utils/getSurnameAndInititals');
const getTextFromCessions = require('./getTextFromCessions');


module.exports = async function (courtId, contract, date, isContractJur, ignorePayments, agentId) {
    let court = await Courts.findByPk(courtId,{ include: {all: true}});
    court = court.get({plain: true});
    court.fullAddress = await getFullAddress(court);
    const {firstCreditorName, cessionText, cessionDocuments} = await getTextFromCessions(contract.cession, contract.organization.name);
    const agent = await Agents.findByPk(agentId, {plain: true});
    agent.fullAddress = await getFullAddressWithoutInclude(agent);
    agent.fullName = getFullName(agent);
    agent.surnameAndInitials = getSurnameAndInititals(agent);
    let debtor = contract.debtor.get({plain: true});
    debtor.fullAddress = await getFullAddress(debtor);
    let creditor = contract.organization.get({plain:true});
    creditor.fullAddress = await getFullAddress(creditor);
    let result
    if(ignorePayments) result = countAllWithPaymentsIgnorePayments(contract.percent, contract.penalty, contract.sum_issue, contract.date_issue, date, contract.payments, contract.due_date);
    else result = countAllWithPayments(contract.percent, contract.penalty, contract.sum_issue, contract.date_issue, date, contract.payments, contract.due_date);
    const genitiveDebtor = incline({first: debtor.name, last: debtor.surname, middle: debtor.patronymic}, 'genitive');
    const breaks = result.breaks;
    result.fee = countFeeClaim(result.sum);
    result.loanDays = countDays(contract.date_issue, contract.due_date);
    if(result.loanDays > 31) result.loanDaysName = 'дня'
    else if(result.loanDays === 31) result.loanDaysName = 'день'
    else result.loanDaysName = 'дней'
    debtor.fullName = getFullName(debtor);
    date = changeDateFormat(date);
    const issuedDate = changeDateFormat(contract.date_issue);
    const content = {
        children: [
            new Head(`В ${court.name}`),
            new Head('Адрес:'),
            new Head(court.fullAddress),
            new Head("Истец:"),
            new Head(creditor.name),
            new Head('Адрес:'),
            new Head(creditor.fullAddress),
            new Head(`ИНН ${creditor.INN}, КПП ${creditor.KPP}`),
            new Head(`Банковские реквизиты:`),
            new Head(`${creditor.requisits}`),
            new Head('Представитель:'),
            new Head(agent.fullName),
            new Head('Адрес:'),
            new Head(agent.fullAddress),
            new Head('Ответчик:'),
            new Head(debtor.fullName),
            new Head('Адрес:'),
            new Head(debtor.fullAddress),
            new Head(`Дата рождения: ${changeDateFormat(debtor.birth_date)} г.`),
            new Head('Место рождения:'),
            new Head(debtor.birth_place),
            new Head(`Паспорт: Серия ${debtor.passport.series} № ${debtor.passport.number}`),
            new Head(`Цена иска: ${result.sum} руб.`),
            new Head(`Госпошлина: ${result.fee} руб.`),
            new Header('Исковое заявление о взыскании задолженности.'),
            new Indent(`${issuedDate} г. ${firstCreditorName} (далее - "Истец") и ${debtor.fullName} (далее - "Ответчик") заключили договор займа № ${contract.number} (далее - "Договор"). В соответствии с условиями договора истец передал ответчику денежную сумму в размере ${contract.sum_issue} рублей сроком на ${result.loanDays} ${result.loanDaysName}, а ответчик обязался возвратить такую же сумму денег и уплатить проценты в размере ${contract.percent} % годовых от суммы займа.
            `),
            new Indent(`${issuedDate} г. ответчик денежную сумму по договору получил, что подтверждается расходным кассовым ордером.`),
            new Indent(`До настоящего времени сумма займа не оплачена. Этим ответчик нарушил обязанность возвратить сумму займа до ${changeDateFormat(contract.due_date)} г., предусмотренную условиями договора.`),
            new Indent(`Также, согласно условиям договора “за неисполнение или ненадлежащее исполнение заемщиком обязательства по возврату займа и уплате процентов на сумму займа начисляется неустойка в размере ${contract.penalty} % процентов годовых от суммы неисполненного обязательства за каждый день просрочки с даты, следующей за датой наступления исполнения обязательства, установленной договором займа, по дату погашения просроченной задолженности`),
            new Indent(`Так, по п.1 ст. 330 ГК РФ "Неустойкой (штрафом, пеней) признается определенная законом или договором денежная сумма, которую должник обязан уплатить кредитору в случае неисполнения или ненадлежащего исполнения обязательства, в частности в случае просрочки исполнения. По требованию об уплате неустойки кредитор не обязан доказывать причинение ему убытков."`),
            new Indent(`На ${date} г. сумма задолженности по договору${!ignorePayments ? ', с учетом ограничений размера процентов и неустойки, установленных Федеральным законом от 27.12.2018 г. № 554-ФЗ и ст. 12.1 Федерального закона от 02.07.2010 N 151-ФЗ,' : ''} составляет:`),
            new Indent(`Основной долг: ${result.main} руб.`),
            new Indent(`Проценты по договору: ${result.percents} руб.`),
            new Indent(`Неустойка по договору: ${result.penalties} руб.`),
            new Indent(`В соответствии со ст. 309 ГК РФ, обязательства должны исполняться надлежащим образом в соответствии с условиями обязательства, односторонний отказ от исполнения обязательства не допускается (ст.310 ГК РФ), исполнение обязательства должно производится в сроки, установленные договором (ст. 314 ГК РФ).`),
            new Indent(`Согласно ст. 807 ГК РФ по договору займа одна сторона (займодавец) передает в собственность другой стороне (заемщику) деньги или другие вещи, определенные родовыми признаками, а заемщик обязуется возвратить займодавцу такую же сумму денег (сумму займа) или равное количество других полученных им вещей того же рода и качества. Договор займа считается заключенным с момента передачи денег или других вещей.`),
            new Indent(`Статья 810 ГК РФ предусматривает, что заемщик обязан возвратить займодавцу полученную сумму займа в срок и в порядке, которые предусмотрены договором займа.`),
            new Indent(`В соответствии со ст. 809 ГК РФ:`),
            new Text(`"1. Если иное не предусмотрено законом или договором займа, займодавец имеет право на получение с заемщика процентов на сумму займа в размерах и в порядке, определенных договором.`),
            new Text(`2. При отсутствии иного соглашения проценты выплачиваются ежемесячно до дня возврата суммы займа»."`),
            isContractJur && new Indent(`В соответствии с п. 1.17 Договора займа спор подлежит рассмотрению в суде: ${court.name}.`),
            ...cessionText,
            new Indent(`На основании изложенного, руководствуясь ст.131-132 ГПК РФ,`),
            new HeaderWithoutBreaks(`Прошу:`),
            new Text(`1.  Взыскать с ${genitiveDebtor.last} ${genitiveDebtor.first} ${genitiveDebtor.middle} в пользу ${creditor.name} задолженность на ${date} г. по договору займа № ${contract.number} от ${issuedDate} г. в сумме ${result.sum} руб., в том числе:`),
            new Text(`1.1.  Основной долг в размере ${result.main} руб.`),
            new Text(`1.2.  Проценты за пользование займом в размере ${result.limitedPercents} руб.`),
            new Text(`1.3.  Неустойка за просрочку исполнения обязательств в размере ${result.penalties} руб.`),
            new Text(`2.  Взыскать с ${genitiveDebtor.last} ${genitiveDebtor.first} ${genitiveDebtor.middle} в пользу ${creditor.name} расходы по уплате государственной пошлины в размере ${result.fee} руб.`),
            new BoldWithTopBreak('Приложение:'),
            new Text('Квитанция об оплате госпошлины;'),
            new Text(`Расчет исковых требований;`),
            new Text(`Договор займа № ${contract.number} от ${issuedDate} г.;`),
            new Text(`Расходный кассовый ордер;`),
            new Text(agent.document),
            ...cessionDocuments,
            new Signature(agent.surnameAndInitials)
        ]
    }
    if (result.limitedText) {
        content.children.splice(27, 0, ...result.limitedText);
    }
    const doc = new Document({
        creator: 'creditApp',
        sections: [content, countingTables(contract, breaks, agent.surnameAndInitials)]
    })
    return doc;

}