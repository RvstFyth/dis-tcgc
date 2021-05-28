const db = require('../db').getConnection();
const valuesHelper = require('../helpers/values');

module.exports = {
    table: 'daily_quests',
    async create(
        userID,
        type,
        subType,
        amount,
        label,
        rewardType,
        rewardSubType,
        rewardAmount,
        expireTimestamp
    ) {
        return new Promise((resolve) => {
            const values = [
                userID,
                type,
                subType,
                amount,
                label,
                rewardType,
                rewardSubType,
                rewardAmount,
                expireTimestamp,
            ];
            db.query(
                `
                INSERT INTO ${this.table} 
                (user_id, \`type\`, subType, amount, label, rewardType, rewardSubType, rewardAmount, expireTimestamp)
                VALUES (?,?,?,?,?,?,?,?,?)
           `,
                values,
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },
    async getActiveForUser(userID) {
        return new Promise((resolve) => {
            db.query(
                `SELECT * FROM ${this.table} WHERE user_id = ? AND expireTimestamp > ?`,
                [userID, valuesHelper.currentTimestamp()],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },
    async getActiveForUserAndTypeAndSubType(userID, type, subType) {
        return new Promise((resolve) => {
            const values = [
                userID,
                type,
                subType,
                valuesHelper.currentTimestamp(),
            ];
            db.query(
                `SELECT * FROM ${this.table} WHERE user_id = ? AND \`type\` = ? AND LOWER(subType) = ? AND completed = 0 AND expireTimestamp > ?`,
                values,
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows[0]);
                }
            );
        });
    },
    async addProgress(id, amount = 1) {
        return new Promise((resolve) => {
            db.query(
                `UPDATE ${this.table} SET progress = progress + ? WHERE id = ?`,
                [amount, id],
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },

    async setCompleted(id) {
        return new Promise((resolve) => {
            db.query(
                `UPDATE ${this.table} SET completed = 1 WHERE id = ?`,
                [id],
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },
};
