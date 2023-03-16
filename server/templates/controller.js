const ApiError = require("../error/apiError");

class OrganizationsController {
    async getNameList(req, res, next) {
        try{
           const data = req.body;
           const { id }= req.query;
            
           res.json(nameList);
        }
    catch(e) {
        next(ApiError.internal(e.message));
    }
    }
}

module.exports = new OrganizationsController;