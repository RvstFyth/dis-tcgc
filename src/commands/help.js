module.exports = {
    async run(msg, args, data) {
        let description =
            `` +
            `\`,start\` Creates a account and start collecting cards!\n` +
            `\`,cards\` See the cards you collected\n` +
            `\`,card [id]\` Query card data\n` +
            `\`,cards -d\` Shows your duplicate cards\n` +
            `\`,sets\` Shows all sets that are in the game\n` +
            `\`,set [name]\` Shows all cards in a set and how many you own\n` +
            `\`,set [name] -m\` Shows all cards you are missing from a set\n` +
            `\`,set [name] -o\` Shows all cards you own from a set\n` +
            `\`,hourly\` Claim hourly bonus\n` +
            `\`,daily\` Claim daily bonus`;

        const embed = {
            title: 'help',
            description,
        };

        return msg.channel.send({ embed });
    },
};
