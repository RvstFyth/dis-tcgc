const usersBoostersPokemonModel = require('../models/usersBoostersPokemon');
const usersCardsPokemonModel = require('../models/usersCardsPokemon');
const cardsPokemonModel = require('../models/cardsPokemon');
const setsModel = require('../models/setsPokemon');

const nextEmoji = '⏭️';

module.exports = {
    aliasses: ['open'],
    async run(msg, args, data) {
        if (
            data.command === 'open' ||
            (args[0] && args[1] && args[0] === 'open')
        )
            return this.open(
                msg,
                args.filter((a) => a != 'open'),
                data
            );
        const boosters = await usersBoostersPokemonModel.getAllForUserGrouped(
            msg.author.id
        );

        let description = '';
        for (let i in boosters) {
            description += `${boosters[i].booster} (${boosters[i].total}) \n`;
        }
        if (!description)
            description = `You don't have any booster packs, you can buy them with the \`,shop\` command.`;

        const embed = {
            title: `${msg.author.username}'s booster packs`,
            description,
            fields: [
                {
                    name: '\u200b',
                    value: `\`,open [set]\` to open a booster pack`,
                },
            ],
        };

        return msg.channel.send({ embed });
    },

    async open(msg, args, data) {
        args = args.filter((a) => a !== 'open');
        let set;
        if (!isNaN(args[0])) {
            set = await setsModel.get(args[0]);
        } else {
            set = await setsModel.getForName(args.join(' '));
        }

        const amountInPack = 10;
        const record = await usersBoostersPokemonModel.getSingleForUser(
            msg.author.id,
            set.name
        );
        if (!record)
            return msg.channel.send(
                `**${msg.author.username}** you don't have any ${set.name} booster packs`
            );
        await usersBoostersPokemonModel.delete(record.id);
        const fields = [];
        for (let i = 0; i < amountInPack; i++) {
            let card;
            if (i === 0)
                card = await cardsPokemonModel.getRandomForSetAndRarity(
                    set.name,
                    'rare'
                );
            else if (i < 4)
                card = await cardsPokemonModel.getRandomForSetAndRarity(
                    set.name,
                    'uncommon'
                );
            else
                card = await cardsPokemonModel.getRandomForSetAndRarity(
                    set.name,
                    'common'
                );
            if (!card) card = await cardsPokemonModel.getRandomForSet(set.name);
            if (card) {
                await usersCardsPokemonModel.add(msg.author.id, card.id, 1);
                fields.push({
                    name: card.name,
                    value: `ID: ${card.id}\nSet: ${card.set}\nRarity: ${card.rarity}`,
                    inline: true,
                });
            }
        }
        const userBoosterCount = await usersBoostersPokemonModel.getCountForUser(
            msg.author.id,
            set.name
        );
        if (userBoosterCount && userBoosterCount > 0) {
            fields.push({
                name: '\u200b',
                value: `React with ${nextEmoji} to open another booster from this set`,
            });
        }
        const embed = {
            title: `${msg.author.username}`,
            fields,
        };

        return msg.channel.send({ embed }).then(async (message) => {
            if (userBoosterCount && userBoosterCount > 0) {
                await message.react(nextEmoji);
                const filter = (reaction, user) =>
                    reaction.emoji.name === nextEmoji &&
                    user.id === msg.author.id;
                message
                    .awaitReactions(filter, { time: 30000, max: 1 })
                    .then((collected) => {
                        const reaction = collected.first();
                        if (reaction) {
                            return this.open(msg, args, data);
                        }
                    })
                    .catch((e) => console.log(e));
            }
        });
    },
};
