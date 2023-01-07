module.exports = class DocxBodyBuilder
{
    #document = [];
    #elementsBuilder;

    /**
     *
     * @param {DocxElementsBuilder} elementsBuilder
     */
    constructor(elementsBuilder)
    {
        this.#elementsBuilder = elementsBuilder;
    }

    addRow(text)
    {
            this.#document.push(this.#elementsBuilder.buildParagraph(text));
    }

    addIndentRow(text)
    {
        this.#document.push(this.#elementsBuilder.buildParagraphWithIndent(text));
    }

    addBodyHeader(text)
    {
        this.#document.push(this.#elementsBuilder.buildHeader(text + '.'));
    }

    build()
    {
        return this.#document;
    }

}