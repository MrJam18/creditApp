const ContractDocument = require("./ContractDocument");
const ExecutiveDocs = require("../../models/documents/ExecutiveDocs");
const Contracts = require("../../models/documents/Contracts");
const ApiError = require("../../error/apiError");
const IPInitView = require("../Views/IPInitView");
const Bailiffs = require("../../models/subjects/Bailiffs");
const Courts = require("../../models/subjects/Courts");
const Creditors = require('../../models/subjects/Creditors');
const Debtors = require('../../models/subjects/Debtors')
const Agents = require('../../models/subjects/Agents');
const {changeDateFormat} = require("../../utils/dates/changeDateFormat");
const Requisites = require("../../models/documents/Requisites");

module.exports = class IPInit extends ContractDocument
{
    constructor(contract, agent) {
        super();
        this.contract = contract;
        this.agent = agent;
        this.actionObjectId = 13;
    }


    static async init(body, groupId) {
        const contract = await Contracts.findOne( {
            where: {
                id: body.contractId,
                groupId
            },
            attributes: ['id', 'name', 'number', 'date_issue'],
            include: [
                {model: Creditors, attributes: ['name', 'requisitesId', ...Creditors.getAddressColumns(), 'creditorTypeId']},
                {model: Debtors, attributes: Debtors.getFIOColumns()},
                {model: ExecutiveDocs, attributes: ['number', 'dateIssue', 'main', 'percents', 'penalties', 'fee', 'sum', 'typeId'],
                 include: [
                     {model: Bailiffs, attributes: [...Bailiffs.getAddressColumns(), 'name']},
                     {model: Courts, attributes: ['name']}
                     ]}
            ]
        });
        const agent = await Agents.findByPk(body.agentId);
        if (!contract) throw ApiError.dataBase('contract not found');
        const IPInit = new this(contract, agent);
        await IPInit.#createDocument();
        return IPInit;
    }

    async #createDocument()
    {
        const executiveDoc = this.contract.executiveDoc;
        const creditor = this.contract.creditor;
        // console.log(this.contract.date_issue);
        this.contract.setDataValue('date_issue', this._changeDateOnRus(this.contract.date_issue));
        await executiveDoc.bailiff.getFullAddress();
        await this.agent.getFullAddress();
        await this.contract.creditor.getFullAddress();
        this.agent.getFullName();
        executiveDoc.setDataValue('dateIssue', this._changeDateOnRus(executiveDoc.dateIssue));
        creditor.requisites = await Requisites.getAllById(this.contract.creditor.requisitesId);
        if(creditor.creditorTypeId === 3) creditor.genitive = this._getGenitive(creditor.name);
        const view = new IPInitView(executiveDoc.bailiff, this.contract.creditor, this.agent, this.contract.debtor, executiveDoc.court.name, executiveDoc, this.contract);
        this.document = view.buildDocument();
        this._setPath(this.contract.id, 'IPInits');
    }

}