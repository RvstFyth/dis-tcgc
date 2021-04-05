const usersModel = require('../models/users');
const userCardsPokemonModel = require('../models/usersCardsPokemon');

module.exports = {
    async run(msg, args, data) {
        //if (!msg.guild)
            //return msg.channel.send(`This command can't run in DM..`);

        const totalUsers = await usersModel.getTotalRecords();
        const totalCollected = await userCardsPokemonModel.getTotalCollected();

        const embed = {
            title: `Info`,
            description:
                `` +
                `Servers: ${msg.client.guilds.cache.size}\n` +
                `Users: ${totalUsers}\n` +
                `Total collected: ${totalCollected}`,
        };

        return msg.channel.send({ embed });
    },
};
