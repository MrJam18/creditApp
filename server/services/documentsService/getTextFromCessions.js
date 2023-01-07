const { Organizations, Cessions } = require("../../models/connections");
const { Indent, Text } = require("./docxClasses");

module.exports = async function(cessionId, contractCreditorName) {
    let cessionText = [];
    let firstCreditorName = contractCreditorName;
    let cessionDocuments = [];
        if(cession){
            cessionText = [new Indent(cession.text)];
            cessionDocuments = [new Text(cession.document)];
            let prevCession = cession;
            while(prevCession.prevCessionId) {
                prevCession = await Cessions.findByPk(cession.prevCessionId, { attributes: ['text', 'prevCessionId', 'assigneeId', 'document']});
                cessionText.unshift(new Indent(prevCession.text));
                cessionDocuments.unshift(new Text(prevCession.document));
            }
            const firstCreditor = await Organizations.findByPk(prevCession.assigneeId, {attributes: ['name']});
            firstCreditorName = firstCreditor.name;
        }
    return {cessionText, cessionDocuments, firstCreditorName}
}