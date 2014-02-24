module.exports      = quotient;

quotient.eq         = eq;
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

//
// object interface

function Fraction(numerator, denominator) {
    this.num = numerator;
    this.den = denominator; 
}

Fraction.prototype.add = function(r) {
    var out = new Fraction(0, 1);
    add(this, r, out);
    return out;
}

Fraction.prototype.sub = function(r) {
    var out = new Fraction(0, 1);
    sub(this, r, out);
    return out;
}

Fraction.prototype.mul = function(r) {
    var out = new Fraction(0, 1);
    mul(this, r, out);
    return out;
}

Fraction.prototype.div = function(r) {
    var out = new Fraction(0, 1);
    div(this, r, out);
    return out;
}

Fraction.prototype.clone = function() {
    return new Fraction(this.num, this.den);
}

Fraction.prototype.simplify = function() {
    simplify(this);
}

Fraction.prototype.toString = function() {
    return toString(this);
}

Fraction.prototype.valueOf = function() {
    return toFloat(this);
}

//
// functions

function eq(l, r) {
    return (l.num * r.den) == (l.den * r.num);
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
