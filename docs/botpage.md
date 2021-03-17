# RuneCord
A OSRS experience in discord.  
**Note, this bot is still in development, to follow recent changes, or if you want to help somehow, feel free to join our support server**

## Getting started
In all example commands below `<argument>` means optional and  `[argument]` means required!  
  
Use `,start [name]` to create a account for RuneCord.  
You will start on tutorial island where NPC's will explain you the basic gameplay.   
Once done, or when you think you are ready, you can teleport to Lumbridge with the `,travel lumbridge courtyard` command. 
Skills can only be leveled till 3 on tutorial island. This limit is removed once you enter Lumbridge.

The world of RuneCord is divided in area's. You can see all area's listed with the `,areas` command. To travel to another 
area, use the `,travel [area]` command.  
Each area consists of several locations. For movement between locations, you can use the `, walk [location]` command.  
Use the `,area` command to see which locations there are in your current area.

#### Interacting with NPC's
By using the `,loc` command, you can find more info about your current location. Included is a list with NPC's (if there are any)
that are prefixed with a number. Simply use `,talk [name]` or `,talk [number]` to interact with them.   
### Selling or buying from a NPC
Some NPC's own a shop you can use to buy or sell items.  
`,shop [npc]` will display a list of items they sell.  
`,buy [npc] <amount> [item]` To buy a item.  
`,sell [npc] <amount> [item]` To sell a item to the selected NPC.
### Skills


## Combat
Combat is automated, and as in OSRS, the outcome depends on a few factors.  
Each weapon has a few combat style, you can check this with the `,styles`
command. This will output the styles you can select and the style that is active. Each combat style trains a different skill.
As this is the exact same as in OSRS, the OSRS wiki is a good source for more information about this.

## Worlds
As in OSRS, this bot works with worlds. Each world has own mob spawn queues, and resources that are dropped are also world-only.  
You can only interact with objects/players in your own world. To see a list of all worlds, you can use the `,worlds` command. If you want to 
switch to another world, just simple use `,eworld [id]`. 

**Note**: Some worlds requires a membership. See `,premium` for more information about this.