const usersModel = require("../models/users");
const userCardsModel = require("../models/usersCardsPokemon");
const cardsModel = require("../models/cardsPokemon");

const adminIDs = ["377092395931795458"];

module.exports = {
  async run(msg, args, data) {
    if (adminIDs.indexOf(msg.author.id) > -1 && args[0]) {
      if (args[0] === "gcoins") return this.gcoins(msg, args, data);
      if (args[0] === "gcard") return this.gcard(msg, args, data);
    }
  },

  async gcoins(msg, args, data) {
    if (!args[1] || !msg.mentions.users.size)
      return msg.reply(
        `**${msg.author.username}** invalid syntax... \n\`${data.prefix}cm gcoins amount @mention\``
      );

    const mention = msg.mentions.users.first();
    const user = await usersModel.getForDiscordID(mention.id);
    if (user) {
      await usersModel.addCoins(mention.id, args[1]);
      return msg.reply(`**${mention.username}** received ${args[1]} coins!`);
    }

    return msg.reply(`**${mention.username}** is not registered...`);
  },

  async gcard(msg, args, data) {
    if (!args[1] || !msg.mentions.users.size)
      return msg.reply(
        `**${msg.author.username}** invalid syntax... \n\`${data.prefix}cm gcards id @mention\``
      );

    const mention = msg.mentions.users.first();
    const user = await usersModel.getForDiscordID(mention.id);
    if (user) {
      const card = await cardsModel.get(args[1]);
      if (card) {
        await userCardsModel.add(mention.id, args[1], 1);
        return msg.reply(
          `**${mention.username}** received a **${card.name}** (${card.set})!`
        );
      }

      return msg.reply(`Invalid card ID provided..`);
    }

    return msg.reply(`**${mention.username}** is not registered...`);
  },
};
