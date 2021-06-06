const db = require("../db").getConnection();
const valuesHelper = require("../helpers/values");

module.exports = {
  table: "drops",
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
};
