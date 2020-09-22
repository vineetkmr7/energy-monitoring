const result = require('dotenv').config();
if (result.error) {
    throw result.error
}

// console.log(result.parsed)

let CONFIG = {};

CONFIG.app = process.env.APP || 'dev';
CONFIG.APP_URL = process.env.APP_URL;
CONFIG.port = process.env.PORT || '3000';
CONFIG.node_env = process.env.NODE_ENV;

CONFIG.development = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'mongodb+srv',
        cluster: process.DB_CLUSTER || 'cluster0.ubyuw.mongodb.net',
        username: process.env.DB_USERNAME || 'admin',
        password: process.env.DB_PASS || 'admin',
        name: process.env.DB_NAME || 'energy-monitoring-db',
    },
    jwt_encryption: process.env.JWT_ENCRYPTION || 'energy-monitoring-api-key',
    jwt_expiration: process.env.JWT_EXPIRATION || '10000'
};
CONFIG.production = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'mongodb+srv',
        cluster: process.DB_CLUSTER || 'cluster0.ubyuw.mongodb.net',
        username: process.env.DB_USERNAME || 'admin',
        password: process.env.DB_PASS || 'admin',
        name: process.env.DB_NAME || 'energy-monitoring-db',
    },
    jwt_encryption: process.env.JWT_ENCRYPTION || 'energy-monitoring-api-key',
    jwt_expiration: process.env.JWT_EXPIRATION || '10000'
};
CONFIG.test = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'mongodb+srv',
        cluster: process.DB_CLUSTER || 'cluster0.ubyuw.mongodb.net',
        username: process.env.DB_USERNAME || 'admin',
        password: process.env.DB_PASS || 'admin',
        name: process.env.DB_NAME || 'energy-monitoring-db-test',
    },
    jwt_encryption: process.env.JWT_ENCRYPTION || 'energy-monitoring-api-key',
    jwt_expiration: process.env.JWT_EXPIRATION || '10000'
};
module.exports = CONFIG;