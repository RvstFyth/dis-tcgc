const cardsPokemonModel = require('../models/cardsPokemon');
const setsModel = require('../models/setsPokemon');

const emojis = {
    next: '▶️',
    previous: '◀️',
};

module.exports = {
    async run(msg, args, data) {
        const sets = await setsModel.getAll();

        let page = 1;
        if (!isNaN(args[0])) {
            page = parseInt(args[0]);
        }
        return this.postEmbed(msg, sets, page);
    },

    async postEmbed(msg, data, page = 1, originalEmbed = null) {
        const limit = 10;
        const maxPage = Math.ceil(data.length / limit);
        if (page > maxPage) page = maxPage;
        const offset = page * limit - limit;
        const dData = [...data];
        const sets = dData.splice(offset, limit);

        let description = '**ID - Name (series) | price**\n';

        for (let i in sets) {
            description += `${sets[i].id} - ${sets[i].name} (${sets[i].series}) | ${sets[i].price}\n`;
        }

        if (!description) description = '...';

        // Test
        const embed = {
            title: `Sets`,
            description,
            footer: {
                text: `Page: ${page}/${maxPage}`,
            },
        };
        if (originalEmbed) {
            return originalEmbed.edit({ embed }).then(async (message) => {
                if (maxPage > 1) {
                    await message.react(emojis.previous);
                    await message.react(emojis.next);
                    const filter = (reaction, user) =>
                        ((page < maxPage &&
                            reaction.emoji.name === emojis.next) ||
                            (page > 1 &&
                                reaction.emoji.name === emojis.previous)) &&
                        user.id === msg.author.id;
                    message
                        .awaitReactions(filter, { time: 60000, max: 1 })
                        .then((collected) => {
                            const reaction = collected.first();
                            if (reaction) {
                                if (reaction.emoji.name === emojis.next)
                                    page += 1;
                                else page -= 1;
                                return this.postEmbed(msg, data, page, message);
                            }
                        });
                }
            });
        } else {
            return msg.channel.send({ embed }).then(async (message) => {
                if (maxPage > 1) {
                    await message.react(emojis.previous);
                    await message.react(emojis.next);
                    const filter = (reaction, user) =>
                        ((page < maxPage &&
                            reaction.emoji.name === emojis.next) ||
                            (page > 1 &&
                                reaction.emoji.name === emojis.previous)) &&
                        user.id === msg.author.id;
                    message
                        .awaitReactions(filter, { time: 60000, max: 1 })
                        .then((collected) => {
                            const reaction = collected.first();
                            if (reaction) {
                                if (reaction.emoji.name === emojis.next)
                                    page += 1;
                                else page -= 1;

                                return this.postEmbed(msg, data, page, message);
                            }
                        });
                }
            });
        }
    },
};
