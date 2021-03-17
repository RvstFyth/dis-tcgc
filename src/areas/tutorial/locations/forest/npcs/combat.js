const questsModel = require('../../../../../models/usersQuests');

module.exports = {
    label: 'combat instructor',
    chatHead: 'Vannaka_chathead.png',
    async talk(data) {
        const requiredQuest = await questsModel.getFor(data.userID, 7);
        if (!requiredQuest || !requiredQuest.completed)
            return `you should follow the quests. \`${data.prefix}quests\``;

        const firstQuest = await questsModel.getFor(data.userID, 9);
        if (!firstQuest) {
            await questsModel.create(data.userID, 9);
            return (
                `Hi there!\n` +
                `I will teach you the basics about combat in RuneCord.\n\n` +
                `The \`${data.prefix}loc\` command has a mobs field if there are mobs on your location. \n` +
                `Use the \`${data.prefix}kill [mob]\` command to start attacking them. Once the fight is done, the loot will drop on the floor ` +
                `(except for gold), so always use the \`${data.prefix}loc\` command to check for valuable loot. You can pickup items with the \`${data.prefix}pu [item]\` command. ` +
                `As you progress mobs become stronger. So it's always good to wear the strongest armour you can get!` +
                `\n\n**Combat styles**\nEach weapon has a few combat style, you can check this with the \`,styles\` command. This will ` +
                `output the styles you can select and the style that is active. Each combat style trains a different skill.` +
                `\n\nNow for your next quest, i want you to kill a rat.` +
                `\nBefore you start, make sure you are wielding your dagger \`${data.prefix}wield bronze dagger\`!`
            );
        }
        if (firstQuest && !firstQuest.completed)
            return `What are you waiting for? Just kill a rat already..`;

        return `The financial adviser is waiting for you, you can find him at the bank`;
    },
};
