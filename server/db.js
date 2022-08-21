const {Sequelize} = require('sequelize');
const log = require('simple-node-logger').createSimpleLogger();
log.setLevel('error');


module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: log.debug()
    }
)