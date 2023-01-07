
const findOrCreateByName = async (Model, name, defaults) => {
    const data = await Model.findOrCreate({
        raw: true,
        attributes: ['id'],
        where: {
            name
        },
        defaults
    })
    return data ? data[0].id : null ;
}
module.exports = findOrCreateByName;