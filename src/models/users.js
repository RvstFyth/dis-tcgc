const db = require('../db').getConnection();
const valuesHelper = require('../helpers/values');

module.exports = {
    table: 'users',

    create(discord_id) {
        return new Promise((resolve) => {
            db.query(
                'INSERT INTO users (`discord_id`, `created_timestamp`, last_drop) VALUES (?,?, 0)',
                [discord_id, valuesHelper.currentTimestamp()],
                (err, res) => {
                    if (err) {
                        console.log(err);
                        resolve(false);
                    } else resolve(res.insertId);
                }
            );
        });
    },

    async getAll() {
        return new Promise((resolve) => {
            db.query('SELECT * FROM `users` WHERE 1', (err, rows) => {
                if (err) console.log(err);
                else resolve(rows);
            });
        });
    },

    getForDiscordID(discord_id) {
        return new Promise((resolve) => {
            db.query(
                'SELECT * FROM users WHERE discord_id = ?',
                [discord_id],
                (err, results) => {
                    if (err) {
                        console.log(err);
                        resolve(false);
                    } else resolve(results[0]);
                }
            );
        });
    },

    getTotalRecords() {
        return new Promise((resolve) => {
            db.query(
                'SELECT COUNT(*) AS total FROM users WHERE 1',
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows[0].total);
                }
            );
        });
    },

    async addCoins(id, amount) {
        return new Promise((resolve) => {
            db.query(
                `UPDATE ${this.table} SET coins = coins + ? WHERE discord_id = ?`,
                [amount, id],
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },

    async setCoins(id, amount) {
        return new Promise((resolve) => {
            db.query(
                `UPDATE ${this.table} SET coins = ? WHERE discord_id = ?`,
                [amount, id],
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },

    async delete(id) {
        return new Promise((resolve) => {
            db.query(`DELETE FROM ${this.table} WHERE id = ?`, [id], (err) => {
                if (err) console.log(err);
                else resolve(true);
            });
        });
    },

    async getTopCoins(max = 7) {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} WHERE banned = 0 ORDER BY coins DESC LIMIT ${max}`,
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async updateUserName(id, value) {
        return new Promise((resolve) => {
            db.query(
                `UPDATE ${this.table} SET username = ? WHERE discord_id = ?`,
                [value, id],
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },
};
