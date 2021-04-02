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

        if (ts < cooldowns.hourly) {
            const diff = ts - parseInt(cooldowns.hourly);
            return msg.channel.send(
                `**${
                    msg.author.username
                }** you have to wait ${valuesHelper.formattedDifferenceBetweenTimestamp(
                    ts,
                    diff,
                    true
                )} for next hourly bonus..`
            );
        } else {
            await cooldownsModel.setHourly(msg.author.id);
            const coins = random.number(10, 25);
            await usersModel.addCoins(msg.author.id, coins);
            const cardBonus = 2;
            const fields = [];
            for (let i = 0, iEnd = cardBonus; i < iEnd; i++) {
                const rarityRoll = random.number(1, 100);
                let rarity;
                if(rarityRoll <= 1) rarity = 'rare'; 
                else if (rarityRoll <= 20) rarity = 'uncommon';
                else rarity = 'common';
                const card = await cardsPokemonModel.getRandomForRarity(rarity);

                fields.push({
                    name: card.name,
                    value: `ID: ${card.id}\nSet: ${card.set}\nRarity: ${card.rarity}`,
                    inline: true,
                });

                await userCardsPokemonModel.add(msg.author.id, card.id, 1);
            }

            const embed = {
                title: `${msg.author.username}'s hourly bonus`,
                fields,
                footer: {
                    text: `You got ${coins} coins!`,
                },
            };
            return msg.channel.send({ embed });
        }
    },
};
