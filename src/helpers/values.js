module.exports = {
    nFormatter(num, digits) {
        var si = [
            { value: 1, symbol: '' },
            { value: 1e3, symbol: 'k' },
            { value: 1e6, symbol: 'M' },
            { value: 1e9, symbol: 'G' },
            { value: 1e12, symbol: 'T' },
            { value: 1e15, symbol: 'P' },
            { value: 1e18, symbol: 'E' },
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
                break;
            }
        }
        return (
            (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
        );
    },

    isValidColourString(str) {
        if (!str) return false;
        return str.match(/^#[a-f0-9]{6}$/i) !== null;
    },

    ucfirst(val) {
        return val.charAt(0).toUpperCase() + val.slice(1);
    },

    formattedDifferenceBetweenTimestamp(ts, cd, returnString = false) {
        const currentTimestamp = this.currentTimestamp();
        // get total seconds between the times
        let delta = Math.abs(ts + cd - currentTimestamp);
        let days = Math.floor(delta / 86400);
        delta -= days * 86400;
        let hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        let minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60; // Seconds
        let seconds = delta % 60; // in theory the modulus is not required

        const parsed = { days, hours, minutes, seconds };

        if (returnString) {
            let msgString = '';
            if (parsed.days) msgString += `${parsed.days}d `;
            if (parsed.hours) msgString += `${parsed.hours}h `;
            if (parsed.minutes) msgString += `${parsed.minutes}m `;
            msgString += `${parsed.seconds}s`;
            return msgString;
        }

        return parsed;
    },

    replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    },

    sumArray(arr) {
        if (!arr.length) return 0;
        return arr.reduce((sum, x) => sum + x);
    },

    uniqueArray(arr) {
        return [...new Set(arr)];
    },

    randomArrayValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    shuffleArray(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    formatXP(xp) {
        return xp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    currentTimestamp() {
        return (Date.now() / 1000) | 0;
    },

    timestampToDate(ts) {
        const u = new Date(ts * 1000);

        return (
            u.getUTCFullYear() +
            '-' +
            ('0' + u.getUTCMonth()).slice(-2) +
            '-' +
            ('0' + u.getUTCDate()).slice(-2) +
            ' ' +
            ('0' + u.getUTCHours()).slice(-2) +
            ':' +
            ('0' + u.getUTCMinutes()).slice(-2) +
            ':' +
            ('0' + u.getUTCSeconds()).slice(-2)
        );
    },
};
