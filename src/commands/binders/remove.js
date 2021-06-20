const bindersModel = require('../../models/binders');
const bindersCardsModel = require('../../models/bindersCards');
const input = require('../../helpers/input');
const cardsModel = require('../../models/cardsPokemon');

module.exports = {
    async run(msg, args, data) {
        const binderID = !isNaN(args[0]) ? parseInt(args[0]) : null;
        const cardID = !isNaN(args[1]) ? parseInt(args[1]) : null;
        if (binderID && cardID) {
            const binder = await bindersModel.getForUser(
                binderID,
                msg.author.id
            );

            if (!binder)
                return msg.channel.send(
                    `**${msg.author.username}** you don't own a binder with ID ${binderID}..`
                );
            const recordExists = await bindersCardsModel.recordExists(
                binderID,
                cardID
            );
            if (!recordExists)
                return msg.channel.send(
                    `**${msg.author.username}** you don't have this card in ${binder.name}..`
                );
            const card = await cardsModel.get(cardID);

            const confirmed = await input.askUserToConfirm(
                `**${msg.author.username}** confirm to remove ${card.name} from ${binder.name}`,
                msg,
                true
            );

            if (confirmed) {
                await bindersCardsModel.delete(binderID, cardID);
                return msg.channel.send(
                    `**${msg.author.username}** removed ${card.name} from ${binder.name}`
                );
            }
        }
    },
};
