module.exports = {

    async run(msg, args, data)
    {
        const embed = {
            title: 'Vote',
            description: `[You can vote for this bot on top.gg](https://top.gg/bot/821802913533657138/vote).\n` +
                `This will reset your daily cooldown and you get a random booster for it!`
        };

        return msg.channel.send({embed});
    }
}
