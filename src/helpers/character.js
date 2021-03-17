const skillsModel = require('../models/usersSkills');
const skillsHelper = require('../helpers/skills');

const Character = require('../classes/character');
const Skill = require('../classes/skill');

module.exports = {
    async composeFromUserRecord(record) {
        const char = new Character(record.id, record.name);
        await char.setArea(record.area);
        await char.setLocation(record.location);
        char.setGold(record.gold);
        char.setRcCoins(record.rccoins);
        char.setWorld(record.world);
        char.setStyle('melee', record.melee_style);
        char.setStyle('ranged', record.ranged_style);
        char.setStyle('magic', record.magic_style);
        char.setHealth(record.health);

        if (record.supporter) char.setSupporter();

        const skillRecords = await skillsModel.getAllFor(record.id);
        for (let i in skillRecords) {
            char.setSkill(
                new Skill(
                    skillRecords[i].id,
                    skillRecords[i].skill,
                    skillRecords[i].xp
                )
            );
        }
        return char;
    },

    composeNPC(name, mobDefinition) {
        const mob = new Character(-1, name);
        mob.setHealth(mobDefinition.stats.combat.hitpoints);
        mob.npc = true;
        mob.attackType = mobDefinition.attackType;
        if (typeof mobDefinition.maxHit !== 'undefined') {
            mob.npc_maxHit = parseInt(mobDefinition.maxHit);
        }

        for (let i in mobDefinition.stats.combat) {
            mob.setSkill(
                new Skill(
                    -1,
                    i,
                    skillsHelper.xpForLevel(mobDefinition.stats.combat[i])
                )
            );
        }
        for (let i in mobDefinition.stats.defence) {
            mob.equippedBonus.defence[i] = mobDefinition.stats.defence[i];
        }
        return mob;
    },
};
