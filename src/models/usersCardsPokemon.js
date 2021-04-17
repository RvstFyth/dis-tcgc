const db = require('../db').getConnection();

module.exports = {
    table: 'users_cards_pokemon',

    async create(userID, cardID, amount = 1) {
        return new Promise((resolve) => {
            db.query(
                `INSERT INTO ${this.table} (user_id, card_id, amount) VALUES (?,?,?)`,
                [userID, cardID, amount],
                (err, res) => {
                    if (err) console.log(err);
                    else resolve(res.insertId);
                }
            );
        });
    },

    async add(userID, cardID, amount) {
        const existing = await this.getForUser(userID, cardID);
        if (existing) return this.addAmount(userID, cardID, amount);
        else return this.create(userID, cardID, amount);
    },

    async addAmount(userID, cardID, amount) {
        return new Promise((resolve) => {
            db.query(
                `UPDATE ${this.table} SET amount = amount + ? WHERE user_id = ? AND card_id = ?`,
                [amount, userID, cardID],
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },

    async setAmount(userID, cardID, amount) {
        if (amount < 1) return this.deleteFor(userID, cardID);
        return new Promise((resolve) => {
            db.query(
                `UPDATE ${this.table} SET amount = ? WHERE user_id = ? AND card_id = ?`,
                [amount, userID, cardID],
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },

    async deleteFor(userID, cardID) {
        return new Promise((resolve) => {
            db.query(
                `DELETE FROM ${this.table} WHERE user_id = ? AND card_id = ?`,
                [userID, cardID],
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },

    async getForUser(userID, cardID) {
        return new Promise((resolve) => {
            db.query(
                `
                        SELECT uc.*, cp.name, cp.id, cp.set FROM ${this.table} AS uc
                        INNER JOIN cards_pokemon AS cp ON uc.card_id = cp.id 
                        WHERE user_id = ? AND card_id = ?
                        `,
                [userID, cardID],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows[0]);
                }
            );
        });
    },

    async getForUserAndRarity(userID, rarity) {
        let extension;
        if (rarity === 'rare') extension = ` AND cp.rarity LIKE '%$rare%'`;
        else extension = ` AND cp.rarity = ${rarity}`;

        return new Promise((resolve) => {
            db.query(
                `
                        SELECT uc.*, cp.name, cp.id, cp.set FROM ${this.table} AS uc
                        INNER JOIN cards_pokemon AS cp ON uc.card_id = cp.id 
                        WHERE user_id = ? ${extension}
                        `,
                [userID],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async getDuplicatesForUser(userID) {
        return new Promise((resolve) => {
            db.query(
                `
                        SELECT uc.*, cp.name, cp.id, cp.set FROM ${this.table} AS uc
                        INNER JOIN cards_pokemon AS cp ON uc.card_id = cp.id 
                        WHERE user_id = ? AND uc.amount > 0
                        `,
                [userID],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async getTotalDuplicatesForUser(userID) {
        return new Promise((resolve) => {
            db.query(
                `
                        SELECT COUNT(*) AS total FROM ${this.table} AS uc
                        INNER JOIN cards_pokemon AS cp ON uc.card_id = cp.id 
                        WHERE user_id = ? AND uc.amount > 1
            `,
                [userID],
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

    async getTotalForUserAndRarity(userID, rarity) {
        let extension;
        if (rarity === 'rare') extension = ` AND cp.rarity LIKE '%rare%'`;
        else extension = ` AND cp.rarity = '${rarity}'`;

        return new Promise((resolve) => {
            db.query(
                `
                        SELECT COUNT(*) AS total FROM ${this.table} AS uc
                        INNER JOIN cards_pokemon AS cp ON uc.card_id = cp.id 
                        WHERE user_id = ? ${extension}
            `,
                [userID],
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

    async getDuplicatesForUserPaginated(userID, offset, limit) {
        return new Promise((resolve) => {
            db.query(
                `
                        SELECT uc.*, cp.name, cp.id, cp.set FROM ${this.table} AS uc
                        INNER JOIN cards_pokemon AS cp ON uc.card_id = cp.id 
                        WHERE user_id = ? AND uc.amount > 1 LIMIT ?, ?
                        `,
                [userID, offset, limit],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async getDuplicatesForUserAndSetAndRarity(userID, set, rarity) {
        let extension;
        if (rarity === 'rare') extension = ` AND cp.rarity LIKE '%rare%'`;
        else extension = ` AND cp.rarity = '${rarity}'`;

        return new Promise((resolve) => {
            db.query(
                `
                    SELECT uc.*, cp.name, cp.id, cp.set, cp.rarity FROM ${this.table} AS uc
                    INNER JOIN cards_pokemon AS cp ON uc.card_id = cp.id 
                    WHERE user_id = ? AND uc.amount > 1 AND cp.set = ? ${extension}
                `,
                [userID, set],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async getForUserPaginated(userID, offset, limit) {
        return new Promise((resolve) => {
            db.query(
                `
                        SELECT uc.*, cp.name, cp.id, cp.set FROM ${this.table} AS uc
                        INNER JOIN cards_pokemon AS cp ON uc.card_id = cp.id 
                        WHERE user_id = ? LIMIT ?, ?
                        `,
                [userID, offset, limit],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async getRecordsCountForUser(userID) {
        return new Promise((resolve) => {
            db.query(
                `SELECT COUNT(*) AS total FROM ${this.table} WHERE user_id = ?`,
                [userID],
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

    async getRecordsCountForUserAndSet(userID, set) {
        return new Promise((resolve) => {
            db.query(
                `SELECT COUNT(*) AS total FROM ${this.table} WHERE user_id = ? AND \`set\` = ?`,
                [userID, set],
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

    async getTotalCollectedForUser(userID) {
        return new Promise((resolve) => {
            db.query(
                `SELECT SUM(amount) AS total FROM ${this.table} WHERE user_id = ?`,
                [userID],
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

    async getTotalCollected() {
        return new Promise((resolve) => {
            db.query(
                `SELECT SUM(amount) AS total FROM ${this.table}`,
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
};
