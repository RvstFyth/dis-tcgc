const usersModel = require('../models/users');

module.exports = {
    async run(bot, userID, weekend) {
        const user = await usersModel.getForDiscordID(userID);
        if (user) {
            const discUser = await bot.users.fetch(userID);
            if (discUser) {
                await discUser.send(
                    `Thank you for voting for your support! You daily is \`,daily\` is reset, go claim it again!`
                );
            }
        }
    },
};
