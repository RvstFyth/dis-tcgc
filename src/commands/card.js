const cardsPokemonModel = require('../models/cardsPokemon');

module.exports = {

    async run(msg, args, data) {
        if(isNaN(args[0])) return msg.channel.send(`**${msg.author.username}** this command only works with IDs. Use \`${data.prefix}search [name]\` to find IDs.`);

        const ID = parseInt(args[0]);
        const card = await cardsPokemonModel.get(ID);
        if(!card) return msg.channel.send(`**${msg.author.username}** there is no card with ID ${ID}.`);
        const imagePathSplitted = card.image_large.split('/');
        await msg.channel.send(`Card #${card.id} - ${card.name} (${card.set})`, {
            files: [{
                attachment: card.image_large,
                name: imagePathSplitted[imagePathSplitted.length - 1]
            }]
        });
    }
};