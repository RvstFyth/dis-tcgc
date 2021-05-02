const usersModel = require('../models/users');
const userCardsModel = require('../models/usersCardsPokemon');

module.exports = {
    aliasses: ['rank', 'top'],
    async run(msg, args, data) {
        const fields = [];
        const topCoins = await usersModel.getTopCoins();

        let coinsField = { name: 'Coins', value: '' };
        let cnt = 1;
        for (let i in topCoins) {
            coinsField.value += `${cnt}: ${
                topCoins[i].username
                    ? topCoins[i].username
                    : topCoins[i].discord_id
            } (${topCoins[i].coins})\n`;
            cnt++;
        }

        fields.push(coinsField);

        const embed = {
            title: 'Ranking',
            fields,
        };

        return msg.channel.send({ embed });
    },
};
