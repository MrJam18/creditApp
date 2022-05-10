module.exports = function(limit, page) {
    return page * limit - limit;
}