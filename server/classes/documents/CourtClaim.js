const {Document, Paragraph, Footer} = require("docx");
const ContractDocument = require("./ContractDocument");
const {Payments} = require("../../models/models");
const Debtors = require("../../models/subjects/Debtor");
const Organizations = require("../../models/subjects/Organizations");
const Courts = require("../../models/subjects/Courts");
const Agents = require("../../models/subjects/Agents");
const Cessions = require("../../models/documents/Cessions");
const CessionsInfo = require("../../models/documents/CessionsInfo");
const {changeDateFormat} = require("../../utils/dates/changeDateFormat");
const Contracts = require("../../models/documents/Contracts");
const Indents = require("../docx/Indents");
const LoanCounter = require("../counters/LoanCounter");
const PercentTable = require("../counters/Tables/PercentTable");
const PenaltyTable = require("../counters/Tables/PenaltyTable");
const {Signature} = require("../../services/documentsService/docxClasses");

module.exports = class CourtClaim extends ContractDocument
{
    agent;
    court;
    debtor;
    creditor;
    cession = null;
    contract;
    content;
    result;
    countDate;
    firstCreditor;
    cessionIndents = new Indents();
    limitedText = new Indents();

    constructor(actionObjectId, contractId) {
        super(actionObjectId, contractId);
    }

    static async init(contractId, agentId, courtId, countDate, groupId, ignorePayments, type )
    {
        const courtClaim = new this(contractId);
        await courtClaim.#prepareData(agentId, courtId, contractId, groupId, countDate, ignorePayments, type);
        courtClaim._buildContent();
        courtClaim.#buildDocument();
        return courtClaim;
    }

    async #prepareData(agentId, courtId, contractId, groupId, countDate, ignorePayments, type)
    {
        let contract = await Contracts.findOne( { where: {
                id: contractId, groupId
            },
            include: [
                {model: Payments},
                {model: Debtors, include: {all: true}},
                {model: Organizations, include: {all: true
                }}]});
        let court = await Courts.findByPk(courtId);
        let agent = await Agents.findByPk(agentId);
        let debtor = contract.debtor;
        let creditor = contract.organization;
        let cession;
        if(contract.cessionId) {
            cession = await Cessions.findByIdAndGroupId(contract.cessionId, groupId, ['firstCreditorId']);
            const firstCreditor = await CessionsInfo.getFirstCreditor(contract.cessionId, groupId, ['name']);
            const cessionInfo = await CessionsInfo.findByCessionId(contract.cessionId, groupId, ['text', 'enclosure']);
            cessionInfo.forEach((el)=> {
                this.enclosures.addEnclosure(el.enclosure);
                this.cessionIndents.addIndent(el.text);
            })
            this.enclosures.addEnclosures(cession.enclosures);
            this.cession = cession.getPlain();
            this.firstCreditor = firstCreditor.name;
        }
        else this.firstCreditor = creditor.name;
        this.enclosures.addEnclosure(agent.enclosure);
        await agent.getFullAddress();
        await court.getFullAddress();
        await debtor.getFullAddress();
        await creditor.getFullAddress();
        agent.getFullName();
        agent.getInitials();
        debtor.getFullName();
        this.result = new LoanCounter(contract.sum_issue, contract.percent, contract.penalty, contract.date_issue, countDate, contract.due_date, contract.payments);
        if(ignorePayments){
            this.result.limited.getLimitedPercents(this.result.percents, this.result.penalties);
            if(this.result.limitedText){
                this.limitedText.addIndents(this.result.limitedText);
            }
        }
        this.result.countSum();
        this.result.countFee(type);
        debtor.inclineFullName('genitive');
        countDate = changeDateFormat(countDate);
        this.result.daysCase = this.getDaysCase(contract.date_issue, contract.due_date);
        contract.changeDateFormat('date_issue');
        contract.changeDateFormat('due_date');
        debtor.changeDateFormat('birth_date');
        this.agent = agent.getPlain();
        this.court = court.getPlain();
        this.debtor = debtor.getPlain();
        this.creditor = creditor.getPlain();
        this.contract = contract.getPlain();
        this.countDate = countDate;
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