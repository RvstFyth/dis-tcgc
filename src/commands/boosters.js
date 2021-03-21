const usersBoostersPokemonModel = require('../models/usersBoostersPokemon');
const usersCardsPokemonModel = require('../models/usersCardsPokemon');
const cardsPokemonModel = require('../models/cardsPokemon');

module.exports = {
    async run(msg, args, data) {
        if (args[0] && args[1] && args[0] === 'open')
            return this.open(msg, args.splice(1), data);
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
                    value: `\`,boosters open [set]\` to open a booster pack`,
                },
            ],
        };

        return msg.channel.send({ embed });
    },

    async open(msg, args, data) {
        const input = args.join(' ');
        const amountInPack = 5;
        const record = await usersBoostersPokemonModel.getSingleForUser(
            msg.author.id,
            input
        );
        if (!record)
            return msg.channel.send(
                `**${msg.author.username}** you don't have any ${input} booster packs`
            );
        await usersBoostersPokemonModel.delete(record.id);
        const fields = [];
        for (let i = 0; i < amountInPack; i++) {
            const card = await cardsPokemonModel.getRandomForSet(input);
            await usersCardsPokemonModel.add(msg.author.id, card.id, 1);
            fields.push({
                name: card.name,
                value: `ID: ${card.id}\nSet: ${card.set}`,
                inline: true,
            });
        }

        const embed = {
            title: `${msg.author.username}`,
            fields,
        };

        return msg.channel.send({ embed });
    },
};