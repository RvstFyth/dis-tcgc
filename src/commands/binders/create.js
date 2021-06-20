const bindersModel = require('../../models/binders');
const input = require('../../helpers/input');

module.exports = {
    async run(msg, args, data) {
        const name = args[0];
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
