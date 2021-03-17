const questsModel = require('../../../../../models/usersQuests');

module.exports = {
    label: `Runecord guide`,
    description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.`,

    async talk(data) {
        const survivalQuest = await questsModel.getFor(data.userID, 1);
        if (1 === 1 || !survivalQuest || !survivalQuest.completed) {
            if (!survivalQuest) await questsModel.create(data.userID, 1);
            return (
                `` +
                `Hello, and welcome to runecord!\n\n` +
                `I will teach you some basic commands to move around in runecord.\n` +
                `The world is divided in *area's*, and each area has multiple *locations*.\n` +
                `To see which locations you can *walk* to in your area, you can use the \`${data.prefix}area\` command. You can use the \`${data.prefix}walk n\` command. Replace \`n\` with the number you see in front of the location name\n\n` +
                `The \`${data.prefix}location\` command will show you information about the location you are in.\n` +
                `You will see NPC's you can interact with, for this use the \`${data.prefix}talk n\`, where you replace \`n\` with the number in front of the NPC name.` +
                `There is a some more info in that prompt, but you will learn during this tutorial. \n\nFor now, you should find the survival expert and *talk* to him. You can find him in the forest!\n\n` +
                `I have assigned your first quest to you. You can use the \`${data.prefix}quests\` command to get a overview of your active quests.`
            );
            //return `Explanation about walk and travel command\n\nExplanation on the area and location command\n\nI have assigned your first quest to you.\nYou can use the \`${data.prefix}quests\` command to get a overview of your active quests.`;
        } else if (!survivalQuest.completed)
            return `Did you visit the survival expert yet?`;

        return `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.`;
    },
};
