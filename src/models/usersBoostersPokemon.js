const db = require('../db').getConnection();

module.exports = {
    table: 'users_boosters_pokemon',
    async create(userID, booster) {
        return new Promise((resolve) => {
            db.query(
                `INSERT INTO ${this.table} (user_id, booster) VALUES (?,?)`,
                [userID, booster],
                (err, res) => {
                    if (err) console.log(err);
                    else resolve(res.insertId);
                }
            );
        });
    },

    async getSingleForUser(userID, booster) {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} WHERE user_id = ? AND booster = ? LIMIT 1`,
                [userID, booster],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows[0]);
                }
            );
        });
    },

    async getCountForUser(userID, booster) {
        return new Promise((resolve) => {
            db.query(
                `SELECT count(*) AS total FROM ${this.table} WHERE user_id = ? AND booster = ? LIMIT 1`,
                [userID, booster],
                (err, rows) => {
                    if (err) console.log(err);
                    else
                        resolve(
                            rows[0] && rows[0].total
                                ? parseInt(rows[0].total)
                                : 0
                        );
                }
            );
        });
    },

    async getAllForUserGrouped(userID) {
        return new Promise((resolve) => {
            db.query(
                `SELECT booster, COUNT(*) AS total FROM ${this.table} WHERE user_id = ? GROUP BY booster`,
                [userID],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async delete(ID) {
        return new Promise((resolve) => {
            db.query(`DELETE FROM ${this.table} WHERE id = ?`, [ID], (err) => {
                if (err) console.log(err);
                else resolve(true);
            });
        });
    },
};
