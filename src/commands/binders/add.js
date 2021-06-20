const bindersModel = require('../../models/binders');
const bindersCardsModel = require('../../models/bindersCards');
const userCardsModel = require('../../models/usersCardsPokemon');

module.exports = {
    aliasses: ['a'],

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
            const userCards = await userCardsModel.getForUser(
                msg.author.id,
                cardID
            );
            if (!userCards || userCards.amount < 1)
                return msg.channel.send(
                    `**${msg.author.username}** you don't own a card with ID ${cardID}..`
                );

            const existing = await bindersCardsModel.recordExists(
                binderID,
                cardID
            );

            if (existing)
                return msg.channel.send(
                    `**${msg.author.username}** you already have this card in ${binder.name}`
                );

            await bindersCardsModel.create(binderID, cardID);
            return msg.channel.send(
                `**${msg.author.username}** added ${cardID} to ${binder.name}`
            );
        }
    },
};
