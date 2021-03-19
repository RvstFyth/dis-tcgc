const cooldownsModel = require('../models/cooldowns');
const valuesHelper = require('../helpers/values');
const cardsPokemonModel = require('../models/cardsPokemon');
const userCardsPokemonModel = require('../models/usersCardsPokemon');

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
            };
            return msg.channel.send({ embed });
        }
    },
};
