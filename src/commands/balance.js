module.exports = {
    aliasses: ['bal'],
    async run(msg, args, data) {
        return msg.channel.send(
            `**${msg.author.username}** you have ${data.user.coins} coins`
        );
    },
};
