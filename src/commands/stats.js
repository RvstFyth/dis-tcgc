const userCardsPokemonModel = require('../models/usersCardsPokemon');

module.exports = {
    
    async run(msg, args, data)
    {
        const common = await userCardsPokemonModel.getTotalForUserAndRarity(msg.author.id, 'common');
        const uncommon = await userCardsPokemonModel.getTotalForUserAndRarity(msg.author.id, 'uncommon');
        const rare = await userCardsPokemonModel.getTotalForUserAndRarity(msg.author.id, 'rare');

        const fields = [];
        const uniqueField = { name: 'Unique cards', value: `Common: ${common}\nUncommon: ${uncommon}\nRare: ${rare}` };

        fields.push(uniqueField);

        const embed = {
            title: `${msg.author.username}'s stats`,
            fields
        }

        return msg.channel.send({embed});
    }
}
