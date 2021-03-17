const usersModel = require('../models/users');

module.exports = {

    async run(msg, args, data)
    {
        const existingUser = await usersModel.getForDiscordID(msg.author.id);
        if(existingUser) return msg.channel.send(`**${msg.author.username}** you are already registered...`);

        await usersModel.create(msg.author.id);

        return msg.channel.send(`**${msg.author.username}** account created! See \`${data.prefix}help\` to get started!`);
    },
};