const ApiError = require("../error/apiError");
const { Debtors, Contracts, Organizations } = require("../models/models");
class ListController {
    async getList(req, res, next) {
        try{
            const {page, limit} = req.query;
            const groupId = req.user.groupId;
            const offset = page * limit - limit;
            const debtorsData = await Debtors.findAndCountAll({limit, offset, order: [['createdAt', 'DESC']], where: {groupId}, include: [{ model: Contracts, as: 'contracts', include: Organizations}]});
            const contractsList = debtorsData.rows.reduce((acc, el)=> {
                if(!acc[el.id]) acc[el.id] = [];
                if(el.contracts.length == 0) return acc;
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
        console.log(e);
        next(ApiError.internal(e.message));
    }
    }
}

module.exports = new ListController;