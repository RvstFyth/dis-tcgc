const random = require('./random');
const setsModel = require('../models/setsPokemon');
const cardsModel = require('../models/cardsPokemon');
const questsModel = require('../models/dailyQuests');
const valuesHelper = require('../helpers/values');

module.exports = {
    async generateDailyQuests(userID, amount) {
        // returns a string that should be outputted
        const result = [];
        const expireTimestamp = valuesHelper.currentTimestamp() + 86400;

        for (let i = 0; i < amount; i++) {
            let label;
            let type =
                i === 0 ? 'buy' : random.number(1, 4) < 4 ? 'sell' : 'buy';

            if (type === 'buy') {
                const set = await setsModel.getRandom();
                const amount = random.number(1, 2);
                label = `Buy ${amount} x ${set.name} booster`;
                await questsModel.create(
                    userID,
                    'buy',
                    'booster',
                    amount,
                    label,
                    'booster',
                    '',
                    amount,
                    expireTimestamp
                );
            } else {
                // Sell quest
                const cardTypes = await cardsModel.getDistinctTypes();
                const type = random.arrayValue(cardTypes);
                const amount = random.number(1, 2);
                const rewardCoins = random.number(100, 200);
                label = `Sell ${amount} x cards of the type ${type}`;
                await questsModel.create(
                    userID,
                    'sell',
                    type,
                    amount,
                    label,
                    'coins',
                    '',
                    rewardCoins,
                    expireTimestamp
                );
            }

            result.push(label);
        }

        return result;
    },

    async check(discordUser, command, arg) {
        // Checks if a user has a quest and adds + 1 to amount. Also checks if quest is completed!
    },
};
