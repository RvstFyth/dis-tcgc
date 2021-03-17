module.exports = {
    label: `Courtyard`,
    description: `Dit is een faketekst. Alles wat hier staat is slechts om een indruk te geven van het grafische effect van tekst op deze plek. Wat u hier leest is een voorbeeldtekst. Deze wordt later vervangen door de uiteindelijke tekst, die nu nog niet bekend is. De faketekst is dus een tekst die eigenlijk nergens over gaat. Het grappige is, dat mensen deze toch vaak lezen. Zelfs als men weet dat het om een faketekst gaat, lezen ze toch door.`,
    mobs: {
        rat: {
            amount: 3,
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
        woman: {
            amount: 3,
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
