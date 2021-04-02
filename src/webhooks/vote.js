const usersModel = require('../models/users');

module.exports = {
    async run(bot, userID, weekend) {
        const user = await usersModel.getForDiscordID(userID);
        if (user) {
            const char = await characterHelper.composeFromUserRecord(user);
            if (char) {
                if (discUser) {
                    await discUser.send(
                        `Thank you for for your support!\nYour daily is reset, you can claim it again with \`,daily\``
                    );
                }
            }
        }
    },
};
