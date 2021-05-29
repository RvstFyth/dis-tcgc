const cardsPokemonModel = require('../models/cardsPokemon');

module.exports = {
    async run(msg, args, data) {
        const types = await cardsPokemonModel.getDistinctTypes();

        return msg.channel.send(`\`\`\`${types.join(', ')}\`\`\``);
    },
};
