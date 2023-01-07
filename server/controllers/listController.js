const { Op } = require("sequelize");
const ApiError = require("../error/apiError");
const Creditors = require('../models/subjects/Creditors');
const Debtors = require('../models/subjects/Debtors');
const Contracts = require('../models/documents/Contracts');
const isDate = require("../utils/dates/isDate");
const getWherePropertyWhenSearchFIO = require("../utils/getWherePropertyWhenSearchFIO");
const { changeDateToISO } = require('../utils/dates/changeDateFormat');
class ListController {
    async getList(req, res, next) {
        try{
            const { page, limit } = req.query;
            let search = req.query.search;
            const groupId = req.user.groupId;
            const offset = page * limit - limit;
            let debtorsData;
            if(search === 'null' || search === 'undefined') search = null;
            if(search){
                if(!/\d/.test(search)){
                    const searchArray = search.split(' ', 3);
                    const where = {
                        [Op.and]: {
                        ...getWherePropertyWhenSearchFIO(searchArray), groupId
                        }
                    };
                    debtorsData = debtorsData = await Debtors.findAndCountAll({limit, offset, order: [['createdAt', 'DESC']], where, include: [{ model: Contracts, as: 'contracts', include: Creditors}]});
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
                    let where;
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
                        where = {
                            date_issue, number
                        }
                    }
                    else {
                        if(isDate(searchArray[0])){
                            where = {
                                date_issue: changeDateToISO(searchArray[0])
                            }
                        }
                        else {
                            where = {
                                number: searchArray[0]
                            }
                        }
                    }
                    debtorsData = await Debtors.findAndCountAll({limit, offset, order: [['createdAt', 'DESC']], where: {groupId}, include: [{ model: Contracts, where, as: 'contracts', include: Creditors}]});
                }
                
            }
            else {
            debtorsData = await Debtors.findAndCountAll({limit, offset, order: [['createdAt', 'DESC']], where: {groupId}, include: [{ model: Contracts, as: 'contracts', include: Creditors}]});
            }
            const contractsList = debtorsData.rows.reduce((acc, el)=> {
                if(!acc[el.id]) acc[el.id] = [];
                if(el.contracts.length === 0) return acc;
                acc[el.id].push(...el.contracts)
                return acc;
                }, {});
            const debtorsList = debtorsData.rows.reduce((acc, el)=> {
                acc.push({
                    id: el.id,
                    name: el.name,
                    surname: el.surname,
                    patronymic: el.patronymic,
                    birth_date: el.birth_date,
                    birth_place: el.birth_place
                })
                return acc;
            },[])
            res.json({debtorsList, contractsList, totalRows: debtorsData.count})
    }
    catch(e) {
        next(e)
    }
    }
}

module.exports = new ListController;