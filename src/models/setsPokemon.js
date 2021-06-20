const db = require('../db').getConnection();

module.exports = {
    table: `sets_pokemon`,

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
    async getAll() {
        return new Promise((resolve) => {
            db.query(`SELECT * FROM ${this.table}`, (err, result) => {
                if (err) console.log(err);
                else resolve(result);
            });
        });
    },
    async getForName(name) {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} WHERE \`name\` = ?`,
                [name],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows[0]);
                }
            );
        });
    },

    async getRandom() {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} ORDER BY RAND() LIMIT 1`,
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows[0]);
                }
            );
        });
    },
};
