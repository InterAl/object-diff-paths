# object-diff-paths
Calculates a diff of 2 objects, and returns a list of the different object
paths.

The object paths can then be used in lodash.get/lodash.set.

# Installation
```shell
$ npm i object-diff-paths
```

# Usage
```javascript
const o1 = {
    a: {
        b: {
            c: { s: 't' },
        }
    }
};
const o2 = {...o1, a: {...o1.a, b: {...o1.a.b, d: 'e'}}};

const diff = objectDiff(o1, o2);

assert.deepEqual(diff, [
    'a.b.d'
]);
```
