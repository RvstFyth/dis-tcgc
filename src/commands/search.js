const cardsPokemonModel = require('../models/cardsPokemon');

module.exports = {

    async run(msg, args, data)
    {
        if(!args[0]) return msg.channel.send(`**${msg.author.username}** not enough arguments...`);

        const cards = await cardsPokemonModel.getForName(args[0]);

        let description = '';
        for(let i in cards) {
            description += `#${cards[i].id} - ${cards[i].name} (${cards[i].set})\n`;
        }
        if(!description) description = 'No results found..'

        const embed = {
            title: `${msg.author.username}'s search result`,
            description
        };

        return msg.channel.send({embed});
    }
};