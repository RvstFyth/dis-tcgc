const fs = require('fs');

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(`${path}/${file}`).isDirectory();
    });
}

const _areasCache = {};

module.exports = {
    async init(path) {
        const directories = getDirectories(path);
        for (let d of directories) {
            _areasCache[d] = {
                locations: [],
                npcs: [],
                area: require(`.${path}/${d}/${d}.json`),
                name: d,
            };

            const z = 'locations';

            fs.readdirSync(`${path}/${d}/${z}`).forEach((file) => {
                const locationName = file.replace('.js', '');
                _areasCache[d][z][
                    locationName
                ] = require(`.${path}/${d}/${z}/${locationName}/${file}`);
                _areasCache[d][z][locationName].npcs = {};
                const npcFolder = `${path}/${d}/locations/${locationName}/npcs`;
                if (fs.existsSync(npcFolder)) {
                    const npcFiles = fs.readdirSync(npcFolder);
                    npcFiles.forEach((file) => {
                        if (
                            file.match(/\.js$/) !== null &&
                            file !== 'index.js'
                        ) {
                            const npcName = file.replace('.js', '');
                            _areasCache[d][z][locationName].npcs[
                                npcName
                            ] = require(`.${path}/${d}/locations/${locationName}/npcs/${file}`);
                        }
                    });
                }
            });
        }
    },

    getAreaLabels() {
        return Object.values(_areasCache).map((a) => a.area.label);
    },

    getAreaForLabel(label) {
        return Object.values(_areasCache).filter(
            (a) => a.area.label.toLowerCase() === label.toLowerCase()
        )[0];
    },

    async getAreaModules(area) {
        if (_areasCache[area]) return _areasCache[area];
        return null;
    },

    getAreas() {
        return _areasCache;
    },

    getLocationLabels(area) {
        return Object.values(_areasCache[area].locations).map((l) => l.label);
    },

    getLocation(area, location) {
        return _areasCache[area].locations[location];
    },

    getLocationNameForLabelAndArea(area, locationLabel) {
        const locations = _areasCache[area].locations;
        for (let i in locations) {
            if (
                locations[i].label.toLowerCase() === locationLabel.toLowerCase()
            )
                return i;
        }
        return false;
    },

    getNPCsForLocation(area, location) {
        return _areasCache[area][location].npcs;
    },

    getNpcLabelsForLocation(area, location) {
        return Object.values(_areasCache[area].locations[location].npcs).map(
            (n) => n.label
        )[0];
    },

    getNpcForLabel(area, location, label) {
        const npcs = _areasCache[area].locations[location].npcs;
        for (let i in npcs) {
            if (npcs[i].label.toLowerCase() === label.toLowerCase())
                return npcs[i];
        }

        return false;
    },
};
