const userQuestsModel = require('../../../../../models/usersQuests');
const inventoryModel = require('../../../../../models/usersInventory');
module.exports = {
    label: 'mining trainer',
    description: '',
    chatHead: 'Mining_Instructor_chathead.png',

    async talk(data) {
        const requiredQuest = await userQuestsModel.getFor(data.userID, 5);
        if (!requiredQuest || !requiredQuest.completed)
            return `you should follow the quests. \`${data.prefix}quests\``;

        const firstQuest = await userQuestsModel.getFor(data.userID, 6);
        if (!firstQuest) {
            await userQuestsModel.create(data.userID, 6);
            await inventoryModel.add(data.userID, 41, 1);
            return (
                `Hi there!\n\n` +
                `All you need to get started with mining is a pickaxe. You see these rocks around here? ` +
                `These contains ores we can use to smelt to bars. Those bars is what we use to smith gear. ` +
                `As you can see in the \`${data.prefix}loc\` overview there is copper and tin here. We need one of each ` +
                `to smelt in a bronze bar. Use the \`${data.prefix}mine copper\` and \`${data.prefix}mine tin\` commands to ` +
                `gather the required ores. Then use the furnace with the \`${data.prefix}smelt bronze\` command, to smelt it into a bronze bar.` +
                `\n\nYou received a bronze pickaxe`
            );
        } else if (firstQuest && !firstQuest.completed)
            return `Did you get a bronze bar already?`;

        const secondQuest = await userQuestsModel.getFor(data.userID, 7);
        if (!secondQuest) {
            await userQuestsModel.create(data.userID, 7);
            return (
                `Let's smith a dagger from that bronze bar you just smelted. Smithing requires a anvil. Lucky for you, there is one standing right here.\n` +
                `Now use the \`${data.prefix}smith bronze dagger\` command. And make sure to wield your new dagger with \`${data.prefix}wield bronze dagger\`!`
            );
        } else if (secondQuest && !secondQuest.completed)
            return `You will need that bronze dagger before you continue..`;
        else
            return `The combat instructor is waiting on you. You should hurry up!`;
    },
};
