module.exports      = quotient;

quotient.cmp        = cmp;
quotient.eq         = eq;
quotient.lt         = lt;
quotient.le         = le;
quotient.gt         = gt;
quotient.ge         = ge;
quotient.add        = add;
quotient.sub        = sub;
quotient.mul        = mul;
quotient.div        = div;
quotient.clone      = clone;
quotient.simplify   = simplify;
quotient.toString   = toString;
quotient.toFloat    = toFloat;

function quotient(a, b, c) {
    switch (arguments.length) {
        case 0:     return new Fraction(0, 1);
        case 1:     return new Fraction(a, 1);
        case 2:     return new Fraction(a, b);
        case 3:     return new Fraction((a * c) + b, c);
        default:    throw new Error("fraction constructor accepts 0-3 arguments");
    }
}

function gcd(a, b) {
    if (b == 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}

function cast(v) {
    return (typeof v === 'number')
            ? new Fraction(v, 1)
            : v;
}

//
// object interface

function Fraction(numerator, denominator) {
    this.num = numerator;
    this.den = denominator; 
}

Function.prototype.cmp = function(r) { return cmp(this, cast(r)); }
Function.prototype.eq  = function(r) { return eq(this,  cast(r)); }
Function.prototype.lt  = function(r) { return lt(this,  cast(r)); }
Function.prototype.le  = function(r) { return le(this,  cast(r)); }
Function.prototype.gt  = function(r) { return gt(this,  cast(r)); }
Function.prototype.ge  = function(r) { return ge(this,  cast(r)); }

Fraction.prototype.add = function(r) {
    r = cast(r);
    var out = new Fraction(0, 1);
    add(this, r, out);
    simplify(out);
    return out;
}

Fraction.prototype.sub = function(r) {
    r = cast(r);
    var out = new Fraction(0, 1);
    sub(this, r, out);
    simplify(out);
    return out;
}

Fraction.prototype.mul = function(r) {
    r = cast(r);
    var out = new Fraction(0, 1);
    mul(this, r, out);
    simplify(out);
    return out;
}

Fraction.prototype.div = function(r) {
    r = cast(r);
    var out = new Fraction(0, 1);
    div(this, r, out);
    simplify(out);
    return out;
}

Fraction.prototype.clone = function() {
    return new Fraction(this.num, this.den);
}

Fraction.prototype.toString = function() {
    return toString(this);
}

Fraction.prototype.valueOf = function() {
    return toFloat(this);
}

//
// functions

function cmp(l, r) {
    return (l.num * r.den) - (r.num * l.den);
}

function eq(l, r) {
    return cmp(l, r) === 0;
}

function lt(l, r) {
    return cmp(l, r) < 0;
}

function le(l, r) {
    return cmp(l, r) <= 0;
}

function gt(l, r) {
    return cmp(l, r) > 0;
}

function ge(l, r) {
    return cmp(l, r) >= 0;
}

function add(l, r, out) {
    out.num = (l.num * r.den) + (r.num * l.den);
    out.den = l.den * r.den;
}

function sub(l, r, out) {
    out.num = (l.num * r.den) - (r.num * l.den);
    out.den = l.den * r.den;   
}

function mul(l, r, out) {
    out.num = l.num * r.num;
    out.den = l.den * r.den;
}

function div(l, r, out) {
    var c = r.num;
    out.num = l.num * r.den;
    out.den = l.den * c;
}

function clone(f) {
    return new Fraction(f.num, f.den);
}

function simplify(f) {
    var g = gcd(f.num, f.den);
    f.num /= g;
    f.den /= g;
}

function toString(f) {
    return '' + f.num + '/' + f.den;
}

function toFloat(f) {
    return f.num / f.den;
}
