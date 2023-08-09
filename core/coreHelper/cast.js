function castString(s) {
    if (s !== null && s !== undefined) {
        return String(s);
    }
    return "";
}

function castInt(s) {
    if (s !== null && s !== undefined) {
        return parseInt(s);
    }
    return 0;
}

function castFloat64(s) {
    if (s !== null && s !== undefined) {
        return parseFloat(s);
    }
    return 0;
}

function int32ToIntPointer(i) {
    const inValue = Number(i);
    return new Number(inValue);
}

function intToPointer(i) {
    return new Number(i);
}

module.exports = {
    castString,
    castInt,
    castFloat64,
    int32ToIntPointer,
    intToPointer
};
