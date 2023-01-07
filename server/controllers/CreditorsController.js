const ApiError = require("../error/apiError");
const Creditors = require('../models/subjects/Creditors');
const { Op } = require("sequelize");
const getArrayFromString = require("../utils/getArrayFromString");
const countOffset = require("../utils/countOffset");
const getFullAddressWithoutInclude = require("../utils/adress/getFullAddressWithoutInclude");
const {CreditorTypes} = require("../models/connections");
const BankRequisites = require("../models/documents/BankRequisites");
const SearchByNameProvider = require("../providers/SearchProviders/SearchByNameProvider");
const Requisites = require("../models/documents/Requisites");
const Cessions = require('../models/documents/Cessions');

const provider = require("../providers/ModelsProviders/CreditorsProvider");
const AddressBuilder = require("../Builders/AddressBuilder");



class CreditorsController {
    async getNameList(req, res, next) {
        const { value } = req.query;
        const groupId = req.user.groupId;
        try{
           const data = await Creditors.findAll({limit: 5, where:{
            [Op.or]: [{
                name:{
                    [Op.iLike]: `%${value}%`   
                   },
                },
                {
                short: {
                  [Op.iLike]: `%${value}%` 
                }
               },
              ],
            groupId
           }, attributes: ['id', 'creditorTypeId', 'name', 'short', 'courtIdentifier', 'creditorTypeId']});
           const list = data.map((el)=> {
               el.getSearchName();
               el = el.getPlain();
               delete el.short;
               delete el.courtIdentifier;
               return el;
           },[]);
           res.json(list);
        }
    catch(e) {
        console.log(e);
        next(ApiError.internal(e.message));
    }
    }
    async getSearchWithCessions(req, res, next)
    {
        try {
            const { value } = req.query;
            const groupId = req.user.groupId;
            const creditors = await Creditors.findAll({limit: 5, where:{
                    [Op.or]: [{
                        name:{
                            [Op.iLike]: `%${value}%`
                        },
                    },
                        {
                            short: {
                                [Op.iLike]: `%${value}%`
                            }
                        },
                    ],
                    groupId
                }, attributes: ['id', 'name', 'short', 'courtIdentifier', 'creditorTypeId'],
                include: {model: Cessions, attributes: ['id', 'name']}
            });
            const list = creditors.map((el)=> {
                el.getSearchName();
                el = el.getPlain();
                delete el.short;
                delete el.courtIdentifier;
                return el;
            },[]);
            res.json(list);
        } catch(e) {
            next(e);
        }

    }
    async getNameListForCessions(req, res, next) {
        const {value} = req.query;
        const groupId = req.user.groupId;
        try {
            const data = await Creditors.findAll({
                limit: 5, where: {
                    [Op.or]: [{
                        name: {
                            [Op.iLike]: `%${value}%`
                        },
                    },
                        {
                            short: {
                                [Op.iLike]: `%${value}%`
                            }
                        },
                    ],
                    groupId
                }, attributes: ['id', 'name', 'short', 'courtIdentifier', "creditorTypeId"]
            });
            const list = data.map((el) => {
                el.getSearchName();
                el.getNameOrShort();
                el = el.getPlain();
                delete el.courtIdentifier;
                return el;
            }, []);
            res.json(list);
        } catch (e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    }
    async getList(req, res, next) {
        try{
            const {order, limit, page} = req.query;
            const groupId = req.user.groupId;
            const orderArray = getArrayFromString(order);
            const offset = countOffset(limit, page);
            const creditors = await Creditors.findAndCountAll({limit, offset,
                order: [orderArray],
                attributes: ['name', 'short', 'courtIdentifier', 'createdAt', 'id'], where: {groupId},
                include:
                    [{model: CreditorTypes, attributes: ['name']}]});
            let rows = [];
            for(const el of creditors.rows) {
                const element = el.get({plain: true});
                element.type = element.creditorType.name;
                delete element.creditorType;
                rows.push(element);
            }
            res.json({rows, count: creditors.count });
    }
    catch(e) {
        next(e);
    }
    }
    async getCreditor (req, res, next)
    {
        try {
            const creditorId = req.query.creditorId;
            let creditor = await Creditors.findOne({
                where: {
                    id: creditorId,
                    groupId: req.user.groupId
                },
                attributes: ['name', 'short', 'courtIdentifier', ...Creditors.getAddressColumns(), 'id', 'creditorTypeId'],
                include: [
                    {model: Requisites, attributes: ['checkingAccount', 'correspondentAccount', 'id'],
                        include: {model: BankRequisites, attributes: ['id', 'name']}},
                    {model: Cessions, attributes: ['id', 'name']}
                ]
            });
            if (!creditor) throw ApiError.dataBase('кредитор не найден.');
            creditor = creditor.getPlain();
            await AddressBuilder.getFullAddress(creditor);
            res.json(creditor);
        } catch(e) {
            next(e)
        }
    }
    async addOne(req, res, next) {
        try{
            const data = await provider.prepareDataForSave(req.body, req.user.groupId);
            await provider.addOne(data.creditor, data.address, data.requisites);
            res.json({status: 'ok'});
        }
        catch(e) {
            next(e);
        }
    }
    async changeOne(req,res,next) {
        try{
            const body = req.body;
            const groupId = req.user.groupId;
            const requisites = {
                checkingAccount: body.checkingAccount,
                correspondentAccount: body.correspondentAccount,
                bankRequisitesId: body.bankRequisitesId,
                id: body.requisitesId || null
            };
            let address = null;
            if(body.address !== 'default') address = await AddressBuilder.build(body.address);
            delete body.address;
            delete body.checkingAccount;
            delete body.correspondentAccount;
            delete body.bankRequisitesId;
            const creditor = body;
            creditor.groupId = groupId;
            if(address) address.addInModel(creditor);
            const updated = await Creditors.update(creditor, {where: {id: creditor.id, groupId}});
            if (!updated[0]) throw ApiError.dataBase('Кредитор не найден');
            await Requisites.update(requisites, {where: {id: requisites.id}});
            res.json({status: 'ok'});
        }
        catch(e) {
            next(e);
        }
    }
    async deleteOne(req, res, next) {
        try{
            const id = req.body.id;
            const groupId = req.user.groupId;
            await Creditors.destroy({
                where: {
                    id, groupId
                }
            });
            res.json({status: 'ok'});
        }
        catch(e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    }
    async addBankRequisites (req, res, next) {
        try {
            const data = req.body;
            const DBData = await BankRequisites.create({name: data.name, BIK: data.BIK});
            res.json({id: DBData.id});
        }
        catch (e) {
            if(e.original.code === '23505') e.message = 'Указанные реквизиты банка уже существуют!';
            next(e);
        }
    }
    async searchBankRequisites (req, res, next) {
        const { value } = req.query;
        try{
            const searchProvider = new SearchByNameProvider(value, BankRequisites);
            const list = await searchProvider.search();
            res.json(list);
        }
        catch (e) {
            next(e);
        }
    }
    async changeDefaultCession (req, res, next)
    {
        try {
            const body = req.body;
            const updated = await Creditors.updateByIdAndGroupId(body.creditorId, req.user.groupId, {defaultCessionId: body.cessionId});
            if(!updated[0]) throw ApiError.dataBase('Не удалось найти кредитора.');
            res.json({status: 'ok'});
        } catch(e) {
            if(e.name === 'SequelizeForeignKeyConstraintError') next(ApiError.dataBase('Не удалось найти цессию.'));
            else next(e);
        }
    }
}

module.exports = new CreditorsController;