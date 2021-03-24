const cooldownsModel = require('../models/cooldowns');
const valuesHelper = require('../helpers/values');
const cardsPokemonModel = require('../models/cardsPokemon');
const userCardsPokemonModel = require('../models/usersCardsPokemon');
const usersModel = require('../models/users');
const random = require('../helpers/random');

module.exports = {
    async run(msg, args, data) {
        const cooldowns = await cooldownsModel.getFor(msg.author.id);
        const ts = valuesHelper.currentTimestamp();

        if (ts < cooldowns.daily) {
            const diff = ts - parseInt(cooldowns.daily);
            return msg.channel.send(
                `**${
                    msg.author.username
                }** you have to wait ${valuesHelper.formattedDifferenceBetweenTimestamp(
                    ts,
                    diff,
                    true
                )} for next daily bonus..`
            );
        } else {
            await cooldownsModel.setDaily(msg.author.id);
            const coins = random.number(250, 500);
            await usersModel.addCoins(msg.author.id, coins);
            const cardBonus = 10;
            const fields = [];
            for (let i = 0, iEnd = cardBonus; i < iEnd; i++) {
                const card = await cardsPokemonModel.getRandom();
                fields.push({
                    name: card.name,
                    value: `ID: ${card.id}\nSet: ${card.set}`,
                    inline: true,
                });

                await userCardsPokemonModel.add(msg.author.id, card.id, 1);
            }

            const embed = {
                title: `${msg.author.username}'s daily bonus`,
                fields,
                footer: {
                    text: `You got ${coins} coins!`,
                },
            };
            return msg.channel.send({ embed });
        }
    },
};
