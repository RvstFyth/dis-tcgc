module.exports = {
    label: `Fishing spot`,
    description:
        `` +
        `In this location you will learn the basics of survival and combat. The resources field below, lists which resources you can get on this location.` +
        ``,
    // commands: ['chop']
    commands: {
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
};
