const fileFactory = require("../classes/files/clientFiles/fileFactory");
const fs = require("fs");
const {contractsAddress} = require("../constants/addresses");
const FileConfig = require("../configs/FileConfig");
const Contracts = require("../models/documents/Contracts");
const ApiError = require("../error/apiError");


class FilesController {
    async uploadContractFile(req, res, next) {
        try{
            const data = req.body;
            const contractId = data.contractId;
            const file = req.files.file;
            const user = req.user;
            const factoryInstance = fileFactory[data.documentName];
            const instance = new fileFactory[data.documentName](file.data, contractId, factoryInstance.name);
            instance.createFile();
            await instance.createAction(user.id);
            if(data.changeStatus) await instance.changeStatus(user.groupId, user.id);
            res.json({status: 'ok'});
        }
        catch (e) {
            next(e);
        }
    }
    getExistingFiles(req, res, next) {
        try{
            const clientFiles = require('../constants/clientFiles');
            const data = {...clientFiles};
            const contractId = req.query.contractId;
            const existing = fs.readdirSync(`${contractsAddress}\\${contractId}\\files`, {withFileTypes: false});
            existing.forEach((el)=> {
                el = el.split('.')[0];
                data[el] = true;
            });
            res.json(data);
        }
        catch (e) {
            next(e);
        }

    }
    async getContractFile(req, res, next) {
        try {
        const data = req.query;
        const fileConfig = new FileConfig(`contracts\\${data.contractId}\\files\\${data.fileName}.pdf`);
        await fileConfig.downloadInClient(res);
        }
        catch(e) {
            next(e);
        }
    }
    async deleteContractFile(req, res, next)
    {
        try{
            const data = req.body;
            const contract = await Contracts.findByIdAndGroupId(data.contractId, req.user.groupId, ['id']);
            if(!contract) throw ApiError.UnauthorizedError();
            const config = new FileConfig(`contracts\\${data.contractId}\\files\\${data.fileName}.pdf`);
            if(!await config.checkFile()) throw new Error('Файла не существует');
            await config.deleteFile();
            res.json({status: 'ok'});
        }
        catch (e) {
            next(e);
        }
    }

}


module.exports = new FilesController();


