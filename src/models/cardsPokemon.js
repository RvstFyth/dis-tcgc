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

    async getRandomForRarity(rarity) {
        return new Promise((resolve) => {
            let extension;
            if (rarity === 'rare') extension = `LOWER(rarity) LIKE '%rare%'`;
            else extension = `LOWER(rarity) = '${rarity}'`;
            db.query(
                `SELECT * FROM ${this.table} WHERE ${extension} ORDER BY RAND() LIMIT 1`,
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows[0]);
                }
            );
        });
    },

    async getRandomForSet(set) {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} WHERE \`set\` = ? ORDER BY RAND() LIMIT 1`,
                [set],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows[0]);
                }
            );
        });
    },
    async getRandomForSetAndRarity(set, rarity) {
        return new Promise((resolve) => {
            let extension;
            if (rarity === 'rare') extension = `LOWER(rarity) LIKE '%rare%'`;
            else extension = `LOWER(rarity) = '${rarity}'`;
            db.query(
                `SELECT * FROM ${this.table} WHERE \`set\` = ? AND ${extension} ORDER BY RAND() LIMIT 1`,
                [set],
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

    async getCardsForSetForUser(name, userID, rarity = null, type = null) {
        let extension = '';
        if (rarity) {
            if (rarity === 'rare') extension += ` AND cp.rarity LIKE '%rare%'`;
            else extension += ` AND cp.rarity = '${rarity}'`;
        }
        if (type) {
            extension += ` AND cp.types LIKE '%${type}%'`;
        }
        return new Promise((resolve) => {
            db.query(
                `
                    SELECT cp.*, up.amount
                    FROM ${this.table} AS cp
                    LEFT JOIN users_cards_pokemon AS up ON up.card_id = cp.id AND up.user_id = ? 
                    WHERE cp.set = ? ${extension}`,
                [userID, name],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async getCardsForSetForUserDuplicates(
        name,
        userID,
        rarity = null,
        type = null
    ) {
        let extension = '';
        if (rarity) {
            if (rarity === 'rare') extension += ` AND cp.rarity LIKE '%rare%'`;
            else extension += ` AND cp.rarity = '${rarity}'`;
        }

        if (type) {
            extension += ` AND cp.types LIKE '%${type}%'`;
        }

        return new Promise((resolve) => {
            db.query(
                `
                    SELECT cp.*, up.amount
                    FROM ${this.table} AS cp
                    LEFT JOIN users_cards_pokemon AS up ON up.card_id = cp.id AND up.user_id = ? 
                    WHERE cp.set = ? AND up.amount > 1 ${extension}`,
                [userID, name],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async getCardsForSetForUserOwned(name, userID, rarity = null, type = null) {
        return new Promise((resolve) => {
            let extension = '';
            if (rarity) {
                if (rarity === 'rare')
                    extension += ` AND cp.rarity LIKE '%rare%'`;
                else extension += ` AND cp.rarity = '${rarity}'`;
            }
            if (type) {
                extension += ` AND cp.types LIKE '%${type}%'`;
            }

            db.query(
                `
                    SELECT cp.*, up.amount
                    FROM ${this.table} AS cp
                    LEFT JOIN users_cards_pokemon AS up ON up.card_id = cp.id AND up.user_id = ? 
                    WHERE cp.set = ? AND up.amount > 0 ${extension}`,
                [userID, name],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async getCardsForSetForUserMissing(
        name,
        userID,
        rarity = null,
        type = null
    ) {
        let extension = '';
        if (rarity) {
            if (rarity === 'rare') extension += ` AND cp.rarity LIKE '%rare%'`;
            else extension += ` AND cp.rarity = '${rarity}'`;
        }

        if (type) {
            extension += ` AND cp.types LIKE '%${type}%'`;
        }

        return new Promise((resolve) => {
            db.query(
                `
                    SELECT cp.*, up.amount
                    FROM ${this.table} AS cp
                    LEFT JOIN users_cards_pokemon AS up ON up.card_id = cp.id AND up.user_id = ? 
                    WHERE cp.set = ? AND (up.amount IS NULL OR up.amount < 1) ${extension}`,
                [userID, name],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async getDistinctTypes() {
        return new Promise((resolve) => {
            db.query(
                `SELECT DISTINCT \`types\` FROM ${this.table} WHERE \`types\` != ''`,
                (err, rows) => {
                    if (err) console.log(err);
                    else {
                        const res = [];
                        for (let i in rows) {
                            const parsed = rows[i].types.split('|');
                            for (let j in parsed) {
                                if (res.indexOf(parsed[j]) < 0)
                                    res.push(parsed[j]);
                            }
                        }

                        res.sort((a, b) => a.localeCompare(b));
                        resolve(res);
                    }
                }
            );
        });
    },
};
