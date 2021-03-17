const fs = require('fs');
const logger = require('./logger');
const config = require('../config');

let commands = {};
let aliasses = {};
let allowedCommands = [];

module.exports = {
    getModuleForCommand(val) {
        if (commands[val]) return commands[val];
        else if (aliasses[val]) return commands[aliasses[val]];
    },

    isAllowedCommand(val) {
        return val && allowedCommands.indexOf(val.toLowerCase()) > -1;
    },

    parseArguments(discordMsgObject, argsToRemove) {
        if (!argsToRemove || !argsToRemove.length) argsToRemove = [];
        let message = discordMsgObject.content.toLowerCase();
        let quotedArgs = [];
        if (message.includes('"')) {
            quotedArgs = message.match(/(?:"[^"]*"|^[^"]*$)/);
            if (quotedArgs && quotedArgs.length) {
                // Remove quoted stuff from the message
                quotedArgs = quotedArgs.map((a) => a.replace(/"/g, ''));
                message = message.replace(/"[^"]*"/g, '');
            }
        }
        let args = message
            .split(' ')
            .filter((a) => a && argsToRemove.indexOf(a) < 0)
            .filter((a) => !a.startsWith('<@!'));
        if (quotedArgs && quotedArgs.length) args = [...args, ...quotedArgs];
        return args;
    },

    loadCommands(commandsDirectory) {
        const commandDir = fs.readdirSync(commandsDirectory);
        commands = {};
        aliasses = {};
        allowedCommands = [];
        commandDir.forEach(function (file) {
            if (file.match(/\.js$/) !== null && file !== 'index.js') {
                const name = file.replace('.js', '');
                delete require.cache[require.resolve(commandsDirectory + file)];
                const module = require(commandsDirectory + file);
                commands[name] = {
                    main: null,
                    sub: {},
                };
                commands[name].main = module;
                allowedCommands.push(name);
                logger.info(`Loaded module ${name}`);
                if (commandDir.includes(name)) {
                    const childDir = fs.readdirSync(
                        commandsDirectory + name + '/'
                    );
                    childDir.forEach(function (sFile) {
                        if (
                            sFile.match(/\.js$/) !== null &&
                            file !== 'index.js'
                        ) {
                            const sName = sFile.replace('.js', '');
                            delete require.cache[
                                require.resolve(
                                    commandsDirectory + name + '/' + sFile
                                )
                            ];
                            const sModule = require(commandsDirectory +
                                name +
                                '/' +
                                sFile);
                            commands[name].sub[sName] = sModule;
                            allowedCommands.push(sName);
                            if (sModule.aliasses && sModule.aliasses.length) {
                                for (let al of sModule.aliasses) {
                                    commands[al] = {
                                        main: sModule,
                                        sub: {},
                                    };
                                    allowedCommands.push(al);
                                    aliasses[al] = al;
                                }
                            }
                            logger.info(`Loaded sub module ${name}|${sName}`);
                        }
                    });
                }

                if (module.aliasses) {
                    for (let i of module.aliasses) {
                        aliasses[i] = name;
                        allowedCommands.push(i);
                    }
                }
            }
        });
    },
};
