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
            include: [
                {model: Creditors, attributes: ['name', 'requisitesId', ...Creditors.getAddressColumns()]},
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
        await executiveDoc.bailiff.getFullAddress();
        await this.agent.getFullAddress();
        await this.contract.creditor.getFullAddress();
        this.agent.getFullName();
        executiveDoc.setDataValue('dateIssue', changeDateFormat(executiveDoc.dateIssue));
        this.contract.creditor.requisites = await Requisites.getAllById(this.contract.creditor.requisitesId);
        const view = new IPInitView(executiveDoc.bailiff, this.contract.creditor, this.agent, this.contract.debtor, executiveDoc.court.name, executiveDoc);
        this.document = view.buildDocument();
        this._setPath(this.contract.id, 'IPInits');
    }

}