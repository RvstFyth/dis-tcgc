const reminderModel = require('../models/reminders');
const Discord = require('discord.js');

module.exports = {
    async process(client) {
        const reminders = await reminderModel.getReminders();
        if (reminders && reminders.length) {
            for (let i in reminders) {
                const user = await client.users.fetch(reminders[i].discord_id);
                if (user) {
                    try {
                        const u = new Discord.User(client, user);
                        await user.send(reminders[i].message);
                        await reminderModel.delete(reminders[i].id);
                    } catch (e) {
                        console.log(
                            `Failed to send reminder to. Removing entry`
                        );
                        await reminderModel.delete(reminders[i].id);
                    }
                }
            }
        }
    },
};
