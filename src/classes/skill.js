const skillsModel = require('../models/usersSkills');
const skillsHelper = require('../helpers/skills');

class Skill {
    constructor(id, name, xp) {
        this.id = id;
        this.name = name;
        this.xp = parseInt(xp);
        this.level = skillsHelper.levelForXp(this.xp);
        this.nextLevel = skillsHelper.xpForLevel(this.level + 1);
        this.remainder = this.nextLevel - this.xp;
    }

    async addXp(amount, maxLevel = false) {
        if (maxLevel) {
            const maxXp = skillsHelper.xpForLevel(3);
            if (this.xp + amount > maxXp) {
                let diff = maxXp - this.xp;
                if (diff < 0) diff = 0;
                amount = diff;
            }
        }
        if (amount > 0) {
            this.xp += parseInt(amount);
            await skillsModel.addXp(this.id, amount);
        }
        return amount;
    }
}

module.exports = Skill;
