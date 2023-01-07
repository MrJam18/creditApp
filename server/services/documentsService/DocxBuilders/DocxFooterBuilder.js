const getSurnameAndInititals = require("../../../utils/getSurnameAndInititals");
module.exports = class DocxFooterBuilder {
    #footer = [];
    #footerHeader = null;
    #elementsBuilder
    signature = null;

    /**
     *
     * @param {DocxElementsBuilder} elementsBuilder
     */
    constructor(elementsBuilder) {
        this.#elementsBuilder = elementsBuilder;
        this.#footerHeader = this.#elementsBuilder.buildBoldParagraphWithTopBreak('Приложение:');
    }
    addRow(text) {
        this.#footer.push(`- ${text};`);
    }
    addSignature(nameHolder)
    {
        this.signature = this.#elementsBuilder.buildSignature(getSurnameAndInititals(nameHolder));
    }

    build()
    {
        let footer = [...this.#footer];
        const last = footer.length - 1;
        footer[last] = footer[last].replace(';', '.');
        footer = footer.map((el)=> this.#elementsBuilder.buildParagraph(el));
        footer.unshift(this.#footerHeader);
        if(this.signature) footer.push(this.signature);
        return footer;
    }
}