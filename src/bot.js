// Require 3rd party libraries
const discord = require('discord.js');

// Require custom modules
const db = require('./db');
const config = require('./config');
const commandsHelper = require('./helpers/commands');
const logger = require('./helpers/logger');
const valuesHelper = require('./helpers/values');
const random = require('./helpers/random');

// Initialize modules
db.init();
commandsHelper.loadCommands(`${__dirname}/commands/`);
logger.init();

const usersModel = require('./models/users');
const cardsPokemonModel = require('./models/cardsPokemon');
const userCardsPokemonModel = require('./models/usersCardsPokemon');

const client = new discord.Client();

client.on('ready', async () => {
    logger.info(`Logged in as ${client.user.tag}!`);
    // TopGG bot listing API
    if (config.live && config.topgg_token) {
        const DBL = require('dblapi.js');
        const dbl = new DBL(config.topgg_token, client);
        dbl.on('posted', () => {
            console.log('Server count posted!');
        });

        setInterval(() => {
            dbl.postStats(client.guilds.cache.size)
                .then(() => console.log(`Posted stats to top.gg`))
                .catch((e) => console.log(e));
        }, 5 * 60 * 1000);
    }
    require('./webhooks/donate');
});

client.on('message', async (msg) => {
    if (
        msg.guild &&
        !msg.guild.me.permissionsIn(msg.channel.id).has('SEND_MESSAGES')
    )
        return;
    if (msg.author.bot) return;

    let prefix = config.botPrefix;
    // let guildSettings = await guildSettingsModel.getFor(msg.guild.id);
    // if(!guildSettings) {
    //     await guildSettingsModel.create(msg.guild.id, prefix);
    //     guildSettings = await guildSettingsModel.getFor(msg.guild.id);
    // }
    // if(guildSettings) prefix = guildSettings.prefix;

    if (msg.content.toLowerCase().startsWith(prefix)) {
        const command = msg.content
            .toLowerCase()
            .substr(prefix.length)
            .split(' ')
            .filter((c) => c)[0];
        if (commandsHelper.isAllowedCommand(command)) {
            logger.info(
                `${msg.author.username} -- ${msg.content.toLowerCase()}`
            );

            const user = await usersModel.getForDiscordID(msg.author.id);
            if (!user && ['start', 'help'].indexOf(command.toLowerCase()) < 0)
                return msg.channel.send(
                    `**${msg.author.username}** you are not registered yet, use \`${prefix}start\` to create a account`
                );

            const args = commandsHelper.parseArguments(msg, [
                prefix,
                command,
                prefix + command,
            ]);
            const module = commandsHelper.getModuleForCommand(command);

            const data = {
                prefix,
                user,
            };

            if (msg.mentions.has(client.user))
                return require('./commands/help').run(msg, []);

            if (args[0] && module && module.sub && module.sub[args[0]]) {
                module.sub[args[0]].run(msg, args.splice(1), data);
            } else if (module && module.main) module.main.run(msg, args, data);
        }
    } else if (msg.guild) {
        const num = random.number(1, 100);
        const num2 = random.number(1, 100);
        if (random.number(1, 100) === num || random.number(1, 100) === num2) {
            // Check is user is registered
            const user = await usersModel.getForDiscordID(msg.author.id);
            if (user) {
                const rarityNum = random.number(1, 100);
                let rarity;
                if(rarityNum < 2) rarity = 'rare';
                else if(rarityNum < 20) rarity = 'uncommon';
                else rarity = 'common';

                const card = await cardsPokemonModel.getRandomForRarity(rarity);

                const imagePathSplitted = card.image_large.split('/');
                await userCardsPokemonModel.add(msg.author.id, card.id, 1);
                const coins = random.number(5, 15);
                await usersModel.addCoins(msg.author.id, coins);
                let description =
                    `Name: ${card.name}\n` +
                    `Set: ${card.set}\n` +
                    `ID: ${card.id}\n` + 
                    `Rarity: ${card.rarity}`;

                const embed = {
                    title: `You got a new card!`,
                    description,
                    image: {
                        url: `attachment://${
                            imagePathSplitted[imagePathSplitted.length - 1]
                        }`,
                    },
                    footer: {
                        text: `You got ${coins} coins!`,
                    },
                };
                try {
                    await msg.author.send({
                        embed,
                        files: [
                            {
                                attachment: card.image_large,
                                name:
                                    imagePathSplitted[
                                        imagePathSplitted.length - 1
                                    ],
                            },
                        ],
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
});

client.on('guildCreate', async (guild) => {
    if (config.support_server_id && config.support_events_channel_id) {
        const channel = client.channels.cache.find(
            (c) => c.id == config.support_events_channel_id
        );
        if (channel) {
            channel.send(`Guild added ${guild.name} - ${guild.id}`);
        }
    }
});

client.on('guildDelete', async (guild) => {
    if (config.support_server_id && config.support_events_channel_id) {
        const channel = client.channels.cache.find(
            (c) => c.id == config.support_events_channel_id
        );
        if (channel) {
            channel.send(`Guild removed ${guild.name} - ${guild.id}`);
        }
    }
});

client.login(config.discordToken);
