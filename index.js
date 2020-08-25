module.exports = function(o1, o2) {
    return objectDiff(o1, o2, undefined, []);
};

function objectDiff(o1, o2, curPath, diffs) {
    if (typeof o1 !== typeof o2)
        return diffs.concat(curPath);

    if (typeof o1 !== 'object') {
        if (o1 !== o2) {
            diffs = diffs.concat(curPath);
        }

        return diffs;
    }

    var keys = unionKeys(o1, o2);

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var isArr = Array.isArray(o1);
        var path = curPath ? curPath + '.' + (isArr ? '[' : '') + key + (isArr ? ']' : '') : key;
        diffs = objectDiff(o1[key], o2[key], path, diffs);
    }

    return diffs;
};

function unionKeys(o1, o2) {
    var keys = getKeys(o1).concat(getKeys(o2));
    var o = keys.reduce(function(acc, cur) {
        acc[cur] = true;
        return acc;
    }, {});
    return Object.keys(o);
}

function getKeys(o) {
    return typeof o === 'undefined' || o === null ? [] : Object.keys(o);
}
