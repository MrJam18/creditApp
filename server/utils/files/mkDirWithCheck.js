const fs = require('fs');

const syncMkDirWithCheck = (path) => {
    if(!fs.existsSync(path)) fs.mkdirSync(path);
}

const mkDirWithCheck = async (path ) => {
    if(!fs.existsSync(path)) await fs.mkdir(path, undefined, (err)=> {
        if (err) throw err
    });
}
const mkDir = async (path) => {
    await fs.mkdir(path, undefined, (err)=> {
        if (err) throw err
    });
}

module.exports = {
    syncMkDirWithCheck,
    mkDirWithCheck,
    mkDir
}