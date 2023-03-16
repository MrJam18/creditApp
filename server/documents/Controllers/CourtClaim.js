const {Document, Paragraph, Footer} = require("docx");
const ContractDocument = require("./ContractDocument");
const Payments = require('../../models/documents/Payments');
const Debtors = require("../../models/subjects/Debtors");
const Creditors = require("../../models/subjects/Creditors");
const Courts = require("../../models/subjects/Courts");
const Agents = require("../../models/subjects/Agents");
const CessionsInfo = require("../../models/documents/CessionsInfo");
const Contracts = require("../../models/documents/Contracts");
const Indents = require("../../classes/docx/Indents");
const LoanCounter = require("../../classes/counters/LoanCounter");
const PercentTable = require("../../classes/counters/Tables/PercentTable");
const PenaltyTable = require("../../classes/counters/Tables/PenaltyTable");
const {Signature} = require("../../services/documentsService/docxClasses");
const IgnorePaymentsLoanCounter = require("../../classes/counters/IgnorePaymentsLoanCounter");
const CourtOrderView = require("../Views/OrderView");
const ClaimView = require("../Views/ClaimView");
const {incline} = require("lvovich");

module.exports = class CourtClaim extends ContractDocument
{
    agent;
    court;
    debtor;
    creditor;
    cession = null;
    contract;
    document;
    result;
    firstCreditor;
    // lastText = new Indents();
    limitedText = new Indents();
    dirName;

    static async init(contractId, agentId, courtId, countDate, groupId, options, type )
    {
        const courtClaim = new this();
        await courtClaim.#prepareData(agentId, courtId, contractId, groupId, countDate, options, type);
        courtClaim.#buildDocument();
        return courtClaim;
    }

    async #prepareData(agentId, courtId, contractId, groupId, countDate, options, type)
    {
        let contract = await Contracts.findOne( { where: {
                id: contractId, groupId
            },
            order: [[Payments, 'date', 'ASC']],
            include: [
                {model: Payments},
                {model: Debtors, include: {all: true}},
                {model: Creditors, include: {all: true}
                }]});
        let court = await Courts.findByPk(courtId);
        let agent = await Agents.findByPk(agentId);
        let debtor = contract.debtor;
        let creditor = contract.creditor;
        let cessionsInfo;
        if(contract.cessionId) {
            this.firstCreditor = await CessionsInfo.getFirstCreditor(contract.cessionId, groupId, ['name']);
            this.firstCreditor = this.firstCreditor.name;
            cessionsInfo = await CessionsInfo.findByCessionId(contract.cessionId, groupId, ['text', 'id']);
            await cessionsInfo.asyncForEach(async(el)=> {
                await el.getEnclosures();
            })
        }
        else this.firstCreditor = creditor.name;
        await agent.getFullAddress();
        await court.getFullAddress();
        await debtor.getFullAddress();
        await creditor.getFullAddress();
        agent.getFullName();
        agent.getInitials();
        debtor.getFullName();
        if(options.ignorePayments) this.result = new IgnorePaymentsLoanCounter(contract, countDate, contract.payments);
        else this.result = new LoanCounter(contract, countDate, contract.payments);
        this.result.countSum();
        this.result.countFee(type);
        debtor.inclineFullName('genitive');
        this.result.daysCase = this.getDaysCase(contract.date_issue, contract.due_date);
        contract.changeDateFormat('date_issue');
        contract.changeDateFormat('due_date');
        debtor.changeDateFormat('birth_date');
        if(creditor.creditorTypeId === 3) {
            const passportsArray = creditor.courtIdentifier.split(' ', 2);
            if(passportsArray?.length === 2) {
                creditor.setDataValue('courtIdentifier', `серия ${passportsArray[0]} № ${passportsArray[1]}`);
            }
            creditor.genitive = this._getGenitive(creditor.name);
        }
        this.agent = agent;
        this.court = court;
        this.debtor = debtor;
        this.creditor = creditor;
        this.contract = contract;
        const view = type === 'courtOrder' ? new CourtOrderView(this.creditor, this.debtor, this.court, this.agent, this.result, this.contract, this.firstCreditor, cessionsInfo, options) : new ClaimView(this.creditor, this.debtor, this.court, this.agent, this.result, this.contract, this.firstCreditor, cessionsInfo, options);
        this.content = view.buildDocument();
        this._setPath(contractId, view.dirName);
        this.actionObjectId = view.actionObjectId;
    }
    #buildDocument()
    {
        const percentTable = new PercentTable(this.contract, this.result.breaks);
        const penaltyTable = new PenaltyTable(this.contract, this.result.breaks);
        const countingTables = {
            children: [percentTable.header, percentTable.table, new Paragraph({
                spacing: {
                    before: 500
                }
            }), penaltyTable.header, penaltyTable.table],
            footers: {
                default: new Footer({
                    children: [new Signature(this.agent.initials)]
                })
            }
        }
        this.document = new Document({
            creator: 'creditApp',
            sections: [this.content, countingTables]
        });
        return this.doc;
    }
}