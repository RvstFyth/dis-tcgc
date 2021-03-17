const valuesHelper = require('../helpers/values');
const areasHelper = require('../helpers/areas');
const characterHelper = require('../helpers/character');
const itemsModel = require('../models/items');

const worlds = [
    {
        id: 1,
        name: `World 1`,
        premium: false,
        players: {},
        objects: {},
        mobs: {},
    },
    {
        id: 2,
        name: `World 2`,
        premium: false,
        players: {},
        objects: {},
        mobs: {},
    },
    {
        id: 3,
        name: `World 3`,
        premium: false,
        players: {},
        objects: {},
        mobs: {},
    },
    {
        id: 4,
        name: `World 4`,
        premium: true,
        players: {},
        objects: {},
        mobs: {},
    },
    {
        id: 5,
        name: `World 5`,
        premium: true,
        players: {},
        objects: {},
        mobs: {},
    },
    {
        id: 6,
        name: `World 6`,
        premium: true,
        players: {},
        objects: {},
        mobs: {},
    },
];

const getWorldForId = (id) => {
    return worlds.filter((w) => w.id === id)[0];
};

module.exports = {
    async init() {
        // Spawn mobs in each world
        const areas = areasHelper.getAreas();
        for (let w of worlds) {
            for (let a in areas) {
                w.mobs[a] = {};
                w.objects[a] = {};
                for (let l in areas[a].locations) {
                    w.mobs[a][l] = {};
                    w.objects[a][l] = [];
                    if (
                        areas[a].locations[l].mobs &&
                        Object.keys(areas[a].locations[l].mobs).length
                    ) {
                        for (let m in areas[a].locations[l].mobs) {
                            w.mobs[a][l][m] = [];
                            for (
                                let i = 0;
                                i < areas[a].locations[l].mobs[m].amount;
                                i++
                            ) {
                                w.mobs[a][l][m].push({
                                    mob: characterHelper.composeNPC(
                                        m,
                                        areas[a].locations[l].mobs[m]
                                    ),
                                    occupied: false,
                                    respawnTicks: areas[a].locations[l].mobs[m]
                                        .respawnTicks
                                        ? areas[a].locations[l].mobs[m]
                                              .respawnTicks
                                        : 10,
                                    diedTimestamp: 0,
                                });
                            }
                        }
                    }
                    if (
                        areas[a].locations[l].itemSpawns &&
                        Object.keys(areas[a].locations[l].itemSpawns).length
                    ) {
                        for (let i in areas[a].locations[l].itemSpawns) {
                            const tmpItem = await itemsModel.get(i);
                            for (
                                let j = 0;
                                j < areas[a].locations[l].itemSpawns[i].amount;
                                j++
                            ) {
                                this.addObjectToWorld(w.id, tmpItem.name, a, l);
                            }
                        }
                    }
                }
            }
        }
        setInterval(() => {
            for (let w of worlds) {
                for (let p in w.players) {
                    if (w.players[p].ts + 60 < valuesHelper.currentTimestamp())
                        delete w.players[p];
                }
                for (let area in w.objects) {
                    for (let location in w.objects[area]) {
                        for (let ob in w.objects[area][location]) {
                            if (
                                w.objects[area][location][ob].expires <
                                valuesHelper.currentTimestamp()
                            ) {
                                delete w.objects[area][location][ob];
                            }
                        }
                        w.objects[area][location] = w.objects[area][
                            location
                        ].filter((o) => o);

                        // respawn new items
                        if (
                            parseInt(valuesHelper.currentTimestamp()) % 123 ===
                            0
                        ) {
                            const areaInfo = areasHelper.getLocation(
                                area,
                                location
                            );
                            if (
                                areaInfo &&
                                areaInfo.itemSpawns &&
                                Object.keys(areaInfo.itemSpawns).length
                            ) {
                                // count the number that is on the floor already
                                for (let i in areaInfo.itemSpawns) {
                                    const count = w.objects[area][
                                        location
                                    ].filter(
                                        (o) =>
                                            o.name ===
                                            areaInfo.itemSpawns[i].label
                                    ).length;
                                    if (count < areaInfo.itemSpawns[i].amount) {
                                        const diff =
                                            areaInfo.itemSpawns[i].amount -
                                            count;
                                        if (diff > 0) {
                                            for (let x = 0; x < diff; x++) {
                                                this.addObjectToWorld(
                                                    w.id,
                                                    areaInfo.itemSpawns[i]
                                                        .label,
                                                    area,
                                                    location
                                                );
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                // Respawn mobs
                for (let a in w.mobs) {
                    for (let l in w.mobs[a]) {
                        for (let m in w.mobs[a][l]) {
                            for (let mm in w.mobs[a][l][m]) {
                                if (
                                    w.mobs[a][l][m][mm].mob.health < 1 &&
                                    valuesHelper.currentTimestamp() >
                                        w.mobs[a][l][m][mm].diedTimestamp +
                                            w.mobs[a][l][m][mm].respawnTicks
                                ) {
                                    w.mobs[a][l][m][mm].mob.health =
                                        w.mobs[a][l][m][
                                            mm
                                        ].mob.skills.hitpoints.level;
                                }
                            }
                        }
                    }
                }
            }
        }, 1000);
    },

    getMobs(id, area, location) {
        const world = this.getWorldForId(id);
        return world.mobs[area][location];
    },

    addObjectToWorld(id, object, area, location, removeAfter) {
        if (!removeAfter) removeAfter = 5 * 60;

        const world = getWorldForId(id);

        if (!world.objects[area]) world.objects[area] = {};
        if (!world.objects[area][location]) world.objects[area][location] = [];

        world.objects[area][location].push({
            name: object,
            ts: valuesHelper.currentTimestamp(),
            expires: valuesHelper.currentTimestamp() + removeAfter,
        });
    },

    removeObjectFromWorld(id, name, area, location) {
        const world = getWorldForId(id);
        if (
            world.objects[area] &&
            world.objects[area][location] &&
            world.objects[area][location].length
        ) {
            const index = world.objects[area][location].findIndex(
                (e) => e.name === name
            );
            world.objects[area][location].splice(index, 1);
        }
    },

    getWorldForId(id) {
        return worlds.filter((w) => w.id === id)[0];
    },

    getWorlds() {
        return worlds;
    },

    getPlayersOnLocation(world, area, location) {
        const wData = getWorldForId(world);
        return Object.values(wData.players)
            .filter((p) => p.area === area && p.location === location)
            .map((p) => p.name);
    },

    getObjectsOnLocation(world, area, location) {
        const wData = getWorldForId(world);
        if (!wData.objects[area] || !wData.objects[area][location]) return [];
        return wData.objects[area][location];
    },

    registerPlayer(world, name, id, location, area) {
        getWorldForId(world).players[id] = {
            name: name,
            id: id,
            ts: valuesHelper.currentTimestamp(),
            area: area,
            location: location,
        };
    },
};
