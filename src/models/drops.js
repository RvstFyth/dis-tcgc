const db = require('../db').getConnection();
const valuesHelper = require('../helpers/values');

module.exports = {
    table: 'drops',
    async create(userID, guildID, channelID, card, coins) {
        return new Promise((resolve) => {
            const values = [
                userID,
                guildID,
                channelID,
                card,
                coins,
                valuesHelper.currentTimestamp(),
            ];
            db.query(
                `INSERT INTO ${this.table} (user_id, guild_id, channel_id, card, coins, \`timestamp\`) VALUES (?,?,?,?,?,?)`,
                values,
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },
    async getLastForUserID(userID) {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} WHERE user_id = ? ORDER BY id DESC LIMIT 1`,
                [userID],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows[0]);
                }
            );
        });
    },
    async getLastRecords(limit = 10) {
        return new Promise(resolve => {
            db.query(`SELECT * FROM ${this.table} ORDER BY id DESC LIMIT ?`, [limit], (err, result) => {
                if(err) console.log(err);
                    else resolve(result);
            });
        });
    }
};
