const questsModel = require('../../../../../models/usersQuests');

module.exports = {
    label: 'Financial advisor',

    async talk(data) {
        const requiredQuest = await questsModel.getFor(data.userID, 9);
        if (!requiredQuest || !requiredQuest.completed)
            return `you should follow the quests. \`${data.prefix}quests\``;
        return (
            `Oh, hello!\n\n` +
            `I am the financial advisor and will teach you how the bank works.\n` +
            `The bank is where you can store your items to clear space in your inventory, and will prevent you loose items on death.\n\n` +
            `For accessing the bank you can use the \`${data.prefix}bank\` command. This will list all the items in your bank. ` +
            `Use \`${data.prefix}bstore <amount> [item]\` to store items, and \`${data.prefix}bget <amount> [item]\` to withdraw items from your bank.\n\n` +
            `You can access the bank on any location with \`bank\` in the \`tools\` overview of the \`${data.prefix}loc\` command.\n\n` +
            `**You can leave tutorial island now with the \`,travel 1\` command!**`
        );
    },
};
