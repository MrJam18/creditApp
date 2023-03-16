const File = require("./File");
const {Packer} = require("docx");
const {contractsFolder} = require("../../utils/adresses");

class Docx extends File
{
 document;
 constructor(path, document) {
  super(contractsFolder + path, undefined, 'docx');
  this.document = document;
 }

 async getBuffer()
 {
  this.buffer = await Packer.toBuffer(this.document);
  return this.buffer;
 }
}

module.exports = Docx;