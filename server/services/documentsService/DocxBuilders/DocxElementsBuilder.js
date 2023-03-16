const {TextRun, Paragraph, AlignmentType, TabStopType, TabStopPosition} = require("docx");
const {getRusDate} = require("../../../utils/dates/getRusDate");
const bigSize = 22;

class BigTextRun extends TextRun {
    constructor(text, bold = false) {
        const textObj = {
            text,
            size: bigSize,
            bold
        }
        super(textObj)
    }
}

class NormalTextRun extends TextRun {
    constructor(text, bold = false) {
        const textObj = {
            text,
            bold
        }
        super(textObj)
    }
}



module.exports = class DocxElementsBuilder
{

    #TextRun
    /**
     *
     * @param {{bigText: boolean}} options
     */
    constructor(options = {}) {
        if(options.bigText) this.#TextRun = BigTextRun;
        else this.#TextRun = NormalTextRun;
    }

    buildHeadParagraph(text)
    {
        return new Paragraph({
            alignment: AlignmentType.RIGHT,
            indent: {
                left: 4000
            },
            children: [
                new this.#TextRun(text)
            ]
        });
    }
    buildHeader(text)
    {
        return new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: {
                    before: 200
                },
                children: [new this.#TextRun(text, true)]
        });
    }

    buildHeaderWithoutBreaks(text)
    {
        return new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new this.#TextRun(text, true)]
        });
    }

    buildParagraphWithIndent(text)
    {
        return new Paragraph({
            indent:{
                firstLine: 800
            },
            children: [new this.#TextRun(text)]
        })
    }
    buildParagraph(text)
    {
        return new Paragraph({
            children: [new this.#TextRun(text)]
        })
    }
    buildBoldParagraph(text)
    {
        return new Paragraph({
            children: [new this.#TextRun(text, true)]
        })
    }
    buildBoldParagraphWithTopBreak(text)
    {
        return new Paragraph({
            spacing: {
                before: 300,
            },
            children: [new this.#TextRun(text, true)]
        })
    }
    buildSignature(name)
    {
        const now = getRusDate();
        return new Paragraph({
            spacing: {
                before: 400,
            },
            tabStops: [
                {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                },
                {
                    type: TabStopType.LEFT,
                },
            ],
            children: [new this.#TextRun(`${now} г. \t _____________ ${name}`)]
        })
    }

}