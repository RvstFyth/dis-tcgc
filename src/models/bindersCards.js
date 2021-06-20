const db = require('../db').getConnection();

module.exports = {
    table: 'binders_cards',
    async create(binderID, cardID) {
        return new Promise((resolve) => {
            db.query(
                `INSERT INTO ${this.table} (binder_id, card_id) VALUES (?,?)`,
                [binderID, cardID],
                (err, result) => {
                    if (err) console.log(err);
                    else resolve(result.insertId);
                }
            );
        });
    },

    async delete(binderID, cardID) {
        return new Promise((resolve) => {
            db.query(
                `DELETE FROM ${this.table} WHERE binder_id = ? AND card_id = ?`,
                [binderID, cardID],
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },

    async getAllForBinder(binderID) {
        return new Promise((resolve) => {
            db.query(
                `SELECT bc.*, pc.name, pc.set FROM ${this.table} AS bc INNER JOIN cards_pokemon AS pc ON pc.id = bc.card_id WHERE bc.binder_id = ?`,
                [binderID],
                (err, result) => {
                    if (err) console.log(err);
                    else resolve(result);
                }
            );
        });
    },

    async recordExists(binderID, cardID) {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} WHERE binder_id = ? AND card_id = ?`,
                [binderID, cardID],
                (err, result) => {
                    if (err) console.log(err);
                    else resolve(result.length && result.length > 0);
                }
            );
        });
    },
};
