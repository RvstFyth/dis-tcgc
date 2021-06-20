const confirmEmoji = '✅';
const cancelEmoji = '🔴';

module.exports = {
    async askUserToConfirm(description, msg, removeAfterTimeout = false) {
        return new Promise((resolve) => {
            const embed = {
                title: `Confirm`,
                description,
            };

            msg.channel
                .send({ embed })
                .then(async (message) => {
                    await message.react(confirmEmoji);
                    await message.react(cancelEmoji);
                    const filter = (reaction, user) =>
                        [confirmEmoji, cancelEmoji].indexOf(
                            reaction.emoji.name
                        ) > -1 && user.id === msg.author.id;
                    message
                        .awaitReactions(filter, { max: 1, time: 30 * 1000 })
                        .then(async (collected) => {
                            const reaction = collected.first();
                            if (
                                reaction &&
                                reaction.emoji.name === confirmEmoji
                            )
                                resolve(true);
                            else {
                                if (removeAfterTimeout) await message.delete();
                                resolve(false);
                            }
                        });
                })
                .catch((e) => console.log(e));
        });
    },
};
