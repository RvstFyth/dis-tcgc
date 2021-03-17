const questsModel = require('../../../../../models/usersQuests');
const inventoryModel = require('../../../../../models/usersInventory');

module.exports = {
    label: `Survival expert`,
    description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.`,
    chatHead: 'Survival_Expert_chathead.webp',

    async talk(data) {
        const firstQuest = await questsModel.getFor(data.userID, 1);
        if (firstQuest) {
            if (!firstQuest.completed) {
                await questsModel.setCompleted(
                    firstQuest.user_id,
                    firstQuest.quest_id
                );
                await data.msg.channel.send({
                    embed: {
                        title: `${data.user.name} quest completed!`,
                        description: firstQuest.name,
                    },
                });

                await questsModel.create(data.userID, 2);
                await inventoryModel.add(data.userID, 39, 1);
                return (
                    `**Hello there!**\n\n` +
                    `I will teach you the basics of survival.\nThe first skill we will be looking at is woodcutting.\n` +
                    `If you use the \`${data.prefix}loc\` command, you will see a field with resources. As you can see we are surrounded by \`tree\`s here.\n` +
                    `Go chop a tree with the \`${data.prefix}chop tree\` command, and return to me.\n` +
                    `\n\nThe survival expert just gave you a copper axe. You can see your inventory with the \`${data.prefix}backpack\` command.`
                );
            }
        } else
            return `You might want to talk with the Runecord guide first.. You should have passed him on your way to here.`;

        const secondQuest = await questsModel.getFor(data.userID, 2);
        if (secondQuest && !secondQuest.completed)
            return `Did you chop that tree already? We really need it to continue...`;

        const thirdQuest = await questsModel.getFor(data.userID, 3);
        if (!thirdQuest) {
            await questsModel.create(data.userID, 3);
            await inventoryModel.add(data.userID, 38, 1);
            return (
                `You got the logs i see. Let's continue with the next skill, firemaking.\n` +
                `To make a fire you need a tinderbox and something to burn.\n` +
                `Here, take this..` +
                `\n\nYou received a tinderbox\n\n` +
                `For your next quest i want you to make a fire, you can use the \`${data.prefix}light logs\` command for this. ` +
                `Don't worry if you fail the first time, it get's easier when you train that skill.`
            );
        }
        if (thirdQuest && !thirdQuest.completed)
            return `You have to make a fire to to continue..`;

        const fourthQuest = await questsModel.getFor(data.userID, 4);
        if (!fourthQuest) {
            await questsModel.create(data.userID, 4);
            await inventoryModel.add(data.userID, 40, 1);
            return (
                `That was easy, wasn't it? The next skill we will be looking at is fishing.\n` +
                `Fishing is a excellent way to gather some food. It might be hard at first, but it gets easier the more you level this skill.\n` +
                `You can only fish at fishing spots, which are marked in the resources field in the \`${data.prefix}loc\` command.\n\n` +
                `Here take this, and try to catch some shrimps!\n\n` +
                `You received a small fishing net. Use the \`${data.prefix}fish net\` command to use it!`
            );
        }
        if (fourthQuest && !fourthQuest.completed)
            return `You have the raw shrimps already?`;

        const fifthQuest = await questsModel.getFor(data.userID, 5);
        if (!fifthQuest) {
            await questsModel.create(data.userID, 5);
            return (
                `Good job on catching those shrimps. Now let's cook them.\n` +
                `You can eat cooked food to recover hitpoints. The amount depends on the food you eat.\n` +
                `For cooking you need to be at a cooking range or make a fire. The cooking range gives a slight bonus in success chance.\n\n` +
                `Use the \`${data.prefix}cook shrimps\` command for this quest.`
            );
        }
        if (fifthQuest && !fifthQuest.completed)
            return `**${data.user.name}** did you cook those shrimps already?`;

        return `I learned you all that is possible in this short time. You should find the mining trainer now.`;
    },
};
