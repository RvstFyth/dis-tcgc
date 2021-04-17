const cardsModel = require('../models/cardsPokemon');
const userCardsModel = require('../models/usersCardsPokemon');
const usersModel = require('../models/users');

const input = require('../helpers/input');

module.exports = {
    async run(msg, args, data) {
        if (args && args.length && args[0] === 'all')
            return this.sellAll(msg, args);
        else if (args && args.length && !isNaN(args[0]))
            return this.sellCard(msg, args);
        else return this.help(msg, args);
    },

    async help(msg, args) {
        const embed = {
            title: `Sell help`,
            description:
                `` +
                `\`,sell all [rarity] [setName]\` To sell all duplicate cards from a set with specified rarity. Valid rarities: common, uncommon, rare\n\n` +
                `\`,sell [id]\` To sell a specific card.`,
        };
        return msg.channel.send({ embed });
    },

    async sellAll(msg, args) {
        args = args.splice(1);
        if (!args.length) return this.help(msg, args);

        let rarity, set;
        const rarities = ['common', 'uncommon', 'rare'];
        if (rarities.indexOf(args[0]) > -1 && args[1]) {
            const rarity = args[0];
            args = args.splice(1);
            const setName = args.join(' ');
            const cards = await userCardsModel.getDuplicatesForUserAndSetAndRarity(
                msg.author.id,
                setName,
                rarity
            );
            if (!cards || !cards.length)
                return msg.channel.send(
                    `**${msg.author.username}** no duplicate cards found to sell..`
                );

            let totalCards = 0,
                result;
            for (let i in cards) {
                totalCards += parseInt(cards[i].amount) - 1;
                await userCardsModel.setAmount(msg.author.id, cards[i].id, 1);
            }

            if (rarity === 'rare') result = totalCards * 75;
            else if (rarity === 'uncommon') result = totalCards * 10;
            else result = totalCards;

            await usersModel.addCoins(msg.author.id, result);
            return msg.channel.send(
                `**${msg.author.username}** sold ${totalCards} cards for ${result} coins!`
            );
        } else return this.help(msg, args);
    },

    async sellCard(msg, args) {
        if (!args[0] || isNaN(args[0]))
            return msg.channel.send(
                `**${msg.author.username}** invalid card ID provided...`
            );

        const card = await cardsModel.get(args[0]);
        if (!card)
            return msg.channel.send(
                `**${msg.author.username}** there is no card with ID ${args[0]}`
            );

        const userCards = await userCardsModel.getForUser(
            msg.author.id,
            args[0]
        );
        if (!userCards)
            return msg.channel.send(
                `**${msg.author.username}** you don't have this card..`
            );

        const confirmed = await input.askUserToConfirm(
            `**${msg.author.username}**, confirm to sell ${card.name} | ${card.set} | ${card.rarity}`,
            msg
        );
        if (confirmed) {
            card.rarity = card.rarity.toLowerCase();
            let res = 0;
            if (card.rarity.includes('rare')) res = 75;
            else if (card.rarity === 'uncommon') res = 10;
            else res = 1;

            if (res > 0) {
                await usersModel.addCoins(msg.author.id, res);
                if (userCards.amount > 1) {
                    await userCardsModel.setAmount(
                        msg.author.id,
                        card.id,
                        parseInt(userCards.amount) - 1
                    );
                } else await userCardsModel.deleteFor(msg.author.id, card.id);

                return msg.channel.send(
                    `**${msg.author.username}** sold ${card.name} for ${res} coins`
                );
            }
        }
    },
};
