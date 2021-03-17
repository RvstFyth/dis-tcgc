module.exports = {
    label: 'forest',
    description: '...',
    commands: {
        chop: {
            tree: {
                xp: 25,
                id: 1,
                level: 1,
                label: 'logs',
            },
            oak: {
                xp: 37,
                id: 64,
                level: 15,
                label: 'Oak logs',
            },
        },
    },
    mobs: {
        rat: {
            amount: 2,
            maxHit: 0,
            respawnTicks: 1,
            xp: 8,
            attackType: 'crush',
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
        giantspider: {
            amount: 6,
            respawnTicks: 10,
            xp: 8,
            attackType: 'stab',
            stats: {
                combat: {
                    hitpoints: 5,
                    attack: 1,
                    strength: 1,
                    defence: 1,
                    magic: 1,
                    ranged: 1,
                },
                aggressive: {
                    attack: -10,
                    strength: -10,
                    magic: 0,
                    magicDamage: 0,
                    ranged: 0,
                    rangedStrength: 0,
                },
                defence: {
                    stab: -10,
                    slash: -10,
                    crush: -10,
                    magic: -10,
                    ranged: -10,
                },
                immunities: { poison: false, venom: false },
            },
        },
    },
};
