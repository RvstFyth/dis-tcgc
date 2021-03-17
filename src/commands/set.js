const cardsPokemonModel = require('../models/cardsPokemon');

const emojis = {
    next: '▶️'
};

module.exports = {

    async run(msg, args, data)
    {
        const owned = args.filter(a => ['-owned', '-o'].indexOf(a) > -1).length;
        const missing = args.filter(a => ['-missing', '-m'].indexOf(a) > -1).length;

        args = args.filter(a => !a.startsWith('-'));

        if(!args[0]) return msg.channel.send(`**${msg.author.username}** not enough arguments..`);

        const input = args.join(' ');
        let cards;
        if(owned) cards = await cardsPokemonModel.getCardsForSetForUserOwned(input, msg.author.id);
        else if(missing) cards = await cardsPokemonModel.getCardsForSetForUserMissing(input, msg.author.id);
        else cards = await cardsPokemonModel.getCardsForSetForUser(input, msg.author.id);

        if(!cards || !cards.length) return msg.channel.send(`**${msg.author.username}** no cards found..`);

        return this.postEmbed(msg, cards);
    },

    async postEmbed(msg, data, page = 1, originalEmbed = null)
    {
        const limit = 10;
        const maxPage = Math.ceil(data.length / limit);
        const offset = page * limit - limit;

        const dData = [...data];
        const cards = dData.splice(offset, limit);
        let description = '';

        for(let i in cards) {
            description += `#${cards[i].id} - ${cards[i].name} (${cards[i].amount || 0})\n`;
        }

        if(!description) description = '...';

        const embed = {
            title: `${cards[0].set}`,
            description,
            footer: {
                text: `Page: ${page}/${maxPage} | ${data.length} total in this set`
            }
        };
        if(originalEmbed) {
            return originalEmbed.edit({embed}).then(async message => {
                if (page < maxPage) {
                    await message.react(emojis.next);
                    const filter = (reaction, user) => reaction.emoji.name === emojis.next && user.id === msg.author.id;
                    message.awaitReactions(filter, {time: 60000, max: 1}).then(collected => {
                        const reaction = collected.first();
                        if (reaction) {
                            return this.postEmbed(msg, data, page + 1, message);
                        }
                    });
                }
            });
        }
        else {
            return msg.channel.send({embed}).then(async message => {
                if (page < maxPage) {
                    await message.react(emojis.next);
                    const filter = (reaction, user) => reaction.emoji.name === emojis.next && user.id === msg.author.id;
                    message.awaitReactions(filter, {time: 60000, max: 1}).then(collected => {
                        const reaction = collected.first();
                        if (reaction) {
                            return this.postEmbed(msg, data, page + 1, message);
                        }
                    });
                }
            });
        }
    }
};