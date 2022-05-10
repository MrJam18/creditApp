
const findOrCreateByName = async (Model, name, defaults) => {
    return await Model.findOrCreate({
        raw: true,
        attributes: ['id'],
        where: {
           name
        },
        defaults
    })
}
module.exports = findOrCreateByName;