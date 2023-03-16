const {Text} = require("../../services/documentsService/docxClasses");
module.exports = class Enclosures
{
    list = [];

    addEnclosure(enclosure)
    {
        this.list.push( new Text(`- ${enclosure};`))
    }
    addEnclosures(list)
    {
        if(list){
            list.forEach((el)=>{
                this.list.push(new Text(`- ${el};`))
            })
        }
    }

}