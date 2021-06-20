const bindersModel = require('../../models/binders');
const bindersCardsModel = require('../../models/bindersCards');
const cardsModel = require('../../models/cardsPokemon');

module.exports = {
    async run(msg, args, data) {
        const binderID = args[0];
        if (binderID) {
            const binder = await bindersModel.get(binderID);
            if (binder) {
                const cards = await bindersCardsModel.getAllForBinder(binderID);

                let description;
                if (cards && cards.length) {
                    description = '**ID - name - set**\n';
                    for (let i in cards) {
                        description += `${cards[i].card_id} - ${cards[i].name} - ${cards[i].set}\n`;
                    }
                } else description = '...';
                const embed = {
                    title: `${binder.name}`,
                    description,
                };

                return msg.channel.send({ embed });
            }
        }
    },
};
