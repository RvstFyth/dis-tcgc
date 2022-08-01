# Pokemon Trading Card Game Bot

A Pokemon trading card game collecting and trading experience on Discord.

**Note, this bot is still in development, to follow recent changes, or if you want to help somehow, feel free to join our support server.**

## Getting started

All commands in the examples below, [argument] means required!

To get started on your Pokemon trading card collection you need to create an account first. 
Do this by typing the following command: `,start`

You should see a message in the chat saying: [name] account created! See `,help` to get started!  
That all you need to do to get started.

## How to collect cards

Pokemon cards can be obtained in a couple of ways. In this section we’ll go over each way you can obtain pokemon cards.

**Bonusses**   
The easiest way to collect cards is to claim your bonusses. There are two bonusses you can collect as of right now. An hourly bonus and a daily bonus. You claim each bonus by using the following commands: 

`,hourly` (Use this to claim your hourly bonus)  
`,daily`   (Use this to claim your daily bonus)

The hourly bonus consists of two randomly selected cards as well as some coins, usually between 10 – 30. (There’s a section up ahead explaining what you can do with coins.)

The daily bonus consists of ten randomly selected cards as well as some coins, usually between 250 - 500 (There’s a section up ahead explaining what you can do with coins.)

**Chatting**  
Yes, you read that right, chatting. It’s one of the easiest ways to collect cards to expand your collection. By being active in the server you’re playing this game on, you will be given random cards as well as some coins by the bot. 

The more active you are in chat channels, the more cards you’ll earn. Best of all, you don’t have to type any commands for them. The bot will keep track of the chat rewards in the background. 

**Booster Packs**  
We’ve also included the ability to be able to purchase any booster pack that has ever been released in the Pokemon Trading Card Game history.

Each card pack costs 250 coins.
Each card pack contains 10 cards each.
Each card pack contains 1 rare 3 uncommon and 6 common cards.

Cards packs can be obtained by buying them in the shop. You buy them with the aformentioned coins which you can obtain in various ways.

To open the shop use the follwing command: `,shop`.  
This will display a message showing the commands you need to use to buy card packs as well as your total amount of coins.

Here’s a quick explanation of what each command does.

`,shop buy [setname]`   - Use this command to buy a card pack.  
`,sets`                            - Use this command to see a list of all card sets avaiable.  
`,boosters`                     - Use this command to see the boosters packs you currently own.  
`,boosters open [setname]`  - Use this command to open a booster pack. 


## How to trade cards

As the name implies Pokemon Trading cards can be traded between players. 
You can start a trade request by using the following command: `,trade [@name]`

A new message will appear with a green checkmark reaction. Both players will have to click on the green checkmark reaction to initiate the trade.

Now both players will be able to add cards from their collection to the trade request by typing the following command: `add card [card number]`       (Don’t use the , prefix)

You can add as many cards as you like to the trade. 

After both players have added the cards they’d like to the trade request, you both need to confirm the trade. To do this type the following command:  `confirm`   (Don’t use the , prefix)

Both players now have to press the green checkmark that appeared underneath the trading message. This is the final step to complete the trading process.

Congratulations! You’ve now succesfully traded your pokemon cards!

## Sorting out your collection

There’s quite a few commands to see what you’ve collected so far and what you still have to collect to complete your very own Pokemon Trading Cards collection.

We’ll go over all of the commands one by one.

`,cards [page number]`
This command will show you the list of all the cards you’ve collected so far. Use numbers 2,3,4, etc to go to the corresponding page number. (Cards are sorted in numerical order)

`,card [card number]`
This command will show you a specific card including a picture of it. This command will also show you how many copies of it you currently own.

`,cards -d`
This command will show you which cards you have multiple copies of. (The list shows how many copies of a card you own, not how many duplicates you have.)

`,set [name]`
This command shows all the cards available in a set as well as how many cards you currently own of a certain set.

`,set [name] -m`
This command shows a list of all the cards you still need to collect from a certain set.

`,set [name] -o`
This command shows a list of all the cards you currently own from a certain set.

`,search [argument]`
This command allows you to look up cards based on their name. Type the name of your favourite pokemon in the command and see which set you need to buy to attain the pokemon of your dreams. (Use the numbers 2,3,4, etc. to see the corresponding page list.)


That’s everything there is to learn about this bot (for now). Go out there and have fun collecting the pokemon team of your dreams.
