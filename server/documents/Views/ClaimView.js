const CourtClaimView = require("./abstract/CourtClaimView");
const {Text, Indent, HeaderWithoutBreaks} = require("../../services/documentsService/docxClasses");
const {changeDateFormat} = require("../../utils/dates/changeDateFormat");
const addDays = require("../../utils/dates/addDays");

module.exports = class ClaimView extends CourtClaimView
{

    constructor(creditor, debtor, court, agent, result, contract, firstCreditor, cessionsInfo = [],  options = {}) {
        super(creditor, debtor, court, agent, result, contract, firstCreditor, cessionsInfo,  options);
        this.creditorType = 'Истец';
        this.debtorType = 'Ответчик';
        this.documentName = 'Исковое заявление о взыскании задолженности';
        this.asksHeader = [
            new Indent(`На основании изложенного, руководствуясь ст.131-132 ГПК РФ,`),
            new HeaderWithoutBreaks(`Прошу:`)
        ];
        this.enclosures.addEnclosure('Доказательства направления иска ответчику');
        this.actionObjectId = 11;
        this.dirName = 'claims';
    }

    addOtherRequirements()
    {
        const nextCountDate = changeDateFormat(addDays(this.result.endDate, 1));
        return [
            new Text(`3.  Взыскать с ${this.debtor.genitive} в пользу ${this.creditor.name} задолженность по договору займа № ${this.contract.number} от ${this.contract.date_issue} г., в том числе:`),
            new Text(`3.1.  Проценты за пользование займом, начисленные на сумму основного долга по ставке ${this.result.percent} % годовых с ${nextCountDate} г. по день фактического исполнения обязательств.`),
            new Text(`3.2.  Неустойку за просрочку исполнения обязательств, начисленную на сумму основного долга по ставке ${this.result.penalty} % годовых с ${nextCountDate} г. по день фактического исполнения обязательств.`),
            new Text(`4.  Рассмотреть дело по настоящему иску в отсутствие истца.`),
            new Text(`5.  Направить исполнительный лист по настоящему делу в адрес истца.`),
        ]
    }



    
}