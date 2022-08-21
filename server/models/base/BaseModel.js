const { Model } = require('sequelize');
const {changeDateFormat} = require("../../utils/dates/changeDateFormat");
const {DataTypes} = require("sequelize");

module.exports = class BaseModel extends Model {
    // getId()
    // {
    //     return this.id
    // }
    getPlain()
    {
        return this.get({plain: true});
    }
    setTimeStamps(withEnding = false)
    {
        this.setDataValue('createdAt', this.createdAt.toLocaleString('ru-RU').substring(0, 10) + (withEnding ? ' г.' : ''));
        this.setDataValue('updatedAt', this.updatedAt.toLocaleString('ru-RU').substring(0, 10) + (withEnding ? ' г.' : ''));
    }
    changeDateFormat(attribute)
    {
        return this.setDataValue(attribute,  changeDateFormat(this[attribute]));
    }
    setDateOnRus(date)
    {
        return changeDateFormat(date);
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
}