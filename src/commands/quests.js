const dailyQuestsModel = require('../models/dailyQuests');
const questsHelper = require('../helpers/quests');

module.exports = {
    async run(msg, args, data) {
        const b = await questsHelper.generateDailyQuests(msg.author.id, 4);
        let res = '';
        for (let a of b) {
            res += `${a} (23h 54m 16s)\n`;
        }
        msg.channel.send({
            embed: {
                title: `${msg.author.username}'s quests`,
                description: res,
            },
        });
    },
};
