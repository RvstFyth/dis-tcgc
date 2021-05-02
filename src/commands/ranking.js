const usersModel = require('../models/users');
const userCardsModel = require('../models/usersCardsPokemon');

module.exports = {
    async run(msg, args, data) {
        const fields = [];
        const topCoins = await usersModel.getTopCoins();

        let coinsField = { name: 'Coins', value: '' };
        let cnt = 1;
        for (let i in topCoins) {
            coinsField.value += `${cnt}: <@${topCoins[i].discord_id} \n`;
            cnt++;
        }

        fields.push(coinsField);

        const embed = {
            title: 'Ranking',
            fields,
        };

        msg.channel.send({ embed });
    },
};
