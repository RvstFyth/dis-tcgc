const usersModel = require('../models/users');
const userCardsModel = require('../models/usersCardsPokemon');
const cardsModel = require('../models/cardsPokemon');
const dropsModel = require('../models/drops');
const setsModel = require('../models/setsPokemon');
const boostersModel = require('../models/usersBoostersPokemon');
const input = require('../helpers/input');

const adminIDs = ['377092395931795458'];

module.exports = {
    async run(msg, args, data) {
        if (adminIDs.indexOf(msg.author.id) > -1 && args[0]) {
            if (args[0] === 'gcoins') return this.gcoins(msg, args, data);
            if (args[0] === 'gcard') return this.gcard(msg, args, data);
            if (args[0] === 'drops') return this.drops(msg, args, data);
            if (args[0] === 'gboosters') return this.gboosters(msg, args, data);
        }
    },

    async gboosters(msg, args, data) {
        if (!msg.mentions.users.size || !args[1]) {
            return msg.reply(
                `**${msg.author.username}** invalid syntax... \n\`${data.prefix}cm gboosters <amount> [setName|setID] @mention\``
            );
        }
        const mention = msg.mentions.users.first();
        let amount = 1;
        if (args[1] && !isNaN(args[1])) {
            amount = parseInt(args[1]);
            args = args.slice(2);
        } else args = args.slice(1);

        let set;
        if (!isNaN(args[0])) {
            set = await setsModel.get(args[0]);
        } else set = await setsModel.getForName(args.join(' '));

        if (set) {
            const confirmed = await input.askUserToConfirm(
                `Confirm to give ${mention.username} ${amount} x ${set.name}`,
                msg,
                true
            );
            if (confirmed) {
                const existing = await boostersModel.getSingleForUser(
                    mention.id,
                    set.id
                );
                if (existing)
                    await boostersModel.setAmount(
                        existing.id,
                        parseInt(existing.amount) + amount
                    );
                else await boostersModel.create(mention.id, set.id, amount);

                return msg.channel.send(
                    `**${mention.username}** received ${amount} x ${set.name}`
                );
            }
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
            return msg.reply(
                `**${mention.username}** received ${args[1]} coins!`
            );
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
    async drops(msg, args, data) {
        const lastDrops = await dropsModel.getLastRecords(15);
        let description = '';
        for (let i in lastDrops) {
            description += `${new Date(
                lastDrops[i].timestamp * 1000
            ).toLocaleString('nl-NL', { hour12: false })}} | ${
                lastDrops[i].username
            }\n`;
        }
        const embed = {
            title: `Last drops`,
            description,
        };
        return msg.channel.send({ embed });
    },
};
