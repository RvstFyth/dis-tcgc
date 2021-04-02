const db = require('../db').getConnection();

module.exports = {

    table: `sets_pokemon`,
    async getForName(name)
    {
        return new Promise(resolve => {
            db.query(`SELECT * FROM ${this.table} WHERE \`name\` = ?`, [name], (err, rows) => {
                if(err) console.log(err);
                else resolve(rows[0]);
            });
        });
    }
}
