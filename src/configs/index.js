require('dotenv').config();

const APP_STORE = new Map();

const postgresDBConfig = {
    "local": {
        "host": process.env.DB_HOST,
        "user": process.env.DB_USERNAME,
        "database": process.env.DB_NAME,
        "password": process.env.DB_PASSWORD,
        "port": process.env.DB_PORT,
        "ssl": process.env.DB_SSL,
    },
    "test": {}, // Test database config goes here
    "prod": {}, // Production database config goes here
};
APP_ENV = process.env.APP_ENV || 'local';
APP_STORE.set('dbConfig', postgresDBConfig[APP_ENV]);

module.exports = {
    APP_STORE,
    APP_ENV,
}