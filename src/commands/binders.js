const bindersModel = require('../models/binders');

const viewModule = require('./binders/view');

module.exports = {
    aliasses: ['bn'],
    async run(msg, args, data) {
        if (args[0] && !isNaN(args[0])) {
            return viewModule.run(msg, args, data);
        }

        return this.list(msg, args, data);
    },

    async list(msg, args, data) {
        let userID;
        if (msg.mentions.users.size) {
            userID = msg.mentions.users.first().id;
        } else userID = msg.author.id;
        const binders = await bindersModel.getAllForUser(userID);
        let description;
        if (!binders || !binders.length)
            description = `No records yet... See \`,help binders\` to get started.`;
        else {
            description = '**ID - Name**\n';
            for (let i in binders) {
                description += `${binders[i].id} - ${binders[i].name} \n`;
            }
        }

        const embed = {
            title: `${msg.author.username}'s binders`,
            description,
        };

        return msg.channel.send({ embed });
    },
};
