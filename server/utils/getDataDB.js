/**
 * Возвращает только данные из полученного ответа базы данных по методу findAll.
 *
 * @param {object} data ответ из базы данных.
 * @return {array} массив данных из базы данных.
 */
const getDataDB = (data) => {
    return data.rows.map((el)=>el.get({ plain: true }))
}
module.exports = getDataDB;