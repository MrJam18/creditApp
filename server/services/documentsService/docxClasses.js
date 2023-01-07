const { Paragraph, AlignmentType, TextRun, TableRow, TableCell, Table, HeightRule, ShadingType, VerticalAlign, WidthType, TabStopType, TabStopPosition } = require("docx");
const {getRusDate} = require("../../utils/dates/getRusDate");

//DEPRECATED! Use docxElementsBuilder instead!
class Head extends Paragraph{
    constructor(text){
        const head = {
            text: text,
            alignment: AlignmentType.RIGHT,
            indent: {
                left: 4000
            }
        }       
    super(head);
    }
}
class Header extends Paragraph {
    constructor(text){
        const element = {
            alignment: AlignmentType.CENTER,
            spacing: {
                before: 200
            },
            children: [new TextRun({
                text,
                bold: true
            })]
        }
        super(element)
    }
}
class HeaderWithoutBreaks extends Paragraph {
    constructor(text) {
        const element = {
            alignment: AlignmentType.CENTER,
            children: [new TextRun({
                text,
                bold: true
            })]
        }
        super(element)
    }
}
class Indent extends Paragraph {
    constructor(text){
        const element = {
            text,
            indent:{
                firstLine: 800
            }
        }
        super(element)
    }
}
class Text extends Paragraph {
    constructor(text){
        super({
            text
        })
    }
}
class Bold extends Paragraph {
    constructor(text){
            super({
            children: [new TextRun({
            text,
            bold: true
        })]
        })
    }
}
class BoldWithTopBreak extends Paragraph {
    constructor(text){
        super({
            spacing: {
                before: 300,
            },
            children: [new TextRun({
            text,
            bold: true
        })]
        })
    }

}
class Signature extends Paragraph {
    constructor(name){
        const now = getRusDate();
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
                text: `${now} г. \t _____________ ${name}`,
            })] 
        })
    }
}

const table = (rows) => ({
    children: [
        new Table({
            rows
        })
    ]
})
class TableText extends TextRun {
    constructor(text) {
        const textObj = {
            text,
            size: 16
        }
        super(textObj)
    }
}

class Row extends TableRow{
    constructor(cellsArray){
        const cells = cellsArray.reduce((acc, el)=>{
            if(typeof el === 'number') el = String(el);
            const cell = new TableCell({
                margins:{
                    left: 100, right: 100, top: 100, bottom: 100
                },
                children: [new Paragraph({
                    alignment: 'right',
                    children: [new TableText(el)]
                })],
            })
            acc.push(cell);
            return acc;
        }, [])

        const row = {
            cantSplit: true,
            children: cells
        }
        super(row);
    }
}
class CustomRow extends TableRow{
    constructor(cellsArray){
        const row = {
            cantSplit: true,
            children: cellsArray
        }
        super(row);
    }
}
class Cell extends TableCell {
    constructor(text) {
        if(typeof text === 'number') text = String(text);
            const cell = {
                margins:{
                    left: 100, right: 100, top: 100, bottom: 100
                },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({
                    alignment: 'right',
                    children: [new TableText(text)]
                })],
            }
            super(cell)
    }
}
class Merged3Cell extends TableCell {
    constructor(text) {
        if(typeof text === 'number') text = String(text);
            const cell = {
                margins:{
                    left: 100, right: 100, top: 100, bottom: 100
                },
                columnSpan: 3,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({
                    alignment: 'center',
                    children: [new TableText(text)]
                })],
            }
            super(cell)
    }
}

class HeaderCell extends TableCell {
    constructor(value){
        if(typeof value === 'number') value = String(value);
            const cell = {
                margins:{
                        bottom: 150,
                        left: 150,
                        right: 150,
                    },
                verticalAlign: VerticalAlign.BOTTOM,
                shading: {
                    fill: "ededed",
                    type: ShadingType.PERCENT_30,
                    color: "ededed",
                },
                children: [new Paragraph({
                    alignment: 'center',
                    children: [new TableText(value)]
                })],
            }
            super(cell)
    }
    
}
// 
class HeaderRow extends TableRow {
    constructor(cellsArray){
        const row = {
            height: {
                rule: HeightRule.EXACT,
                value: 500
            },
            children: cellsArray
        }
        super(row);
    }
}
class FormulaCell extends TableCell {
    constructor(value){
        if(typeof value === 'number') el = String(value);
            const cell = {
                margins:{
                        bottom: 150,
                        left: 150,
                        right: 150,
                    },
                verticalAlign: VerticalAlign.BOTTOM,
                shading: {
                    fill: "ededed",
                    type: ShadingType.PERCENT_30,
                    color: "ededed",
                },
                width:{
                    size: 1500,
                    type: WidthType.DXA
                },
                children: [new Paragraph({
                    alignment: 'center',
                    children: [new TableText(value)]
                })],
            }
            super(cell)
    }
    
}
class CountResult extends TableCell {
    constructor(text) {
        if(typeof text === 'number') text = String(text);
            const cell = {
                margins:{
                    left: 100, right: 100, top: 100, bottom: 100
                },
                columnSpan: 7,
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({
                    alignment: 'right',
                    children: [new TextRun({
                        text,
                        size: 20
                    })]
                })],
            }
            super(cell)
    }
}
class TableHeader extends Paragraph {
    constructor(text){
        super({
            spacing: {
                after: 150,
            },
            indent:{
                firstLine: 800
            },
            text,
        //     // children: [new TextRun({
        //     // text,
        //     // bold: true
        // })]
        })
    }

}

module.exports = {Head, Header, HeaderWithoutBreaks, Indent, Text, Bold, BoldWithTopBreak, Signature, Row, HeaderRow, table, HeaderCell, FormulaCell, CustomRow, Merged3Cell, Cell, CountResult, TableHeader }