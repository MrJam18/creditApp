const {Document} = require("docx");
const DocxHeadBuilder = require("./DocxHeadBuilder");
const DocxFooterBuilder = require("./DocxFooterBuilder");
const DocxBodyBuilder = require("./DocxBodyBuilder");
const DocxElementsBuilder = require("./DocxElementsBuilder");


module.exports = class DocxDocumentBuilder {
    #document;
    constructor(options) {
        const docxElementsBuilder = new DocxElementsBuilder(options);
        this.header = new DocxHeadBuilder(docxElementsBuilder);
        this.footer = new DocxFooterBuilder(docxElementsBuilder);
        this.body = new DocxBodyBuilder(docxElementsBuilder);
        this.#document = {
            sections: [{
                children: []
            }],
            creator: 'creditApp'
        }
    }

    build()
    {
        const header = this.header.build();
        const body = this.body.build();
        const footer = this.footer.build();
        this.#document.sections[0].children = header.concat(body, footer);
        return new Document(this.#document);
    }

}