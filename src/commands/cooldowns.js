const cooldownsModel = require('../models/cooldowns');
const valuesHelper = require('../helpers/values');

module.exports = {
    aliasses: ['cd'],
    async run(msg, args, data) {
        const cooldowns = await cooldownsModel.getFor(msg.author.id);
        const ts = valuesHelper.currentTimestamp();

        const embed = {
            title: `${msg.author.username} cooldowns`,
            description:
                `` +
                `Hourly: ${
                    ts > cooldowns.hourly
                        ? 'READY'
                        : valuesHelper.formattedDifferenceBetweenTimestamp(
                              0,
                              cooldowns.hourly,
                              true
                          )
                } \n` +
                `Daily: ${
                    ts > cooldowns.daily
                        ? 'READY'
                        : valuesHelper.formattedDifferenceBetweenTimestamp(
                              0,
                              cooldowns.daily,
                              true
                          )
                }`,
        };

        return msg.channel.send({ embed });
    },
};
