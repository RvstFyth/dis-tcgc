const db = require('../db').getConnection();

const valuesHelper = require('../helpers/values');

module.exports = {
    table: 'shop',
    async create(setID, expires) {
        return new Promise((resolve) => {
            db.query(
                `INSERT INTO ${this.table} (set_id, expires) VALUES (?,?)`,
                [setID, expires],
                (err) => {
                    if (err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },
    async getActive() {
        return new Promise((resolve) => {
            const ts = valuesHelper.currentTimestamp();
            db.query(
                `
                    SELECT s.*, sp.name, sp.series
                    FROM ${this.table} AS s
                    INNER JOIN sets_pokemon AS sp ON sp.id = s.set_id
                    WHERE s.expires > ?`,
                [ts],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows);
                }
            );
        });
    },
    async getActiveForSetID(setID) {
        return new Promise((resolve) => {
            const ts = valuesHelper.currentTimestamp();
            db.query(
                `
                    SELECT s.*, sp.name, sp.series
                    FROM ${this.table} AS s
                    INNER JOIN sets_pokemon AS sp ON sp.id = s.set_id
                    WHERE s.expires > ? AND s.set_id = ?`,
                [ts, setID],
                (err, rows) => {
                    if (err) console.log(err);
                    else resolve(rows[0]);
                }
            );
        });
    },
};
