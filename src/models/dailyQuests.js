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
            const values = [userID, type, subType];
            db.query(
                `SELECT * FROM ${this.table} WHERE user_id = ? AND \`type\` = ? AND subType = ? AND completed = 0`,
                values,
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },
};
