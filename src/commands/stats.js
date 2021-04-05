const userCardsPokemonModel = require('../models/usersCardsPokemon');

module.exports = {
    
    async run(msg, args, data)
    {
        const common = await userCardsPokemonModel.getTotalForUserAndRarity(msg.author.id, 'common');
        const uncommon = await userCardsPokemonModel.getTotalForUserAndRarity(msg.author.id, 'uncommon');
        const rare = await userCardsPokemonModel.getTotalForUserAndRarity(msg.author.id, 'rare');
        const total = await userCardsPokemonModel.getTotalCollectedForUser(msg.author.id);

        const fields = [];
        const uniqueField = { name: 'Cards', value: `Common: ${common}\nUncommon: ${uncommon}\nRare: ${rare}\nTotal unique: ${common + uncommon + rare}\nTotal: ${total}`, inline: true };
        // const extraField = { name: '\u200b', value: }

        fields.push(uniqueField);

        const embed = {
            title: `${msg.author.username}'s stats`,
            fields
        }

        return msg.channel.send({embed});
    }
}
