module.exports = {
    label: 'Castle Cellar',
    description: `Dit is een faketekst. Alles wat hier staat is slechts om een indruk te geven van het grafische effect van tekst op deze plek. Wat u hier leest is een voorbeeldtekst. Deze wordt later vervangen door de uiteindelijke tekst, die nu nog niet bekend is. De faketekst is dus een tekst die eigenlijk nergens over gaat. Het grappige is, dat mensen deze toch vaak lezen. Zelfs als men weet dat het om een faketekst gaat, lezen ze toch door.`,
    itemSpawns: {
        62: {
            amount: 1,
            label: 'knife',
        },
        70: {
            amount: 1,
            label: 'bucket',
        },
    },
    mobs: {
        spider: {
            amount: 2,
            respawnTicks: 5,
            xp: 8,
            attackType: 'stab',
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
                    attack: -35,
                    strength: -58,
                    magic: 0,
                    magicDamage: 0,
                    ranged: 0,
                    rangedStrength: 0,
                },
                defence: {
                    stab: -53,
                    slash: -53,
                    crush: -53,
                    magic: -53,
                    ranged: -53,
                },
                immunities: { poison: false, venom: false },
            },
        },
    },
};
