const fs = require("fs");

module.exports = class FileConfig
{
    filesPath = process.env.ROOT + '\\static\\';
    fullPath;
    path;
        constructor(path) {
        this.path = path;
        this.fullPath = this.filesPath + path;
    }
    async downloadInClient(res)
    {
        res.download(this.fullPath);
    }
    deleteFile()
    {
            fs.unlinkSync(this.fullPath);
    }
    deleteFolder()
    {
            fs.rmSync(this.fullPath, {recursive: true});
    }
    createFolder()
    {
        fs.mkdir(this.fullPath, undefined, (err)=> { if (err) throw err;});
    }

     checkFile()
    {
        return fs.existsSync(this.fullPath);
    }

}