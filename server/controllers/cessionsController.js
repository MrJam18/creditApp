const Cessions = require("../models/documents/Cessions");
const nullCession = require('../constants/nullCession');
const errorHandler = require('../error/errorHandler');
const Provider = require('../providers/documents/CessionsProvider');
const { Op } = require("sequelize");
const Organizations = require("../models/subjects/Organizations");
const CessionsInfo = require("../models/documents/CessionsInfo");
const CessionsEnclosures = require('../models/documents/CessionsEnclosures');
const ApiError = require("../error/apiError");
const provider = new Provider();


const regExpText = nullCession.name.toLowerCase()

class CessionsController {
    async getNameList(req, res, next) {
        const value = req.query.value.toLowerCase();
        try{
           const data = await Cessions.findAll({limit: 5, attributes: ['id', 'name'], where: {
            name:{
                [Op.iLike]: `%${value}%`   
               }
           }});
           const nameList = data.map((el)=> {
            return {name: el.name, id: el.id}
           },[])
            const regExp = new RegExp(value);
           if(regExp.test(regExpText)) nameList.push(nullCession)
           res.json(nameList);
        }
    catch(e) {
        errorHandler(e, next);
    }
    }
    async getList(req, res, next)
    {
        const data = req.query;
        provider.getGroupId(req);
        provider.getOffset(data.limit, data.page);
        provider.getOrder(data.order);
        try {
            const list = await Cessions.findAndCountAll({
                limit: data.limit, offset: provider.offset, order: provider.order,
                attributes: ['name', 'cessionsAmount', 'createdAt', 'updatedAt', 'lastTransferDate', 'id'],
                where: {
                    groupId: provider.groupId
                }, include: [{model: Organizations, as: 'lastAssignee', attributes: ['short', 'name']}, {model: Organizations, as: 'lastAssignor', attributes: ['short', 'name']}]
            });
            list.rows.forEach((el)=> {
                el.getNameOrShort('lastAssignee');
                el.getNameOrShort('lastAssignor');
                el.setTimeStamps(true);
            })
            res.json(list);
        }
        catch(e) {
            errorHandler(e, next);
        }
    }
    async getInfo(req, res, next)
    {
        try{
            const ids = provider.getIds(req);
            const info = await CessionsInfo.findAndCountAll({
                where: {cessionId: ids.id, groupId: ids.groupId}, order: ['transferDate'], attributes: ['transferDate', 'sum', 'number', 'text', 'useDefaultText', 'id'], include: [{model: Organizations, as: 'assignee', attributes: ['short', 'name', 'INN', 'id']}, {model: Organizations, as: 'assignor', attributes: ['short', 'name', 'INN', 'id']}]
            })
            const rows = info.rows;
            for(let i = 0; i < rows.length; i++) {
                await rows[i].getEnclosures();
                rows[i].assignee.getNameOrShort();
                rows[i].assignor.getNameOrShort();
                rows[i].assignee.getSearchName();
                rows[i].assignor.getSearchName();
                rows[i].assignee.deleteData('INN');
                rows[i].assignor.deleteData('INN');
            }
            res.json(info);
        }
        catch(e) {
            errorHandler(e, next);
        }

    }
    async changeOne(req, res, next)
    {
        try {
            const data = req.body;
            const groupId = req.user.groupId;
            const lastInfo = data.lastInfo;
            const cessionData = {
                name: data.name,
                cessionsAmount: data.info.length,
                lastTransferDate: lastInfo.transferDate,
                lastAssigneeId: lastInfo.assigneeId,
                lastAssignorId: lastInfo.assignorId
            }
            const cession = await Cessions.updateByIdAndGroupId(data.cessionId, groupId, cessionData);
            if(!cession) throw ApiError.badRequest('группа Цессий не найдена.');
            const newCessionsInfo = [];
            const cessionsInfo = [];
            const deleteIds = data.deleteIds;
            data.info.forEach((el)=> {
                if(!el.number) el.number = null;
                if(!el.sum) el.sum = null;
                if(el.id) cessionsInfo.push(el);
                else newCessionsInfo.push(el);
            });
            if(deleteIds.length !== 0) {
                for(let i = 0; i < deleteIds.length; i++) {
                    await CessionsInfo.deleteByIdAndGroupId(deleteIds[i], groupId);
                }
            }
            if(cessionsInfo.length !== 0) {
                for(let i = 0; i < cessionsInfo.length; i++) {
                    const el = cessionsInfo[i];
                    const enclosures = el.enclosures.map((enclosure)=> {
                        return {
                            name: enclosure,
                            cessionsInfoId: el.id
                        }
                    })
                    delete el.enclosures;
                    const updated = await CessionsInfo.update(el, {where: { id: el.id, groupId}});
                    if (!updated) throw ApiError.badRequest(`цессия с id ${el.id} не найдена для изменений.`);
                    await CessionsEnclosures.destroy({where: {cessionsInfoId: el.id}});
                    await CessionsEnclosures.bulkCreate(enclosures);
                }
            }
            if(newCessionsInfo.length !== 0) {
                for(let i = 0; i < newCessionsInfo.length; i++) {
                    newCessionsInfo[i].groupId = groupId;
                    const cessionInfo = await CessionsInfo.create(newCessionsInfo[i]);
                    const enclosures = newCessionsInfo[i].enclosures.map((enclosure)=> {
                        return {
                            name: enclosure,
                            cessionsInfoId: cessionInfo.id
                        }
                    })
                    await CessionsEnclosures.bulkCreate(enclosures);
                }
            }
            provider.sendOk(res);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteOne(req, res, next)
    {
        try{
            const cessionId = req.body.cessionId;
            const groupId = req.user.groupId;
            await CessionsInfo.destroy({where: {
                cessionId, groupId
                }});
            await Cessions.deleteByIdAndGroupId(cessionId, groupId);
            provider.sendOk(res);
        }
        catch (e) {
            next(e);
        }
    }
    async addOne(req, res, next)
    {
        const data = req.body;
        let info = data.info;
        const groupId = req.user.groupId;
        const lastInfo = data.lastInfo;
        try {
            const cession = Cessions.build({
                lastAssigneeId: lastInfo.assigneeId,
                lastAssignorId: lastInfo.assignorId,
                cessionsAmount: info.length,
                groupId,
                name: data.name,
                lastTransferDate: lastInfo.transferDate
            });
            try{
                await cession.save();
            }
            catch (e){
                if(e.name === 'SequelizeUniqueConstraintError'){
                   return next(ApiError.dataBase('Имя группы цессии уже существует. Укажите другое имя.'))
                }
                throw e;
            }
            for(let i = 0; i < info.length; i++){
                const el = info[i];
                provider.getNullsFromString(el);
                el.groupId = groupId;
                el.cessionId = cession.id;
                let enclosures = [...el.enclosures];
                delete el.enclosures;
                const infoRes = await CessionsInfo.create(el);
                enclosures = enclosures.map((el)=> {
                    return {
                        name: el,
                        cessionsInfoId: infoRes.id
                    };
                })
                await CessionsEnclosures.bulkCreate(enclosures);
            }
            provider.sendOk(res);
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = new CessionsController;