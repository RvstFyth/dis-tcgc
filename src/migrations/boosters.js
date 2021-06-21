const util = require('util');
const db = require('../db');
db.init();

const con = db.getConnection();

// node native promisify
const query = util.promisify(con.query).bind(con);

(async () => {
    try {
        const users = await query(`SELECT * FROM users`);
        for (let i in users) {
            const boosters = await query(
                `SELECT booster, COUNT(*) AS total FROM users_boosters_pokemon WHERE user_id = ${users[i].discord_id} GROUP BY booster`
            );
            for (let j in boosters) {
                const set = await query(
                    `SELECT * FROM sets_pokemon WHERE LOWER(name) = ?`,
                    [boosters[j].booster.toLowerCase()]
                );
                if (set[0])
                    await query(
                        `INSERT INTO boosters2 (user_id, set_id, amount) VALUES (?,?,?)`,
                        [users[i].discord_id, set[0].id, boosters[j].total]
                    );
            }
        }
    } finally {
        // console.log('Done')
        con.end();
    }
})();
