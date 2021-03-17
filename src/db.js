const mysql = require('mysql');
const config = require('./config');

let pool;

module.exports = {
    init() {
        pool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: config.mysql_user,
            password: config.mysql_password,
            database: config.mysql_database,
            supportBigNumbers: true,
            bigNumberStrings: true,
        });
    },

    getConnection() {
        if (!pool) console.log('Database module not initialized yet');
        else return pool;
    },
};
