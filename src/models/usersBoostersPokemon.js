const db = require('../db').getConnection();

module.exports = {
    table: 'boosters2',
    async create(userID, booster, amount = 1) {
        return new Promise((resolve) => {
            db.query(
                `INSERT INTO ${this.table} (user_id, set_id, amount) VALUES (?,?,?)`,
                [userID, booster, amount],
                (err, res) => {
                    if (err) console.log(err);
                    else resolve(res.insertId);
                }
            );
        });
    },

    async getSingleForUser(userID, setID) {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} WHERE user_id = ? AND set_id = ? LIMIT 1`,
                [userID, setID],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows[0]);
                }
            );
        });
    },

    async getCountForUser(userID, setID) {
        return new Promise((resolve) => {
            db.query(
                `SELECT count(*) AS total FROM ${this.table} WHERE user_id = ? AND set_id = ? LIMIT 1`,
                [userID, setID],
                (err, rows) => {
                    if (err) console.log(err);
                    else
                        resolve(
                            rows[0] && rows[0].amount
                                ? parseInt(rows[0].amount)
                                : 0
                        );
                }
            );
        });
    },

    async getAllForUserGrouped(userID) {
        return new Promise((resolve) => {
            db.query(
                `SELECT sp.name, bst.*, sp.id AS set_id
                FROM ${this.table} AS bst
                INNER JOIN sets_pokemon AS sp ON bst.set_id = sp.id
                WHERE bst.user_id = ? GROUP BY sp.name`,
                [userID],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async setAmount(ID, amount) {
        return new Promise((resolve) => {
            db.query(
                `UPDATE ${this.table} SET amount = ? WHERE id = ?`,
                [amount, ID],
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
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
