// Configuração pg-express
const pg = require('pg-promise')({});
const databaseConfig = {
    host: process.env.HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
}

const db = pg(databaseConfig);

module.exports = { db }