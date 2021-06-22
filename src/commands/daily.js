const cooldownsModel = require('../models/cooldowns');
const valuesHelper = require('../helpers/values');
const cardsPokemonModel = require('../models/cardsPokemon');
const userCardsPokemonModel = require('../models/usersCardsPokemon');
const usersModel = require('../models/users');
const random = require('../helpers/random');

module.exports = {
    aliasses: ['day', 'dl'],
    async run(msg, args, data) {
        const cooldowns = await cooldownsModel.getFor(msg.author.id);
        const ts = valuesHelper.currentTimestamp();

        if (ts < cooldowns.daily) {
            const diff = ts - parseInt(cooldowns.daily);
            let description = `**${
                msg.author.username
            }** you have to wait ${valuesHelper.formattedDifferenceBetweenTimestamp(
                ts,
                diff,
                true
            )} for next daily bonus..\n\n **You can reset your daily (and claim it again) by** [voting for this bot on top.gg](https://top.gg/bot/821802913533657138/vote)`;
            const embed = { description };
            return msg.channel.send({ embed });
        } else {
            await cooldownsModel.setDaily(msg.author.id);
            const coins = random.number(250, 500);
            await usersModel.addCoins(msg.author.id, coins);
            const cardBonus = 10;
            const fields = [];
            for (let i = 0, iEnd = cardBonus; i < iEnd; i++) {
                const rarityRoll = random.number(1, 100);
                let rarity;
                if (i === 0 || rarityRoll <= 1) rarity = 'rare';
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
                title: `${msg.author.username}'s daily bonus`,
                fields,
                footer: {
                    text: `You got ${coins} coins! | You can reset your daily by voting for us on top.gg! `,
                },
            };
            return msg.channel.send({ embed });
        }
    },
};
