const objectDiff = require('./index');
const {assert} = require('chai');

describe('object diff', () => {
    it('different types', () => {
        const o1 = 1;
        const o2 = true;

        const diff = objectDiff(o1, o2);

        assert.deepEqual(diff, [
            undefined
        ]);
    });

    it('empty objects', () => {
        const o1 = {};
        const o2 = {};

        const diff = objectDiff(o1, o2);

        assert.deepEqual(diff, []);
    });

    it('empty objects', () => {
        const o1 = {};
        const o2 = {};

        const diff = objectDiff(o1, o2);

        assert.deepEqual(diff, []);
    });

    it('a single object entry is different', () => {
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
    });

    it('null vs undefined', () => {
        const o1 = {
            foo: null
        };
        const o2 = {
            foo: undefined
        };

        const diff = objectDiff(o1, o2);

        assert.deepEqual(diff, [
            'foo'
        ]);
    });

    it('entries are missing/different from each objects', () => {
        const o1 = {
            a: {
                b: {
                    fn: () => 4,
                    arr: [1,2,3],
                    c: {
                        s: 't',
                        y: 'g'
                    },
                }
            }
        };
        const o2 = {...o1, a: {...o1.a, b: { ...o1.a.b, fn: () => 4, arr: [1,2,3,4,5], c: {s: 'e', t: 'e'}}}};

        const diff = objectDiff(o1, o2);

        assert.deepEqual(diff, [
            'a.b.fn',
            'a.b.arr.[3]',
            'a.b.arr.[4]',
            'a.b.c.s',
            'a.b.c.y',
            'a.b.c.t'
        ]);
    });

    it('nested arrays', () => {
        const o1 = {
            a: {
                arr: [1,[{one: 1, two: 1}], {
                    foo: 'bar'
                }, 4]
            }
        };
        const o2 = {...o1, a: {...o1.a, arr: [1, [{one: 2, two: 2}], {
            foo: 'bar'
        }, 4]}};

        const diff = objectDiff(o1, o2);

        assert.deepEqual(diff, [
            'a.arr.[1].[0].one',
            'a.arr.[1].[0].two',
        ]);
    });
});
