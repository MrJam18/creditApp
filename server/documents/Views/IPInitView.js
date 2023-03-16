const AbstractView = require("./abstract/AbstractView");
const {incline} = require("lvovich");
const executiveDocTypes = require('../../constants/dataBase/executiveDocTypes');

module.exports = class IPInitView extends AbstractView
{
    constructor(bailiff, creditor, agent, debtor, courtName, executiveDoc, contract)
    {
        const options = {
            bigText: true
        }
        super(options);
        this.bailiff = bailiff;
        this.creditor = creditor;
        this.agent = agent;
        this.debtor = debtor;
        this.courtName = courtName;
        this.executiveDoc = executiveDoc;
        this.executiveDoc.type = executiveDocTypes.findNameById(this.executiveDoc.typeId);
        this.contract = contract;

    }

    buildDocument()
    {
        this.#createHeader();
        this.#createBody();
        this.#createFooter();
        return this._document.build();
    }

    #createHeader()
    {
        const header = this._document.header;
        header.addRow(`В ${this.bailiff.name}`);
        header.addAddress(this.bailiff.fullAddress);
        header.addRow('Взыскатель:');
        header.addRow(this.creditor.name);
        header.addAddress(this.creditor.fullAddress);
        header.addRow('Представитель:');
        header.addRow(this.agent.fullName);
        header.addAddress(this.agent.fullAddress);
    }

    #createBody()
    {
        const genitiveDebtor = incline({first: this.debtor.name, last: this.debtor.surname, middle: this.debtor.patronymic}, 'genitive');
        const body = this._document.body;
        body.addBodyHeader('Заявление о возбуждении исполнительного производства');
        body.addIndentRow(`Прошу принять ${this.executiveDoc.type} № ${this.executiveDoc.number} от ${this.executiveDoc.dateIssue} г., выданный судом: ${this.courtName} по гражданскому делу о взыскании задолженности с ${genitiveDebtor.last} ${genitiveDebtor.first} ${genitiveDebtor.middle} в пользу ${this.creditor.genitive ? this.creditor.genitive : this.creditor.name} по договору займа № ${this.contract.number} от ${this.contract.date_issue} г. в общем размере ${this.executiveDoc.sum} руб. Из них:`);
        body.addRow(`${this.executiveDoc.main} руб. - Основной долг;`);
        body.addRow(`${this.executiveDoc.percents} руб. - Проценты за пользование займом;`);
        body.addRow(`${this.executiveDoc.penalties} руб. - Неустойка за просрочку исполнения обязательств;`);
        body.addRow(`${this.executiveDoc.fee} руб. - Уплаченная в суд госпошлина.`);
        body.addIndentRow('Взысканные денежные средства прошу перечислить на следующие реквизиты:');
        const last = this.creditor.requisites.length - 1;
        this.creditor.requisites.forEach((el, index)=> {
            if(index === last) body.addRow(`${el.name}: ${el.data}.`);
            else body.addRow(`${el.name}: ${el.data};`);
        });
        body.addIndentRow('Прошу направить постановление о возбуждении исполнительного производства заказным письмом с уведомлением о вручении согласно п. 4.8.3.4 приказа от 10 декабря 2010 г. N 682 «ОБ УТВЕРЖДЕНИИ ИНСТРУКЦИИ ПО ДЕЛОПРОИЗВОДСТВУ В ФЕДЕРАЛЬНОЙ СЛУЖБЕ СУДЕБНЫХ ПРИСТАВОВ».');
        body.addIndentRow('В случае истечения срока добровольного исполнения требований, указанных в постановлении о возбуждении исполнительного производства, прошу установить временное ограничение на выезд из РФ в отношении должника.');
    }

    #createFooter()
    {
        const footer = this._document.footer;
        footer.addRow(`${this.executiveDoc.type} № ${this.executiveDoc.number} от ${this.executiveDoc.dateIssue} г.`);
        footer.addRow(this.agent.enclosure);
        footer.addSignature(this.agent);
    }
}