
module.exports = class DBConstantsFinder
{
    data;
    constructor(data) {
        this.data = data;
    }

    findNameById(id) {
        const found = this.data.find((el)=> el.id === id);
        if(!found) throw new Error('not found by id ' + id);
        else if(!found.name) throw new Error('array dont have prop name');
        else return found.name;
    }
}