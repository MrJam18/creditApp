const { Op } = require("sequelize");
const Creditors = require('../models/subjects/Creditors');
const Debtors = require('../models/subjects/Debtors');
const Contracts = require('../models/documents/Contracts');
const isDate = require("../utils/dates/isDate");
const getWherePropertyWhenSearchFIO = require("../utils/getWherePropertyWhenSearchFIO");
const { changeDateToISO, changeDateFormat } = require('../utils/dates/changeDateFormat');
const {Statuses} = require("../models/connections");

const order = [['createdAt', 'DESC']];

class ListController {
    async getList(req, res, next) {
        try{
            const { page, limit } = req.query;
            let search = req.query.search;
            const groupId = req.user.groupId;
            const offset = page * limit - limit;
            const include = {model: Contracts, attributes: ['id', 'number', 'date_issue'], as: 'contracts',
                include: [{model: Creditors, attributes: ['name']},
                {model: Statuses, attributes: ['name']}]
            };
            const debtorsQuery = {limit, offset, attributes: ['id', 'surname', 'name', 'patronymic', 'birth_date', 'birth_place', 'createdAt'], order, where: {groupId}, include};
            if(search === 'null' || search === 'undefined') search = null;
            if(search){
                if(!/\d/.test(search)){
                    const searchArray = search.split(' ', 3);
                    debtorsQuery.where[Op.and] = {
                            ...getWherePropertyWhenSearchFIO(searchArray)
                        };
                }
                else {
                    let searchArray = search.split(' ', 6);
                    searchArray = searchArray.filter((el, index) => {
                        if(/№/.test(el)) {
                            if(/^№$/.test(el)) return false;
                            else searchArray[index] = el.replace('№', '');
                        }
                        else if(/^от$/.test(el) ) return false;
                        else if(/^договор$/.test(el)) return false;
                        else if(/^г.$/.test(el)) return false;
                        return true;
                    });
                    if(searchArray.length >= 2) {
                        let date_issue;
                        let number;
                        searchArray.find((el, index) => {
                            if(isDate(el)){
                                date_issue = changeDateToISO(el);
                                searchArray.splice(index, 1);
                                number = searchArray[0];
                                return true;
                            }
                        })
                        debtorsQuery.include.where.date_issue = date_issue;
                        debtorsQuery.include.where.number = number;
                    }
                    else {
                        if(isDate(searchArray[0])){
                            debtorsQuery.include.where = {
                                date_issue: changeDateToISO(searchArray[0])
                            }
                        }
                        else {
                            debtorsQuery.include.where = {
                                number: searchArray[0]
                            }
                        }
                    }
                }
            }
            let list = await Debtors.findAll(debtorsQuery);
            list = list.map((debtor)=> {
                    const text = `${debtor.surname} ${debtor.name} ${debtor.patronymic}, ${changeDateFormat(debtor.birth_date)} г. р., место рождения: ${debtor.birth_place}`;
                    const contracts = debtor.contracts.map((contract)=> {
                        const text = `договор № ${contract.number} выдан ${changeDateFormat(contract.date_issue)} г.`;
                        return {text, id: contract.id, creditor: contract.creditor.name, status: contract.status.name};
                    })
                return {text, contracts, id: debtor.id};
                }
            )
            console.log(list);
            res.json({list, totalRows: list.length})
    }
    catch(e) {
        next(e)
    }
    }
}

module.exports = new ListController;