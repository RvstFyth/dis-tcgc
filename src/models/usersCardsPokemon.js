const db = require('../db').getConnection();

module.exports = {

    table: 'users_cards_pokemon',

    async create(userID, cardID, amount = 1)
    {
        return new Promise(resolve => {
            db.query(`INSERT INTO ${this.table} (user_id, card_id, amount) VALUES (?,?,?)`, [userID, cardID, amount], (err, res) => {
                if(err) console.log(err);
                else resolve(res.insertId);
            })
        });
    },

    async getForUserPaginated(userID, offset, limit)
    {
        return new Promise(resolve => {
            db.query(`
                        SELECT uc.*, cp.name, cp.id, cp.set FROM ${this.table} AS uc
                        INNER JOIN cards_pokemon AS cp ON uc.card_id = cp.id 
                        WHERE user_id = ? LIMIT ?, ?
                        `,
                [userID, offset, limit], (err, rows) => {
                    if(err) console.log(err);
                    else resolve(rows);
            });
        });
    },

    async getRecordsCountForUser(userID)
    {
        return new Promise(resolve => {
            db.query(`SELECT COUNT(*) AS total FROM ${this.table} WHERE user_id = ?`, [userID], (err, rows) => {
                if(err) console.log(err);
                else resolve(rows[0] && rows[0].total ? parseInt(rows[0].total) : 0);
            });
        });
    },
};