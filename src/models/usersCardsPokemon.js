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
    }
};