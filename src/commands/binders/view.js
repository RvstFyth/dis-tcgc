const Canvas = require('canvas');
const fetch = require('node-fetch');

const binderModel = require('../../models/binders');
const binderCardsModel = require('../../models/bindersCards');
const cardsModel = require('../../models/cardsPokemon');

const emojis = {
    next: '▶️',
    previous: '◀️',
};

module.exports = {
    async run(msg, args, data) {
        if (args[0] && !isNaN(args[0])) {
            const binderID = parseInt(args[0]);
            const binder = await binderModel.get(binderID);
            if (binder) {
                const cards = await binderCardsModel.getAllForBinder(binder.id);

                return this.postEmbed(msg, cards, binder, 1);
            }
        }
    },

    async postEmbed(msg, data, binder, page = 1) {
        const limit = 4;
        const maxPage = Math.ceil(data.length / limit);
        if (page > maxPage) page = maxPage;

        const offset = page * limit - limit;
        const dData = [...data];
        const cards = dData.splice(offset, limit);

        const innerPadding = 10,
            cardWith = 246,
            cardHeight = 342,
            width = cardWith * 2 + innerPadding,
            height = cardHeight * 2 + innerPadding;

        const canvas = Canvas.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const images = [];
        for (let i in cards) {
            const image = new Canvas.Image();
            const card = await cardsModel.get(cards[i].card_id);
            image.src = await this.downloadImage(card.image_large);
            images.push(image);
        }

        for (let i = 0; i < 4; i++) {
            let x = i === 0 || i === 2 ? 0 : 246 + innerPadding;
            let y = i === 0 || i === 1 ? 0 : 342 + innerPadding;

            if (images[i]) {
                ctx.drawImage(images[i], x, y, 246, 342);
            }
        }

        const embed = {
            title: `${binder.name}`,
            image: {
                url: 'attachment://image.png',
            },
        };

        return msg.channel
            .send({
                embed,
                files: [
                    {
                        attachment: canvas.toBuffer(),
                        name: 'image.png',
                    },
                ],
            })
            .then(async (message) => {
                if (page > 1) await message.react(emojis.previous);
                if (page < maxPage) await message.react(emojis.next);
                const filter = (reaction, user) =>
                    ((page < maxPage && reaction.emoji.name === emojis.next) ||
                        (page > 1 &&
                            reaction.emoji.name === emojis.previous)) &&
                    user.id === msg.author.id;
                message
                    .awaitReactions(filter, { max: 1, time: 60 * 1000 })
                    .then((collected) => {
                        const reaction = collected.first();
                        if (reaction) {
                            if (reaction.emoji.name === emojis.next) page += 1;
                            else page -= 1;
                            return this.postEmbed(msg, data, binder, page);
                        }
                    });
            })
            .catch((e) => console.log(e));
    },

    async downloadImage(url) {
        const response = await fetch(url);
        const buffer = await response.buffer();
        return buffer;
    },
};
