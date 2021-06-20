const bindersModel = require('../../models/binders');
const bindersCardsModel = require('../../models/bindersCards');
const input = require('../../helpers/input');

module.exports = {
    async run(msg, args, data) {
        const binderID = args[0];
        if (binderID) {
            const binder = await bindersModel.getForUser(
                binderID,
                msg.author.id
            );
            if (binder) {
                const confirmed = await input.askUserToConfirm(
                    `Delete binder with the name **${binder.name}**?`,
                    msg
                );
                if (confirmed) {
                    await bindersModel.delete(binderID);
                    await bindersCardsModel.deleteForBinderID(binderID);

                    return msg.channel.send(
                        `**${msg.author.username}** deleted ${binder.name}!`
                    );
                }
            } else {
                return msg.channel.send(
                    `**${msg.author.username}** you don't own a binder with id ${binderID}..`
                );
            }
        }
    },
};
