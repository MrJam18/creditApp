const DBConstantsFinder = require("../DBConstantsFinder");

const executiveDocTypesArray = [
    { id:1, name: 'Судебный приказ' },
    { id: 2, name: 'Исполнительный лист'}
];

module.exports = new DBConstantsFinder(executiveDocTypesArray);