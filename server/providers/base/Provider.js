const getArrayFromString = require("../../utils/getArrayFromString");
const countOffset = require("../../utils/countOffset");

module.exports = class Provider
{
    data = null;
    groupId = null;

    constructor(model)
    {
        this.Model = model
    }
    getOrder(string)
    {
        this.order = [getArrayFromString(string)];
        return this.order;
    }

    getGroupId(req)
    {
        this.groupId = req.user.groupId
        return this.groupId;
    }
    getOffset(limit, page)
    {
        this.offset = countOffset(limit, page);
        return this.offset;

    }
    getIds(req)
    {
        let id;
        if(req.body.id) id = req.body.id;
        else id = req.query.id;
        const groupId = req.user.groupId;
        return { id, groupId };
    }
    sendOk(res)
    {
        res.json({status: 'ok'})
    }
    getNullsFromString(data)
    {
        for(const property in data){
            if(data[property] === ''){
                data[property] = null;
            }
        }
        return data;
    }
}