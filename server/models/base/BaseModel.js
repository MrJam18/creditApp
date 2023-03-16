const { Model } = require('sequelize');
const {changeDateFormat} = require("../../utils/dates/changeDateFormat");
const { Op } = require("sequelize");

module.exports = class BaseModel extends Model {
    getPlain()
    {
        return this.get({plain: true});
    }
    setTimeStamps(withEnding = false)
    {
        this.setDataValue('createdAt', this.createdAt.toLocaleString('ru-RU').substring(0, 10) + (withEnding ? ' г.' : ''));
        this.setDataValue('updatedAt', this.updatedAt.toLocaleString('ru-RU').substring(0, 10) + (withEnding ? ' г.' : ''));
    }
    removeEmptyStrings()
    {
        for(const prop in this.dataValues)
        {
            if(this.dataValues[prop] === '') this.setDataValue(prop, null);
        }
    }
    changeDateFormat(attribute)
    {
        return this.setDataValue(attribute,  changeDateFormat(this[attribute]));
    }

     static async updateByIdAndGroupId(id, groupId, data)
    {
        return await this.update(data, {where: {
            id, groupId
            }})
    }
    static async deleteByIdAndGroupId(id, groupId)
    {
        return await this.destroy({where: {
            id, groupId
            }})
    }
    static async findByIdAndGroupId(id, groupId, attributes = null)
    {
       return await this.findOne({
            where: {
                id, groupId
            }, attributes
        })
    }
    static getWhereByIds(ids)
    {
        return {
            id: ids.id,
            groupId: ids.groupId
        }
    }
    getNameOrShort(key)
    {
        if(this[key].short)
        {
            this.setDataValue(key, this[key].short)
        }
        else this.setDataValue(key, this[key].name)
        return this[key];
    }
    deleteData(key)
    {
        delete this.dataValues[key];
    }

    static async findByName(value, groupId)
    {
        return await this.findAll({where: {
                name:{
                    [Op.iLike]: `%${value}%`
                },
                groupId
            }, attributes: ['id', 'name']});
    }
}