const {Indent} = require("../../services/documentsService/docxClasses");
module.exports = class Indents
{
    list = [];
    addIndent(indent)
    {
        this.list.push( new Indent(indent))
    }
    addIndents(list)
    {
        if(list){
            list.forEach((el)=>{
                this.list.push(new Indent(el))
            })
        }
    }
}