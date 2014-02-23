module.exports = function(a, b, c) {
	switch (arguments.length) {
		case 0: 	return new Fraction(0, 1);
		case 1: 	return new Fraction(a, 1);
		case 2: 	return new Fraction(a, b);
		case 3: 	return new Fraction((a * c) + b, c);
		default: 	throw new Error("faction constructor accepts 0-3 arguments");
	}
}

//
// object interface

function Fraction(numerator, denominator) {
	this.num = numerator;
	this.den = denominator;	
}

Fraction.prototype.toString = function() {
	return toString(this);
}

Fraction.prototype.valueOf = function() {
	return toFloat(this);
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

//
// functions

function add(l, r, out) {

}

function sub(l, r, out) {

}

function mul(l, r, out) {
	out.num = l.num * r.num;
	out.den = l.den * r.den;
}

function div(l, r, out) {

}

function clone(f) {
	return { num: f.num, den: f.den };
}

function simplify(f) {

}

function toString(f) {

}

function toFloat(f) {
	return f.num / f.den;
}