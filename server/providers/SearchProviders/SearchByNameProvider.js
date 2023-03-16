const {Op} = require("sequelize");

module.exports = class SearchByNameProvider
{
    #defaultLimit = 5;
    findOptions;
    #Model;
    constructor(searchValue, Model) {
        this.findOptions = {
        limit: this.#defaultLimit, where:{
            name: {[Op.iLike]: `%${searchValue}%` }}
        , attributes: ['id', 'name']
        }
        this.#Model = Model;
    }
    async search()
    {
       return await this.#Model.findAll(this.findOptions);
    }
}
