const CourtClaimView = require("./abstract/CourtClaimView");
const {Indent, HeaderWithoutBreaks} = require("../../services/documentsService/docxClasses");

module.exports = class CourtOrderView extends CourtClaimView
{
    constructor(creditor, debtor, court, agent, result, contract, firstCreditor, cessionsInfo = [],  options = {}) {
        super(creditor, debtor, court, agent, result, contract, firstCreditor, cessionsInfo,  options);
        this.creditorType = 'Взыскатель';
        this.debtorType = 'Должник';
        this.documentName = 'Заявление о выдаче судебного приказа';
        this.asksHeader = [
            new Indent(`На основании изложенного, руководствуясь ст.121-123 ГПК РФ,`),
            new HeaderWithoutBreaks(`Прошу выдать судебный приказ, в котором:`)
        ];
        this.actionObjectId = 1;
        this.dirName = 'orders';
    }
    
}