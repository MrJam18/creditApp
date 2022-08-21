const fs = require("fs");
const {mkDirWithCheck, syncMkDirWithCheck, mkDir} = require('./mkDirWithCheck')
const {contractsAddress} = require("../../constants/addresses");
function createDirs(path) {
    const checkFolders = path.split('/');
    let fullPath = process.cwd();
    checkFolders.forEach((folder)=> {
        fullPath = fullPath + '/' + folder;
        if(!fs.existsSync(fullPath)) fs.mkdirSync(fullPath);
    })
    return fullPath;
}
const createContractsDirs = (contractId) => {
    let fullPath = `${contractsAddress}/${contractId}`;
    const docsDir = fullPath + '/documents';
    const filesDir = fullPath + '/files';
    syncMkDirWithCheck(fullPath);
    syncMkDirWithCheck(docsDir);
    mkDir(docsDir + '/claims');
    mkDir(docsDir + '/orders');
    mkDir(docsDir + '/IPInits');
    mkDir(filesDir);
}

module.exports = {
    createDirs,
    createContractsDirs
}