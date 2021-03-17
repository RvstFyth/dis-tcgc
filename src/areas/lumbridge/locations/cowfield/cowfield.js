module.exports = {
    label: 'Cow field',
    description: '.....\n\n....',

    mobs: {
        cow: {
            amount: 10,
            respawnTicks: 4,
            xp: 8,
            attackType: 'crush',
            stats: {
                combat: {
                    hitpoints: 8,
                    attack: 1,
                    strength: 1,
                    defence: 1,
                    magic: 1,
                    ranged: 1,
                },
                aggressive: {
                    attack: -15,
                    strength: -15,
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
                immunities: { poison: true, venom: true },
            },
            loot: {
                53: {
                    min: 1,
                    max: 1,
                    chance: 100,
                },
                56: {
                    min: 1,
                    max: 1,
                    chance: 100,
                },
                57: {
                    min: 1,
                    max: 1,
                    chance: 100,
                },
            },
        },
    },
};
