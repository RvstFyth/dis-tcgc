const db = require('../db').getConnection();

module.exports = {
    table: 'cards_pokemon',

    async get(ID) {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} WHERE id = ?`,
                [ID],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows[0]);
                }
            );
        });
    },

    async getForName(name) {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} WHERE \`name\` LIKE '%${name}%'`,
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
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

    async getTotalRecords() {
        return new Promise((resolve) => {
            db.query(
                `SELECT COUNT(*) AS total FROM ${this.table}`,
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

    async getDistinctSetNames() {
        return new Promise((resolve) => {
            db.query(
                `SELECT DISTINCT \`set\` FROM ${this.table} ORDER BY \`set\``,
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows.map((r) => r.set));
                }
            );
        });
    },

    async getCardsForSet(name) {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} WHERE \`set\` = ?`,
                [name],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async getCardsForSetForUser(name, userID) {
        return new Promise((resolve) => {
            db.query(
                `
                    SELECT cp.*, up.amount
                    FROM ${this.table} AS cp
                    LEFT JOIN users_cards_pokemon AS up ON up.card_id = cp.id AND up.user_id = ? 
                    WHERE cp.set = ?`,
                [userID, name],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async getCardsForSetForUserOwned(name, userID) {
        return new Promise((resolve) => {
            db.query(
                `
                    SELECT cp.*, up.amount
                    FROM ${this.table} AS cp
                    LEFT JOIN users_cards_pokemon AS up ON up.card_id = cp.id AND up.user_id = ? 
                    WHERE cp.set = ? AND up.amount > 0`,
                [userID, name],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async getCardsForSetForUserMissing(name, userID) {
        return new Promise((resolve) => {
            db.query(
                `
                    SELECT cp.*, up.amount
                    FROM ${this.table} AS cp
                    LEFT JOIN users_cards_pokemon AS up ON up.card_id = cp.id AND up.user_id = ? 
                    WHERE cp.set = ? AND (up.amount IS NULL OR up.amount < 1)`,
                [userID, name],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },
};
