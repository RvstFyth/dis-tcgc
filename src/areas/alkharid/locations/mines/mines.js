module.exports = {
    label: 'Al Kharid mines',
    description: '...\n...',
    mobs: {
        scorpion: {
            amount: 9,
            maxHit: 2,
            respawnTicks: 60,
            xp: 8,
            attackType: 'stab',
            stats: {
                combat: {
                    hitpoints: 17,
                    attack: 11,
                    strength: 12,
                    defence: 11,
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
                    stab: 5,
                    slash: 15,
                    crush: 15,
                    magic: 0,
                    ranged: 5,
                },
                immunities: { poison: false, venom: false },
            },
        },
    },
    commands: {
        mine: {
            copper: {
                xp: 17,
                id: 3,
                label: 'copper ore',
                level: 1,
            },
            tin: {
                xp: 17,
                id: 4,
                label: 'tin ore',
                level: 1,
            },
            silver: {
                xp: 40,
                id: 13,
                label: 'silver ore',
                level: 20,
            },
            mithril: {
                xp: 80,
                id: 24,
                label: 'mithril ore',
                level: 55,
            },
            adamantite: {
                xp: 95,
                id: 28,
                label: 'adamantite ore',
                level: 70,
            },
            gold: {
                xp: 65,
                id: 21,
                label: 'gold ore',
                level: 40,
            },
            coal: {
                xp: 50,
                id: 16,
                label: 'coal',
                level: 30,
            },
            iron: {
                xp: 35,
                id: 10,
                label: 'iron ore',
                level: 15,
            },
        },
    },
};
