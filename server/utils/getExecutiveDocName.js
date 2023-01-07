const executiveDocTypes = require("../constants/dataBase/executiveDocTypes");
const {changeDateFormat} = require("./dates/changeDateFormat");
module.exports.getExecutiveDocName = function(typeId, number, dateIssue) {
        const executiveDocType = executiveDocTypes.findNameById(typeId);
        return `${executiveDocType} № ${number} от ${changeDateFormat(dateIssue)} г.`;
}