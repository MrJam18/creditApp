const {Groups, CreditorTypes, ExecutiveDocTypes, CourtLevels, CourtTypes, ActionObjects, ActionTypes, Statuses,
  ContractTypes
} = require("./models/connections");
const userService = require('./services/userService');
const sequelize = require('./db');
const {PassportTypes} = require("./models/PassportType");
const creditorTypes = require('./constants/dataBase/creditorTypes');
const passportTypes = require('./constants/dataBase/passportTypes');
const executiveDocTypes = require('./constants/dataBase/executiveDocTypes');
const courtLevels = require('./constants/dataBase/courtLevels');
const courtTypes = require('./constants/dataBase/courtTypes');
const actionObjects = require('./constants/dataBase/actionObjects');
const actionTypes = require('./constants/dataBase/actionTypes');
const statuses = require('./constants/dataBase/statuses');
const contractTypes = require('./constants/dataBase/contractTypes');
const FileConfig = require("./configs/FileConfig");

const fixture = async () => {
  await sequelize.sync({force: true});
  const contractsFolder = new FileConfig('contracts');
  contractsFolder.deleteFolder();
  contractsFolder.createFolder();
  Groups.create({name: 'test'});
  userService.registration('mr.jam18@yandex.ru', '7262dD4600', 'admin', 'Jamil', 'Mamedov', 'admin', 1);
  CreditorTypes.bulkCreate(creditorTypes);
  PassportTypes.bulkCreate(passportTypes);
  ExecutiveDocTypes.bulkCreate(executiveDocTypes.data);
  CourtLevels.bulkCreate(courtLevels);
  CourtTypes.bulkCreate(courtTypes);
  ActionObjects.bulkCreate(actionObjects);
  ActionTypes.bulkCreate(actionTypes);
  Statuses.bulkCreate(statuses);
  ContractTypes.bulkCreate(contractTypes);
}

module.exports = {fixture};