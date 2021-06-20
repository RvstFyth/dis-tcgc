const bindersModel = require('../models/binders');
const input = require('../helpers/input');

module.exports = {
    async run(msg, args, data) {
        switch (args[0]) {
            case 'create':
                return this.create(msg, args, data);
            case 'list':
            default:
                return this.list(msg, args, data);
        }
    },

    async list(msg, args, data) {
        const binders = await bindersModel.getAllForUser(msg.author.id);
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

    async create(msg, args, data) {
        const name = args[1];
        if (name) {
            const confirmed = await input.askUserToConfirm(
                `Create a new binder with the name **${args[1]}**?`,
                msg
            );
            if (confirmed) {
                const newID = await bindersModel.create(msg.author.id, args[1]);
                return msg.channel.send(
                    `**${msg.author.username}** binder with id ${newID} created!`
                );
            }
        }
        return msg.channel.send(
            `**${msg.author.username}** please provide a name..`
        );
    },
};
