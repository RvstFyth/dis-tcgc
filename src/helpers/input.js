const confirmEmoji = '✅';

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
                    const filter = (reaction, user) =>
                        reaction.emoji.name === confirmEmoji &&
                        user.id === msg.author.id;
                    message
                        .awaitReactions(filter, { max: 1, time: 30 * 1000 })
                        .then(async (collected) => {
                            const reaction = collected.first();
                            if (reaction) resolve(true);
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
