const {Sequelize} = require('sequelize');
// const logger = require('simple-node-logger').createSimpleFileLogger(process.env.ROOT + '\\logs\\db.log');
// logger.setLevel('info');


module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        // logging: (sql)=>  null,
        logQueryParameters: false
    },
)