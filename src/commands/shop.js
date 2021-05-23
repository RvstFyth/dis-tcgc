const usersBoostersPokemonModel = require('../models/usersBoostersPokemon');
const cardsPokemonModel = require('../models/cardsPokemon');
const usersModel = require('../models/users');
const shopModel = require('../models/shop');
const valuesHelper = require('../helpers/values');
const setsModel = require('../models/setsPokemon');

module.exports = {
    aliasses: ['buy'],
    async run(msg, args, data) {
        // const a = await shopModel.getActive();
        // return msg.channel.send(JSON.stringify(a));
        if (data.command === 'buy' || (args[0] && args[0] === 'buy'))
            return this.buy(
                msg,
                args.filter((a) => a != 'buy'),
                data
            );

        const offers = await shopModel.getActive();
        const activeField = { name: 'Sales (-25%)', value: '' };
        let cnt = 1;
        for (let i in offers) {
            activeField.value += `**${cnt}**: ${
                offers[i].name
            } (${valuesHelper.formattedDifferenceBetweenTimestamp(
                0,
                offers[i].expires,
                true
            )})\n`;
            cnt++;
        }

        const embed = {
            title: `Boosters shop`,
            description:
                `Expand your collection by buying booster packs! Each time a card drops` +
                ` you get a random amount of coins. You can use these coins to buy booster packs. ` +
                `Each booster gives 10 new cards, and costs 250 coins.`,
            fields: [
                activeField,
                {
                    name: '\u200b',
                    value:
                        `` +
                        `\`,buy [setName]\` to buy a pack\n` +
                        `\`,buy 3 [setName]\` to buy 3 packs\n` +
                        `\`,sets\` to see a list of available sets\n` +
                        `\`,boosters\` to see your booster packs\n` +
                        `\`,open [setName]\` to open a booster pack`,
                },
            ],
            footer: {
                text: `You have ${data.user.coins} coins`,
            },
        };

        return msg.channel.send({ embed });
    },

    async buy(msg, args, data) {
        let amount = 1,
            boosterPrice = 250;

        if (args[0] && !isNaN(args[0]) && args[0] > 0) {
            amount = parseInt(args[0]);
            args = args.splice(1);
        }

        const input = args.join(' ');
        const set = await setsModel.getForName(input);
        if (!set)
            return msg.channel.send(
                `**${msg.author.username}** invalid set name provided..`
            );

        const activeSale = await shopModel.getActiveForSetID(set.id);
        if (activeSale) boosterPrice *= 0.75;
        const price = boosterPrice * amount;

        if (data.user.coins < price)
            return msg.channel.send(
                `**${msg.author.username}** you don't have enough coins (${data.user.coins}), you need ${price} coins to buy ${amount} x booster. You get coins when a card drops or with bonus commands.`
            );

        await usersModel.setCoins(
            msg.author.id,
            parseInt(data.user.coins) - boosterPrice * amount
        );
        for (let i = 0; i < amount; i++) {
            await usersBoostersPokemonModel.create(msg.author.id, input);
        }
        return msg.channel.send(
            `**${msg.author.username}** bought ${amount} x ${input} booster!`
        );
    },
};
