var test    = require('tape'),
    q       = require('../');

test('ctor', function(assert) {

    var v = q();
    assert.ok(v.num === 0);
    assert.ok(v.den === 1);

    v = q(5);
    assert.ok(v.num === 5);
    assert.ok(v.den === 1);

    v = q(2, 3);
    assert.ok(v.num === 2);
    assert.ok(v.den === 3);

    v = q(9, 3, 4);
    assert.ok(v.num === 39);
    assert.ok(v.den === 4);

    assert.end();

});

test('eq', function(assert) {

    var v1 = q(6, 8),
        v2 = q(3, 4);

    assert.ok(q.eq(v1, v2));
    assert.end();

});

test('lt', function(assert) {

    var v1 = q(1, 4),
        v2 = q(3, 4);

    assert.ok(q.lt(v1, v2));
    assert.notOk(q.ge(v1, v2));
    assert.end();

});

test('le', function(assert) {

    var v1 = q(1, 4),
        v2 = q(1, 4);

    assert.ok(q.le(v1, v2));
    assert.notOk(q.gt(v1, v2));
    assert.end();

});

test('gt', function(assert) {

    var v1 = q(3, 4),
        v2 = q(1, 4);

    assert.ok(q.gt(v1, v2));
    assert.notOk(q.le(v1, v2));
    assert.end();

});

test('ge', function(assert) {

    var v1 = q(1, 4),
        v2 = q(1, 4);

    assert.ok(q.ge(v1, v2));
    assert.notOk(q.lt(v1, v2));
    assert.end();

});

test('neq', function(assert) {

    var v1 = q(6, 8),
        v2 = q(3, 12);

    assert.notOk(q.eq(v1, v2));
    assert.end();

});

test('add', function(assert) {

    var v1 = q(1, 4),
        v2 = q(3, 8);

    q.add(v1, v2, v1);
    assert.ok(v1.num === 20);
    assert.ok(v1.den === 32);
    assert.end();

});

test('sub', function(assert) {

    var v1 = q(10, 12),
        v2 = q(5, 60);

    q.sub(v1, v2, v1);
    assert.ok(v1.num === 540);
    assert.ok(v1.den === 720);
    assert.end();

});

test('mul', function(assert) {

    var v1 = q(3, 10),
        v2 = q(8, 12);

    q.mul(v1, v2, v1);
    assert.ok(v1.num === 24);
    assert.ok(v1.den === 120);
    assert.end();

});

test('div-1', function(assert) {

    var v1 = q(10, 15),
        v2 = q(3, 4);

    q.div(v1, v2, v1);
    assert.ok(v1.num === 40);
    assert.ok(v1.den === 45);
    assert.end();

});

test('div-2', function(assert) {

    var v1 = q(10, 15),
        v2 = q(3, 4);

    q.div(v1, v2, v2);
    assert.ok(v2.num === 40);
    assert.ok(v2.den === 45);
    assert.end();

});

test('clone', function(assert) {

    var v1 = q(22, 33);

    q.clone(v1);
    assert.ok(v1.num === 22);
    assert.ok(v1.den === 33);
    assert.end();

});

test('simplify', function(assert) {

    var v = q(9, 12);
    q.simplify(v);

    assert.ok(v.num === 3);
    assert.ok(v.den === 4);
    assert.end();

});

test('toString', function(assert) {

    var v = q(100, 122);
    assert.equal(q.toString(v), '100/122');
    assert.end();

});

test('toFloat', function(assert) {

    var v = q(3, 4);
    assert.equal(q.toFloat(v), 3/4);
    assert.end();

});

test('object methods', function(assert) {

    function t(op, a, b, c, d) {

        var v1 = q(a, b),
            v2 = q(c, d);

        q[op](v1, v2, v1);
        q.simplify(v1);

        var r1 = v1;

        var v3 = q(a, b),
            v4 = q(c, d);

        var r2 = v3[op](v4);

        assert.ok(r1.num === r2.num);
        assert.ok(r1.den === r2.den);

    }

    t('add',    1, 2, 6, 7);
    t('sub',    10, 12, 1, 4);
    t('mul',    5, 7, 6, 1);
    t('div',    2, 3, 1, 78);

    assert.end();

});