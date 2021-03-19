const db = require('../db').getConnection();
const valuesHelper = require('../helpers/values');
module.exports = {
    table: 'cooldowns',
    async create(userID) {
        return new Promise((resolve) => {
            db.query(
                `INSERT INTO ${this.table} (user_id) VALUES (?)`,
                [userID],
                (err, res) => {
                    if (err) console.log(err);
                    else resolve(res.insertId);
                }
            );
        });
    },

    async getFor(userID) {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} WHERE user_id = ?`,
                [userID],
                async (err, rows) => {
                    if (err) console.log(err);
                    else if (!rows[0]) {
                        await this.create(userID);
                        const res = this.getFor(userID);
                        resolve(res);
                    }
                    resolve(rows[0]);
                }
            );
        });
    },

    async setHourly(userID) {
        return new Promise((resolve) => {
            const ts = parseInt(valuesHelper.currentTimestamp()) + 3600;
            db.query(
                `UPDATE ${this.table} SET hourly = ? WHERE user_id = ?`,
                [ts, userID],
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },

    async setDaily(userID) {
        return new Promise((resolve) => {
            const ts = parseInt(valuesHelper.currentTimestamp()) + 86400;
            db.query(
                `UPDATE ${this.table} SET daily = ? WHERE user_id = ?`,
                [ts, userID],
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },
};
