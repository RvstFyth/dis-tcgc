const usersModel = require('../models/users');
const cooldownsModel = require('../models/cooldowns');
const valuesHelper = require('../helpers/values');
const remindersModel = require('../models/reminders');
const reminderEmoji = '⏰';

module.exports = {
    async run(bot, userID, weekend) {
        const user = await usersModel.getForDiscordID(userID);
        if (user) {
            await cooldownsModel.setDaily(userID, true);
            const discUser = await bot.users.fetch(userID);
            if (discUser) {
                await discUser
                    .send(
                        `Thank you for voting for your support! You daily is \`,daily\` is reset, go claim it again!`
                    )
                    .then(async (message) => {
                        await message.react(reminderEmoji);
                        const filter = (reaction, user) =>
                            reaction.emoji.name === reminderEmoji &&
                            user.id === discUser.id;
                        message
                            .awaitReactions(filter, { time: 60000, max: 1 })
                            .then(async (collected) => {
                                const reaction = collected.first();
                                if (reaction) {
                                    await remindersModel.create(
                                        discUser.id,
                                        'You can vote again!',
                                        valuesHelper.currentTimestamp() +
                                            3600 * 12
                                    );
                                }
                            })
                            .catch((e) => console.log(e));
                    })
                    .catch((e) => console.log(e));
            }
        }
    },
};
