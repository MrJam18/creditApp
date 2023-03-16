module.exports = function (object) {
    const emptyOrder = !Object.keys(object).length;
    return emptyOrder;
}