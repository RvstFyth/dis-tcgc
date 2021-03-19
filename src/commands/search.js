const cardsPokemonModel = require('../models/cardsPokemon');

module.exports = {
    async run(msg, args, data) {
        let page = 1;
        if (!isNaN(args[args.length - 1])) {
            page = parseInt(args[args.length - 1]);
            args = args.filter((a) => a != page);
        }
        if (!args[0])
            return msg.channel.send(
                `**${msg.author.username}** not enough arguments...`
            );

        let cards = await cardsPokemonModel.getForName(args.join(' '));
        const limit = 10;
        let maxPage = 0,
            offset = 0,
            totalResults = 0;

        if (cards && cards.length) {
            totalResults = cards.length;
            maxPage = Math.ceil(cards.length / limit);
            if (page > maxPage) page = maxPage;
            offset = page * limit - limit;
            if (offset < 0) offset = 0;
            cards = cards.slice(offset, offset + limit);
        }
        let description = '';
        for (let i in cards) {
            description += `#${cards[i].id} - ${cards[i].name} (${cards[i].set})\n`;
        }
        if (!description) description = 'No results found..';

        const embed = {
            title: `${msg.author.username}'s search result`,
            description,
            footer: {
                text: `${totalResults} results | Page ${page}/${maxPage}`,
            },
        };

        return msg.channel.send({ embed });
    },
};
