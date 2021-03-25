const usersCardsPokemonModel = require('../models/usersCardsPokemon');
const cardsPokemonModel = require('../models/cardsPokemon');

module.exports = {

    async run(msg, args, data)
    {

        const duplicates = args.filter(a => ['-duplicates', '-d'].indexOf(a) > -1).length;
        args = args.filter(a => !a.startsWith('-'));

        let page = 1;
        if(!isNaN(args[0])) page = parseInt(args[0]);
        else {
            // Check if argument is a valid set name, if so, we can filter on it :)
        }

        const totalCards = await cardsPokemonModel.getTotalRecords();
        const totalUserCards = await usersCardsPokemonModel.getRecordsCountForUser(msg.author.id);
        const limit = 15;
        let maxPage = Math.ceil(totalUserCards / limit);
        if (page > maxPage) page = maxPage;
        let offset = page * limit - limit;

        if(offset < 0) offset = 0;

        let cards;
        if(duplicates) cards = await usersCardsPokemonModel.getDuplicatesForUserPaginated(msg.author.id, offset, limit);
        else cards = await usersCardsPokemonModel.getForUserPaginated(msg.author.id, offset, limit);

        let description = '';
        for(let i in cards) {
            description += `#${cards[i].id} - ${cards[i].name} (${cards[i].set}) (${cards[i].amount}x)\n`;
        }
        maxPage = Math.ceil(cards.length / limit);
        if(!description) description = duplicates ? 'You don\'t have any duplicates..' : 'You have not collected any cards yet..';


        let footerText;
        if (duplicates) footerText = `Page ${page}/${maxPage} | You have ${cards.length} duplicate cards.`;
        else footerText = `Page ${page}/${maxPage} | You collected ${totalUserCards}/${totalCards}`;
        const embed = {
            title: `${msg.author.username}'s collection`,
            description,
            fields: [{
                name: `\u200b`,
                value: `\`${data.prefix}cards [pageNo]\` to switch page\n\`${data.prefix}cards [setName]\` to query cards of a specific set`,
            }],
            footer: {
                text: footerText
            }
        };

        return msg.channel.send({embed});
    }
};