module.exports = {
    async run(msg, args, data) {
        let description =
            `Collect pokemon cards by just chatting! The bot will send a DM when you received a card. ` +
            `The bot only needs the perms to read messages to get started. It's advised to create a separate ` +
            `channel where the bot can post messages. \n\nYou can trigger commands in a DM with the bot, but no cards will drop ` +
            `from DMs. Spamming and abuse won't be tolerated and can result in being banned!` +
            `\n\n\`,start\` Creates a account and start collecting cards!\n` +
            `\`,cards\` See the cards you collected\n` +
            `\`,cards -d\` Shows your duplicate cards\n` +
            `\`,boosters\` To see your booster packs\n` +
            `\`,shop\` To open the shop interface\n` +
            `\`,card [id]\` Query card data\n` +
            `\`,sets\` Shows all sets that are in the game\n` +
            `\`,set [name]\` Shows all cards in a set and how many you own\n` +
            `\`,set [name] -m\` Shows all cards you are missing from a set\n` +
            `\`,set [name] -o\` Shows all cards you own from a set\n` +
            `\`,search [argument]\` Search cards on name\n` +
            `\`,search [argument] 2\` Go to second page of search result\n\n` +
            `\`,hourly\` Claim hourly bonus\n` +
            `\`,daily\` Claim daily bonus\n` +
            `\`,donate\` Support the development of this bot and get rewards!`;

        const embed = {
            title: 'help',
            description,
            fields: [
                {
                    name: `\u200b`,
                    value: `[Support server](https://discord.gg/Un9vEZUqNu) | [Donate with paypal/cc](https://donatebot.io/checkout/823144389714378752)`,
                },
            ],
        };

        return msg.channel.send({ embed });
    },
};
