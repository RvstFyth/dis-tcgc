const usersModel = require('../models/users');
const cooldownsModel = require('../models/cooldowns');

module.exports = {
    async run(bot, userID, weekend) {
        const user = await usersModel.getForDiscordID(userID);
        if (user) {
            await cooldownsModel.setDaily(userID, true);
            const discUser = await bot.users.fetch(userID);
            if (discUser) {
                await discUser.send(
                    `Thank you for voting for your support! You daily is \`,daily\` is reset, go claim it again!`
                );
            }
        }
    },
};
