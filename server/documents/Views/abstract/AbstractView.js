const DocxDocumentBuilder = require("../../../services/documentsService/DocxBuilders/DocxDocumentBuilder");

module.exports = class AbstractView {

    constructor(options) {
    this._document = new DocxDocumentBuilder(options);
    }


}