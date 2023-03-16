const ApiError = require("./apiError");
module.exports = function errorHandler(e, next) {
    console.log(e);
    next(e);
}