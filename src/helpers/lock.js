const lockedUsers = {};
const lockMessages = {};

module.exports = {
    lock(id, msg = '') {
        lockedUsers[id] = true;
        lockMessages[id] = msg;
    },

    hasLock(id) {
        return lockedUsers[id] ? lockedUsers[id] : false;
    },

    getMessage(id) {
        if (lockMessages[id]) return lockMessages[id];
        return 'please end your previous command first...';
    },

    unlock(id) {
        lockedUsers[id] = false;
        delete lockMessages[id];
    },
};
