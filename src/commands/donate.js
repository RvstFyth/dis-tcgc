module.exports = {
    async run(msg, args, data) {
        const embed = {
            description:
                `You can support the development of this bot with [Donatebot.io](https://donatebot.io/checkout/823144389714378752) which uses paypal or creditcard. \n` +
                `Besides getting a fancy role on our support server, you will also get 250 coins for each USD donated\n` +
                `You can use coins for buying booster packs in the \`,shop\`.\n\n` +
                `**Donate with crypto**:\n` +
                `After sending a transaction, ask a staff member on our support server to verify and grant rewards. If you want to donate with another coin, contact a developer on our support server.\n\n` +
                `BTC: \`1PTsd6AB1kRbstvbAfHBLjXQp2jGAmx6xt\`\n` +
                `ETH: \`0xb6bed45F7edd50D4aDCFD8839fdA57C41AC2b3Cb\`\n` +
                `UBQ: \`0xdcFd4CBA0A1580F3D76741e4c9449f170adb60cE\`\n`,
        };

        return msg.channel.send({ embed });
    },
};
