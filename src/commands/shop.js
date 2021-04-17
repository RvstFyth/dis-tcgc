const usersBoostersPokemonModel = require('../models/usersBoostersPokemon');
const cardsPokemonModel = require('../models/cardsPokemon');
const usersModel = require('../models/users');

const boosterPrice = 250;

module.exports = {
    aliasses: ['buy'],
    async run(msg, args, data) {
        if (data.command === 'buy' || (args[0] && args[0] === 'buy'))
            return this.buy(
                msg,
                args.filter((a) => a != 'buy'),
                data
            );
        const embed = {
            title: `Boosters shop`,
            description:
                `Expand your collection by buying booster packs! Each time a card drops` +
                ` you get a random amount of coins. You can use these coins to buy booster packs. ` +
                `Each booster gives 10 new cards, and costs 250 coins.`,
            fields: [
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
        let amount = 1;
        if (args[0] && !isNaN(args[0]) && args[0] > 0) {
            amount = parseInt(args[0]);
            args = args.splice(1);
        }

        if (data.user.coins < boosterPrice * amount)
            return msg.channel.send(
                `**${msg.author.username}** you don't have enough coins (${
                    data.user.coins
                }), you need ${
                    boosterPrice * amount
                } coins to buy ${amount} x booster. You get coins when a card drops or with bonus commands.`
            );
        const input = args.join(' ');
        const sets = await cardsPokemonModel.getDistinctSetNames();
        if (sets.indexOf(input) < 0)
            return msg.channel.send(
                `**${msg.author.username}** invalid set name provided..`
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
