const db = require('../db').getConnection();

module.exports = {
    table: 'binders',
    async create(userID, name) {
        return new Promise((resolve) => {
            db.query(
                `INSERT INTO ${this.table} (user_id, \`name\`) VALUES (?,?)`,
                [userID, name],
                (err, result) => {
                    if (err) console.log(err);
                    else resolve(result.insertId);
                }
            );
        });
    },

    async get(ID) {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} WHERE id = ?`,
                [ID],
                (err, result) => {
                    if (err) console.log(err);
                    else resolve(result[0]);
                }
            );
        });
    },

    async getForUser(ID, userID) {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} WHERE id = ? AND user_id = ?`,
                [ID, userID],
                (err, result) => {
                    if (err) console.log(err);
                    else resolve(result[0]);
                }
            );
        });
    },

    async getAllForUser(userID) {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} WHERE user_id = ?`,
                [userID],
                (err, result) => {
                    if (err) console.log(err);
                    else resolve(result);
                }
            );
        });
    },
};
