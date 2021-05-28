const random = require('./random');
const setsModel = require('../models/setsPokemon');
const cardsModel = require('../models/cardsPokemon');
const questsModel = require('../models/dailyQuests');
const valuesHelper = require('../helpers/values');
const boostersModel = require('../models/usersBoostersPokemon');
const usersModel = require('../models/users');

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
                    set.name.toLowerCase(),
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

    async check(msg, command, arg, amount = 1) {
        const discordUser = msg.author;
        // Checks if a user has a quest and adds + 1 to amount. Also checks if quest is completed!
        const quest = await questsModel.getActiveForUserAndTypeAndSubType(
            discordUser.id,
            command,
            arg
        );
        if (quest) {
            if (parseInt(quest.progress) + amount >= parseInt(quest.amount)) {
                // Quest completed!
                await questsModel.setCompleted(quest.id);
                let rewardString = '';
                if (quest.rewardType === 'booster') {
                    for (let i = 0; i < quest.rewardAmount; i++) {
                        const randomSet = await setsModel.getRandom();
                        await boostersModel.create(
                            msg.author.id,
                            randomSet.name
                        );
                        rewardString += `- ${randomSet.name} booster\n`;
                    }
                } else if (quest.rewardType === 'coins') {
                    // Sell quest
                    await usersModel.addCoins(
                        msg.author.id,
                        quest.rewardAmount
                    );
                    rewardString += `- ${quest.rewardAmount} coins\n`;
                }
                const embed = {
                    title: `${msg.author.username} quest completed!`,
                    description:
                        quest.label + `\n\n**Rewards**:\n ${rewardString}`,
                };
                await msg.channel.send({ embed });
            } else await questsModel.addProgress(quest.id, amount);
        }
    },
};
