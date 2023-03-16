const fs = require("fs");
const {Packer} = require("docx");

class File
{
    path;
    buffer;
    #extension;
    exists = false;

    constructor(path, buffer, extension)
    {
        this.path = `${process.cwd()}/static/${path}`
        this.buffer = buffer;
        this.#extension = extension;
    }
    createFile()
    {
        let name;
        if(!this.fileName) name = Date.now();
        else name = this.fileName;
        this.path += `/${name}.${this.#extension}`;
        this.#changeSlashes();
        if(fs.existsSync(this.path)) this.exists = true;
        fs.writeFileSync(this.path, this.buffer);
        return this.path;
    }
    #changeSlashes()
    {
        this.path = this.path.replace(/\\/gi, '/');
    }

}
module.exports = File;