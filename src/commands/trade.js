const usersCardsPokemonModel = require('../models/usersCardsPokemon');
const usersModel = require('../models/users');

const confirmEmoji = '✅';

module.exports = {
    async run(msg, args, data) {
        if (!msg.mentions.users.size)
            return msg.channel.send(
                `**${msg.author.username}** who are you trying to trade with?`
            );
        const mention = msg.mentions.users.first();
        const secondUser = await usersModel.getForDiscordID(mention.id);
        if (!secondUser)
            return msg.channel.send(
                `**${msg.author.username}** ${mention.username} doesn't have a account yet..`
            );
        const embed = {
            title: `${msg.author.username} trade request`,
            description: `${mention.username} confirm to start the trade.`,
        };
        msg.channel
            .send({ embed })
            .then(async (message) => {
                await message.react(confirmEmoji);
                const filter = (reaction, user) => {
                    return (
                        reaction.emoji.name === confirmEmoji &&
                        user.id === mention.id
                    );
                };
                message
                    .awaitReactions(filter, { time: 30000, max: 1 })
                    .then(async (collected) => {
                        const reaction = collected.first();
                        if (reaction) return this.add(msg, msg.author, mention);
                        else
                            return msg.channel.send(
                                `**${msg.author.username}** trade cancelled..`
                            );
                    })
                    .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e));
    },

    async add(msg, first, second) {
        const firstOffers = [];
        const secondOffers = [];

        first.offers = [];
        second.offers = [];
        first.confirmed = false;
        second.confirmed = false;

        const embed = {
            title: `${first.username} & ${second.username} trade`,
            description:
                // `\`add gold [amount]\` Add gold to the trade\n` +
                `\`add card [id]\` Add a card to the trade\n` +
                `\`confirm\` when you are ready for the confirmation step`,
            fields: [
                { name: first.username, value: `\u200b`, inline: true },
                { name: second.username, value: `\u200b`, inline: true },
            ],
        };

        msg.channel
            .send({ embed })
            .then(async (message) => {
                const filter = (m) =>
                    [first.id, second.id].indexOf(m.author.id) > -1 &&
                    (m.content.toLowerCase().startsWith('add') ||
                        m.content.toLowerCase().startsWith('confirm'));
                const collector = message.channel.createMessageCollector(
                    filter,
                    { time: 60 * 2 * 1000 }
                );
                collector.on('collect', async (m) => {
                    const user = m.author.id === first.id ? first : second;
                    if (m.content.toLowerCase().startsWith('add card')) {
                        const cardID = m.content.split(' ').pop();
                        const card = await usersCardsPokemonModel.getForUser(
                            user.id,
                            cardID
                        );
                        if (card && user.offers.indexOf(card.id) < 0) {
                            user.offers.push(card.id);
                            if (user.id === first.id) {
                                embed.fields[0].value += `#${card.id} - ${card.name}\n`;
                            } else
                                embed.fields[1].value += `#${card.id} - ${card.name}\n`;
                            await message.edit({ embed });
                        }
                    } else if (m.content.toLowerCase().startsWith('confirm')) {
                        user.confirmed = true;
                        if (first.confirmed && second.confirmed) {
                            collector.stop();
                        }
                    }
                });

                collector.on('end', async (collected) => {
                    if (
                        first.confirmed &&
                        second.confirmed &&
                        (first.offers.length || second.offers.length)
                    ) {
                        embed.description = `Confirm the trade by reacting with ${confirmEmoji}`;
                        message.edit({ embed }).then(async (m) => {
                            await m.react(confirmEmoji);
                            const filter = (reaction, user) =>
                                reaction.emoji.name === confirmEmoji &&
                                [first.id, second.id].indexOf(user.id) > -1;
                            m.awaitReactions(filter, {
                                time: 30000,
                                max: 2,
                            }).then(async (collected) => {
                                const reaction = collected.first();
                                if (
                                    reaction.users.cache.has(first.id) &&
                                    reaction.users.cache.has(second.id)
                                ) {
                                    return this.actualTrade(m, first, second);
                                } else
                                    return msg.channel.send(
                                        `**${first.username}**, **${second.username}** trade cancelled..`
                                    );
                            });
                        });
                    } else
                        return msg.channel.send(
                            `**${first.username}**, **${second.username}** trade cancelled..`
                        );
                });
            })
            .catch((e) => console.log(e));
    },

    async actualTrade(msg, first, second) {
        let valid = true;
        for (let i in first.offers) {
            const userCards = await usersCardsPokemonModel.getForUser(
                first.id,
                first.offers[i]
            );
            if (!userCards || userCards.amount < 1) {
                valid = false;
                break;
            }
        }
        for (let i in second.offers) {
            const userCards = await usersCardsPokemonModel.getForUser(
                second.id,
                second.offers[i]
            );
            if (!userCards || userCards.amount < 1) {
                valid = false;
                break;
            }
        }
        if (!valid)
            return msg.channel.send(
                `**${first.username}, ${second.username}** data manipulation detected, cancelling trade...`
            );
        else {
            for (let i in first.offers) {
                const userCards = await usersCardsPokemonModel.getForUser(
                    first.id,
                    first.offers[i]
                );
                await usersCardsPokemonModel.setAmount(
                    first.id,
                    first.offers[i],
                    parseInt(userCards.amount) - 1
                );
                await usersCardsPokemonModel.add(second.id, first.offers[i], 1);
            }
            for (let i in second.offers) {
                const userCards = await usersCardsPokemonModel.getForUser(
                    second.id,
                    second.offers[i]
                );
                await usersCardsPokemonModel.setAmount(
                    second.id,
                    second.offers[i],
                    parseInt(userCards.amount) - 1
                );
                await usersCardsPokemonModel.add(first.id, second.offers[i], 1);
            }

            return msg.channel.send(
                `**${first.username}, ${second.username}** trade completed!`
            );
        }
    },
};
