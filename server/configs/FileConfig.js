const fs = require("fs");

module.exports = class FileConfig
{
    filesPath = 'D:\\CreditApp\\server\\static\\';
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
    async deleteFile()
    {
        await fs.unlink(this.fullPath, (err) => {
            if (err) throw err;
        });
    }

}