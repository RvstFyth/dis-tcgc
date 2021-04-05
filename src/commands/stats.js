const userCardsPokemonModel = require('../models/usersCardsPokemon');

module.exports = {
    
    async run(msg, args, data)
    {
        const common = await userCardsPokemonModel.getTotalForUserAndRarity(msg.author.id, 'common');
        const uncommon = await userCardsPokemonModel.getTotalForUserAndRarity(msg.author.id, 'uncommon');
        const rare = await userCardsPokemonModel.getTotalForUserAndRarity(msg.author.id, 'rare');
        const promo = await userCardsPokemonModel.getTotalForUserAndRarity(msg.author.id, 'promo');
        const legends = await userCardsPokemonModel.getTotalForUserAndRarity(msg.author.id, 'legends');

        const total = await userCardsPokemonModel.getTotalCollectedForUser(msg.author.id);

        const fields = [];
        const uniqueField = { name: 'Cards', value: `Common: ${common}\nUncommon: ${uncommon}\nRare: ${rare}\nPromo: ${promo}\nLegends: ${legends}\nTotal unique: ${common + uncommon + rare + promo + legends}\nTotal: ${total}`, inline: true };
        // const extraField = { name: '\u200b', value: }

        fields.push(uniqueField);

        const embed = {
            title: `${msg.author.username}'s stats`,
            fields
        }

        return msg.channel.send({embed});
    }
}
