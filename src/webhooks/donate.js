const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const usersModel = require('../models/users');

app.post('/webhooks', async function (request, response) {
    response.sendStatus(200);
    const authenticationToken = 'cookiesisdabestdevever';
    if (request.headers.authorization === authenticationToken) {
        const webhook = request.body;
        console.log(
            `Donatebot.io webhook triggered | Status: ${webhook.status}`
        );
        if (webhook.status.toLowerCase() === 'completed') {
            console.log(webhook);
            const discordID = webhook.buyer_id;
            const coins = parseInt(webhook.price) * 150;
            let user = await usersModel.getForDiscordID(discordID);
            if (!user) user = '377092395931795458';
            if (user) {
                console.log(
                    `Received a ${webhook.price} USD dollar donation from ${discordID}`
                );
                await usersModel.addCoins(discordID, coins);
            } else
                console.log(
                    `Donatebot.io webhook, failed to find user with ID: ${discordID}`
                );
        }
    }
});

app.listen(5021, function () {
    console.log('donatebot.io webhook running at 5021');
});
