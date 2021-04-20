const db = require('../db').getConnection();
const valuesHelper = require('../helpers/values');

module.exports = {
    tableName: `reminders`,

    async create(discordID, message, timestamp) {
        return new Promise((resolve) => {
            db.query(
                `INSERT INTO ${this.tableName} (discord_id, message, reminder_timestamp) VALUES (?,?,?)`,
                [discordID, message, timestamp],
                (err, res) => {
                    if (err) console.log(err);
                    else resolve(res.insertId);
                }
            );
        });
    },

    async getReminders() {
        return new Promise((resolve) => {
            const ts = valuesHelper.currentTimestamp();
            db.query(
                `SELECT * FROM ${this.tableName} WHERE reminder_timestamp <= ?`,
                [ts],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },

    async delete(id) {
        return new Promise((resolve) => {
            db.query(
                `DELETE FROM ${this.tableName} WHERE id = ?`,
                [id],
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },
};
