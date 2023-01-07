module.exports = class DocxHeadBuilder {
    #header = [];
    #elementsBuilder;
    /**
     *
     * @param {DocxElementsBuilder} elementsBuilder
     */
    constructor(elementsBuilder) {
        this.#elementsBuilder = elementsBuilder;
    }

    addRow(text)
    {
        this.#header.push(this.#elementsBuilder.buildHeadParagraph(text));
    }

    addAddress(address)
    {
        this.#header.push(this.#elementsBuilder.buildHeadParagraph(`Адрес: ${address}`));
    }

    build()
    {
        return this.#header;
    }
}