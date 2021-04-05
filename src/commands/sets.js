const cardsPokemonModel = require('../models/cardsPokemon');

module.exports = {
    async run(msg, args, data) {
        const sets = await cardsPokemonModel.getDistinctSetNames();

        return msg.channel.send('```' + sets.join(', ') + '```');
    },
};
