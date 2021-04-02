module.exports = {

    async run(msg, args, data)
    {
        const embed = {
            title: 'Vote',
            description: `[You can vote for this bot on top.gg](https://top.gg/bot/821802913533657138/vote).\n` +
                `This will reset your daily, so you can claim it again!`
        };

        return msg.channel.send({embed});
    }
}
