module.exports = {
    aliasses: ['h'],
    async run(msg, args, data) {
        let description = this.getDescription(args[0]);
        if (!description) description = this.getDescription('main');

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

    getDescription(arg) {
        return {
            main:
                `Collect pokemon cards by just chatting! The bot will send a DM when you received a card. ` +
                `The bot only needs the perms to read messages to get started. It's advised to create a separate ` +
                `channel where the bot can post messages. \n\nYou can trigger commands in a DM with the bot, but no cards will drop ` +
                `from DMs. Spamming and abuse won't be tolerated and can result in being banned!` +
                `\n\nJoin our [Support server](https://discord.gg/Un9vEZUqNu) for giveaways or any questions you have!` +
                `\n\n\`,start\` Creates a account and start collecting cards!\n` +
                `\`,stats\` See stats about your collection\n` +
                `\`,quests\` See quests you can complete for rewards\n` +
                `\`,cards\` See the cards you collected\n` +
                `\`,boosters\` To see your booster packs\n` +
                `\`,shop\` To open the shop interface\n` +
                `\`,card [id]\` Query card data\n` +
                `\`,sell\` Sell your duplicate cards\n` +
                `\`,sets\` Shows all sets that are in the game\n` +
                `\`,set [name]\` Shows all cards in a set and how many you own\n` +
                `\`,search [argument]\` Search cards on name\n` +
                `\`,search [argument] 2\` Go to second page of search result\n\n` +
                `\`,hourly\` Claim hourly bonus\n` +
                `\`,daily\` Claim daily bonus\n` +
                `\`,cooldowns\`|\`,cd\` Check your cooldowns \n` +
                `\`,trade @user\` Trade with a friend!\n` +
                `\`,donate\` Support the development of this bot and get rewards!\n\n` +
                `\`,help set\` More information about the \`,set\` command. Worth a read!`,
            set:
                `With the \`,set [setname]\` command you can query cards from a set. \n` +
                `This command accepts a few filters you can use for getting specific results.\n\n` +
                `**Examples:**\n` +
                `\`,set [name] -o\` To query the cards you own from a set\n` +
                `\`,set [name] -m\` To query the cards you miss from a set\n` +
                `\`,set [name] -d -r=rare\` To query the duplicate cards of a set with rare as rarity \n` +
                `\`,set [name] -d -t=fire\` To query the duplicate cards of a set with fire type \n` +
                `Valid rarities: \`common|uncommon|rare|legend|promo\`\n\n` +
                `For valid set names, see \`,sets\` command\n` +
                `For valid card types, see \`,types\` command`,
            binders:
                `\`,binders\` Lists your binders.\n` +
                `\`,binders @mention\` Lists mentioned user binders.\n` +
                `\`,binder [binderID]\` View a binder.\n` +
                `\`,binders create [name]\` Create a new binder.\n` +
                `\`,binders delete [binderID]\` Delete a binder.\n` +
                `\`,binders txt [binderID]\` Text version of a binder.\n\n` +
                `\`,binders add [binderID] [cardID]\` Add a card.\n` +
                `\`,binders remove [binderID] [cardID]\` Removes a card.\n`,
        }[arg];
    },
};
