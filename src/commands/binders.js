const bindersModel = require('../models/binders');

const viewModule = require('./binders/view');

module.exports = {
    aliasses: ['bn'],
    async run(msg, args, data) {
        if (args[0] && !isNaN(args[0])) {
            return viewModule.run(msg, args, data);
        }
        switch (args[0]) {
            case 'create':
                return this.create(msg, args, data);
            case 'add':
                return this.add(msg, args, data);
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
};
