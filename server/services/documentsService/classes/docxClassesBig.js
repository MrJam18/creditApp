const { TextRun, Paragraph, AlignmentType, TabStopPosition, TabStopType } = require("docx");
const bigSize = 22;


//DEPRECATED! Use docxElementsBuilder instead!
class BigTextRun extends TextRun {
    constructor(text) {
        const textObj = {
            text,
            size: bigSize
        }
        super(textObj)
    }
}
class BigHead extends Paragraph{
    constructor(text){
        const head = {
            alignment: AlignmentType.RIGHT,
            indent: {
                left: 4000
            },
            children: [new BigTextRun(text)]
        }       
    super(head);
    }
}
class BigHeader extends Paragraph {
    constructor(text){
        const element = {
            alignment: AlignmentType.CENTER,
            spacing: {
                before: 200
            },
            children: [new TextRun({
                text,
                bold: true,
                size: bigSize,
            })]
        }
        super(element)
    }
}
class BigIndent extends Paragraph {
    constructor(text){
        const element = {
            alignment: AlignmentType.BOTH,
            indent:{
                firstLine: 800
            },
            children: [new BigTextRun(text)]
        }
        super(element)
    }
}
class BigBoldWithTopBreak extends Paragraph {
    constructor(text){
        super({
            spacing: {
                before: 300,
            },
            children: [new TextRun({
            text,
            bold: true,
            size: bigSize
        })]
        })
    }

}
class BigSignature extends Paragraph {
    constructor(name){
        super({
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
            children: [new TextRun({
                text: `«__»_________.20__ г. \t _____________ ${name}`,
                size: bigSize
            })] 
        })
    }
}
class BigText extends Paragraph {
    constructor(text){
        super({
            children: [new BigTextRun(text)]
        })
    }
}

module.exports = {
    BigText, BigHead, BigHeader, BigIndent, BigBoldWithTopBreak, BigSignature
}