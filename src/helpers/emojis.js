const _cache = {};

const _emojis = {
    heart: '810245315860496415',
    gold: '807562416854401094',
    rccoin: '807599790359183390',
    attack: '810814025029386240',
    strength: '810814025234382869',
    defence: '810814025105145866',
    ranged: '810814025116942357',
    prayer: '810814024971190356',
    magic: '810814025361260564',
    runecraft: '810814025411067944',
    hitpoints: '810814025272655882',
    crafting: '810814024785985537',
    mining: '810814025364668416',
    smithing: '810814025029255209',
    fishing: '810814024958345217',
    cooking: '810814024869740556',
    firemaking: '810814025335308299',
    woodcutting: '810814025306472469',
    agility: '810814024907882517',
    herblore: '810814025008807977',
    thieving: '810814025445146624',
    fletching: '810814025243557889',
    slayer: '810814025357197343',
    farming: '810814025118121994',
    construction: '810814025193226251',
    hunter: '810814025251815455',
};

module.exports = {
    async init(client) {
        // msg.client.emojis.cache.get('807599790359183390');
        for (let i in _emojis) {
            _cache[i] = client.emojis.cache.get(_emojis[i]);
        }
    },

    async get(client, name) {
        if (!Object.keys(_cache).length) {
            await this.init(client);
        }

        return _cache[name];
    },
};
