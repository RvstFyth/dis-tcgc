module.exports = {
    label: 'General goods store',
    description:
        `` +
        `\`shop [no]\` to open the shop interface for a NPC. Replace [no] with the NPC number.\n\n` +
        `\`buy [no] <amount> [item]\` to buy a item, replace [item] with the NPC number, <amount> with the amount you like to buy and [item] with the item name or the item number in the shop\n\n` +
        `\`sell [no] <amount> [item]\``,
    mobs: {
        woman: {
            amount: 1,
            respawnTicks: 10,
            xp: 8,
            attackType: 'crush',
            stats: {
                combat: {
                    hitpoints: 7,
                    attack: 1,
                    strength: 1,
                    defence: 1,
                    magic: 1,
                    ranged: 1,
                },
                aggressive: {
                    attack: 0,
                    strength: 0,
                    magic: 0,
                    magicDamage: 0,
                    ranged: 0,
                    rangedStrength: 0,
                },
                defence: {
                    stab: -21,
                    slash: -21,
                    crush: -21,
                    magic: -21,
                    ranged: -21,
                },
                immunities: { poison: false, venom: false },
            },
            loot: {
                gold: {
                    min: 3,
                    max: 25,
                },
                53: {
                    min: 1,
                    max: 1,
                    chance: 100,
                },
                69: {
                    min: 1,
                    max: 1,
                    chance: 1,
                },
                42: {
                    min: 1,
                    max: 1,
                    chance: 2,
                },
            },
        },
    },
};
