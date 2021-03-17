const userQuestsModel = require('../models/usersQuests');

module.exports = {
    async check(command, type, amount, user, msg) {
        const quests = await userQuestsModel.getActiveForForCommandAndType(
            user.id,
            command,
            type
        );
        if (quests && quests.length) {
            for (const quest of quests) {
                // Check if quest is completed
                if (
                    quest.totalAmount &&
                    parseInt(quest.amount) + parseInt(amount) >=
                        parseInt(quest.totalAmount)
                ) {
                    await userQuestsModel.setCompleted(
                        quest.user_id,
                        quest.quest_id
                    );
                    await msg.channel.send({
                        embed: {
                            description: `**${user.name} quest completed!** ${
                                quest.name
                            }\n\n${quest.end_message ? quest.end_message : ''}`,
                        },
                    });
                    continue;
                }

                // Add 1 to amount if needed
                if (quest.totalAmount) {
                    await userQuestsModel.addAmount(
                        quest.user_id,
                        quest.quest_id,
                        amount
                    );
                }
            }
        }
    },
};
