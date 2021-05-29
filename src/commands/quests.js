const dailyQuestsModel = require('../models/dailyQuests');
const questsHelper = require('../helpers/quests');
const valuesHelper = require('../helpers/values');

module.exports = {
    async run(msg, args, data) {
        let quests = await dailyQuestsModel.getActiveForUser(msg.author.id);
        if (!quests || !quests.length) {
            await questsHelper.generateDailyQuests(msg.author.id, 4);
            quests = await dailyQuestsModel.getActiveForUser(msg.author.id);
        }

        let res = '';
        for (let i in quests) {
            if (quests[i].completed) res += `- ~~${quests[i].label}~~\n`;
            else
                res += `- ${quests[i].label} ${quests[i].progress}/${quests[i].amount}\n`;
        }
        res += `\n\n${valuesHelper.formattedDifferenceBetweenTimestamp(
            0,
            quests[0].expireTimestamp,
            true
        )} before you can request new quests.`;

        msg.channel.send({
            embed: {
                title: `${msg.author.username}'s quests`,
                description: res,
            },
        });
    },
};
