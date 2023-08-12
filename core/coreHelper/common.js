import { createHmac } from 'crypto';

function contains(s, e) {
    return s.includes(e);
}

function mapContains(m, e) {
    return m.hasOwnProperty(e);
}

function containsInt(s, e) {
    return s.includes(e);
}

function stringToInt(s) {
    const v = parseInt(s);
    if (isNaN(v)) {
        throw new Error("Invalid number");
    }
    return v;
}

function stringToFloat(s, r) {
    const v = parseFloat(s);
    if (isNaN(v)) {
        throw new Error("Invalid number");
    }
    return v;
}

function stringPointerToFloatPointer(s, r) {
    const v = parseFloat(s);
    if (isNaN(v)) {
        throw new Error("Invalid number");
    }
    return v;
}

function stringToIntAuto(s) {
    const v = parseInt(s);
    if (isNaN(v)) {
        return 0;
    }
    return v;
}

function isInt(s) {
    return !isNaN(parseInt(s));
}

function stringToTime(str, location) {
    if (!location) {
        location = "UTC";
    }
    const timezone = new Date().toLocaleString("en-US", { timeZone: location });
    const t = new Date(str);
    if (isNaN(t)) {
        throw new Error("Invalid time format");
    }
    return t;
}

function envMandatory(s, l) {
    const envValue = process.env[s] || "";
    if (envValue.length < l) {
        throw new Error(`ENV Mandatory check: ${s} should have min length ${l}`);
    }
    return envValue;
}

function intToString(s) {
    return s.toString();
}

function getISOWeek(t) {
    const year = t.getUTCFullYear();
    const week = new Date(Date.UTC(year, t.getUTCMonth(), t.getUTCDate())).getWeek();
    if (week < 10) {
        return `${year}-0${week}`;
    }
    return `${year}-${week}`;
}

function stringToBool(s) {
    const v = s.toLowerCase();
    if (v === "true") return true;
    if (v === "false") return false;
    throw new Error("Invalid boolean value");
}

function structToJSON(s) {
    try {
        return JSON.stringify(s);
    } catch (err) {
        return "";
    }
}

function structToMap(s) {
    try {
        return JSON.parse(JSON.stringify(s));
    } catch (err) {
        throw err;
    }
}

function signCookie(secret, cookie) {
    const hmac = createHmac('sha512', secret);
    hmac.update(cookie);
    const cb64 = hmac.digest('base64').replace(/=/g, "");
    if (cb64.length < 20) {
        throw new Error("Unable to sign cookie: cb64 < 20");
    }
    return `${cookie}.${cb64}`;
}

function unsignCookie(secret, encryptedCookie) {
    const cook = encryptedCookie.split(".");
    if (cook.length !== 2) {
        return [false, "invalid_cookie"];
    }
    const token = cook[0];
    const hash = cook[1];
    const hmac = createHmac('sha512', secret);
    hmac.update(token);
    const expectedHash = hmac.digest('base64').replace(/=/g, "");
    if (hash === expectedHash) {
        return [true, token];
    } else {
        return [false, ""];
    }
}

function getHostName(s) {
    const res = s.includes(":");
    if (res) {
        return s.split(":")[0];
    } else {
        return s;
    }
}

function checkIfFieldExists(iFace, fieldName) {
    if (!iFace || !fieldName) {
        throw new Error("Invalid arguments");
    }
    const valueIface = JSON.stringify(iFace);
    if (!valueIface) {
        throw new Error("Unable to marshal src");
    }
    const field = valueIface[fieldName];
    return field !== undefined && field !== null;
}

function getField(v, field) {
    const ma = structToMap(v);
    if (ma.hasOwnProperty(field)) {
        return ma[field];
    } else {
        return null;
    }
}

function toBytes(p) {
    const buf = Buffer.alloc(0);
    const enc = Buffer.alloc(0);
    enc.write(p);
    return enc;
}

function boolToPointer(b) {
    return b ? true : false;
}

function stringToPointer(b) {
    return b;
}

function timeToPointer(b) {
    return new Date(b);
}

function float32ToPointer(b) {
    return b;
}

function float64ToPointer(b) {
    return b;
}

function deepCopy(dst, src) {
    if (!dst) {
        throw new Error("dst cannot be null");
    }
    if (!src) {
        throw new Error("src cannot be null");
    }
    try {
        return JSON.parse(JSON.stringify(src));
    } catch (err) {
        throw new Error(`Unable to unmarshal into dst: ${err}`);
    }
}

function sortCompare(a, b) {
    a.sort();
    b.sort();
    return JSON.stringify(a) === JSON.stringify(b);
}

function randNo(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function round(num) {
    return Math.round(num);
}

function toFixed(num, precision) {
    return Number(num.toFixed(precision));
}

function floatToString(num) {
    if (num === null || num === undefined) {
        return null;
    }
    return num.toFixed(2);
}

function isValidXml(s) {
    try {
        const parser = new DOMParser();
        parser.parseFromString(s, "application/xml");
        return true;
    } catch (err) {
        return false;
    }
}

function isValidJson(s) {
    try {
        JSON.parse(s);
        return true;
    } catch (err) {
        return false;
    }
}

function isBetweenNotMax(val, min, max) {
    return val < max && val >= min;
}

function isBetweenNotMin(val, min, max) {
    return val <= max && val > min;
}

function isUserReferralCode(referralCode) {
    return isInt(referralCode);
}

export default {
    contains,
    mapContains,
    containsInt,
    stringToInt,
    stringToFloat,
    stringPointerToFloatPointer,
    stringToIntAuto,
    isInt,
    stringToTime,
    envMandatory,
    intToString,
    getISOWeek,
    stringToBool,
    structToJSON,
    structToMap,
    signCookie,
    unsignCookie,
    getHostName,
    checkIfFieldExists,
    getField,
    toBytes,
    boolToPointer,
    stringToPointer,
    timeToPointer,
    float32ToPointer,
    float64ToPointer,
    deepCopy,
    sortCompare,
    randNo,
    round,
    toFixed,
    floatToString,
    isValidXml,
    isValidJson,
    isBetweenNotMax,
    isBetweenNotMin,
    isUserReferralCode
};
