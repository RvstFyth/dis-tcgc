module.exports = {
    label: `Forest`,
    description:
        `` +
        `In this location you will learn the basics of survival and combat. The resources field below, lists which resources you can get on this location.` +
        ``,
    // commands: ['chop']
    commands: {
        // chop: ['tree']
        chop: {
            tree: {
                xp: 25,
                id: 1,
                level: 1,
                label: 'logs',
            },
        },
        fish: {
            net: {
                shrimps: {
                    xp: 10,
                    id: 33,
                    level: 1,
                    label: 'raw shrimps',
                },
            },
        },
    },
    mobs: {
        rat: {
            xp: 8,
            attackType: 'crush',
            respawnTicks: 1,
            amount: 5,
            maxHit: 0,
            stats: {
                combat: {
                    hitpoints: 2,
                    attack: 1,
                    strength: 1,
                    defence: 1,
                    magic: 1,
                    ranged: 1,
                },
                aggressive: {
                    attack: -47,
                    strength: -53,
                    magic: 0,
                    magicDamage: 0,
                    ranged: 0,
                    rangedStrength: 0,
                },
                defence: {
                    stab: -42,
                    slash: -42,
                    crush: -42,
                    magic: -42,
                    ranged: -42,
                },
                immunities: { poison: false, venom: false },
            },
            loot: {
                53: {
                    min: 1,
                    max: 1,
                    chance: 100,
                },
            },
        },
    },
};
