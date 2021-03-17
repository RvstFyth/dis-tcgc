const valuesHelpers = require('../../../../../helpers/values');

module.exports = {
    label: `Hans`,
    chatHead: `Hans_chathead.png`,
    async talk(data) {
        if (data.args[0]) {
            switch (data.args[0]) {
                case '1':
                    return `Who, the Duke? He's in his study, on the first floor.`;
                case '2':
                    return `__Hans runs away screaming__\n\n**HELP!** **HELP**`;
                case '3':
                    return `You are in Lumbridge Castle.`;
                case `4`:
                    const timeSpent = valuesHelpers.formattedDifferenceBetweenTimestamp(
                        parseInt(data.user.created_timestamp),
                        0,
                        false
                    );
                    return (
                        'Ahh, I see all the newcomers arriving in Lumbridge, fresh-faced and eager for adventure. I remember you...\n\n' +
                        `You've spent ${timeSpent.days} days, ${timeSpent.hours} hours, ${timeSpent.minutes} minutes in the world since you arrived ${timeSpent.days} days ago.`
                    );
            }
        }
        return (
            `Hello. What are you doing here? \n\n` +
            `\`1\` I'm looking for whoever is in charge of this place. \n` +
            `\`2\` I have come to kill everyone in this castle! \n` +
            `\`3\` I don't know. I'm lost. Where am I? \n` +
            `\`4\` Can you tell me how long I've been here?\n` +
            `\`5\` Nothing..`
        );
    },
};
