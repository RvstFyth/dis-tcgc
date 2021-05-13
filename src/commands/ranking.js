const usersModel = require('../models/users');
const userCardsModel = require('../models/usersCardsPokemon');

module.exports = {
    aliasses: ['rank', 'top'],
    async run(msg, args, data) {
        const fields = [];
        const topCoins = await usersModel.getTopCoins();

        const collectedField = {
            name: 'Unique cards',
            value: '',
            inline: true,
        };
        const usersCollected = await userCardsModel.getTopCollectorsForRanking();
        let cnt = 1;
        for (let i in usersCollected) {
            collectedField.value += `${cnt}: ${
                usersCollected[i].username
                    ? usersCollected[i].username
                    : usersCollected[i].discord_id
            } (${usersCollected[i].total})\n`;
            cnt++;
        }

        let coinsField = { name: 'Coins', value: '', inline: true };
        cnt = 1;
        for (let i in topCoins) {
            coinsField.value += `${cnt}: ${
                topCoins[i].username
                    ? topCoins[i].username
                    : topCoins[i].discord_id
            } (${topCoins[i].coins})\n`;
            cnt++;
        }

        fields.push(coinsField);
        fields.push(collectedField);

        const embed = {
            title: 'Ranking',
            fields,
        };

        return msg.channel.send({ embed });
    },
};
