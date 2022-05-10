const ApiError = require("../error/apiError");

module.exports = async function CreateDataInDB(data, Model, next) {
    try {  
        return await Model.create({...data}); 
    }
    catch(e) {
        return next(ApiError.badRequest(e));
    }
}


