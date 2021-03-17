const winston = require('winston');

module.exports = {
    winstonInstance: null,

    init() {
        winston.remove(winston.transports.Console);
        winston.add(new winston.transports.Console(), {
            colorize: true,
        });
        winston.level = 'debug';
    },

    info(msg) {
        winston.info(msg);
    },
};
