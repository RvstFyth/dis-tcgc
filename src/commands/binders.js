const bindersModel = require('../models/binders');
const bindersCardsModel = require('../models/bindersCards');
const input = require('../helpers/input');
const userCardsModel = require('../models/usersCardsPokemon');

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

    async add(msg, args, data) {
        const binderID = !isNaN(args[1]) ? parseInt(args[1]) : null;
        const cardID = !isNaN(args[2]) ? parseInt(args[2]) : null;
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
