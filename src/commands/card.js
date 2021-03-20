const cardsPokemonModel = require('../models/cardsPokemon');
const usersCardsPokemonModel = require('../models/usersCardsPokemon');

module.exports = {
    async run(msg, args, data) {
        if (isNaN(args[0]))
            return msg.channel.send(
                `**${msg.author.username}** this command only works with IDs. Use \`${data.prefix}search [name]\` to find IDs.`
            );

        const ID = parseInt(args[0]);
        const card = await cardsPokemonModel.get(ID);
        if (!card)
            return msg.channel.send(
                `**${msg.author.username}** there is no card with ID ${ID}.`
            );
        const imagePathSplitted = card.image_large.split('/');

        let description = `` + `Set: ${card.set}\n` + `ID: ${card.id}`;
        const userCards = await usersCardsPokemonModel.getForUser(msg.author.id, card.id);
        const embed = {
            title: card.name,
            description,
            image: {
                url: `attachment://${
                    imagePathSplitted[imagePathSplitted.length - 1]
                }`,
            },
            footer: {
                text: `You own ${userCards ? userCards.amount : 0}`
            }
        };
        await msg.channel.send({
            embed,
            files: [
                {
                    attachment: card.image_large,
                    name: imagePathSplitted[imagePathSplitted.length - 1],
                },
            ],
        });
    },
};
