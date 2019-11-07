'use strict';

const assert = require('../../../lib/proclaim');

describe('lib/proclaim', () => {
	let isArray;
	let isBoolean;
	let isDefined;
	let isEqual;
	let isFalse;
	let isFalsy;
	let isFunction;
	let isGreaterThan;
	let isGreaterThanOrEqual;
	let isInstance;
	let isLessThan;
	let isLessThanOrEqual;
	let isMatch;
	let isNaN;
	let isNotArray;
	let isNotBoolean;
	let isNotEqual;
	let isNotFunction;
	let isNotInstance;
	let isNotMatch;
	let isNotNaN;
	let isNotNull;
	let isNotNumber;
	let isNotObject;
	let isNotStrictEqual;
	let isNotString;
	let isNotType;
	let isNull;
	let isNumber;
	let isObject;
	let isStrictEqual;
	let isString;
	let isTrue;
	let isTruthy;
	let isType;
	let isUndefined;
	let proclaim;

	before(() => {
		isArray = require('../../../lib/assert/is-array');
		isBoolean = require('../../../lib/assert/is-boolean');
		isDefined = require('../../../lib/assert/is-defined');
		isEqual = require('../../../lib/assert/is-equal');
		isFalse = require('../../../lib/assert/is-false');
		isFalsy = require('../../../lib/assert/is-falsy');
		isFunction = require('../../../lib/assert/is-function');
		isGreaterThan = require('../../../lib/assert/is-greater-than');
		isGreaterThanOrEqual = require('../../../lib/assert/is-greater-than-or-equal');
		isInstance = require('../../../lib/assert/is-instance');
		isLessThan = require('../../../lib/assert/is-less-than');
		isLessThanOrEqual = require('../../../lib/assert/is-less-than-or-equal');
		isMatch = require('../../../lib/assert/is-match');
		isNaN = require('../../../lib/assert/is-nan');
		isNotArray = require('../../../lib/assert/is-not-array');
		isNotBoolean = require('../../../lib/assert/is-not-boolean');
		isNotEqual = require('../../../lib/assert/is-not-equal');
		isNotFunction = require('../../../lib/assert/is-not-function');
		isNotInstance = require('../../../lib/assert/is-not-instance');
		isNotMatch = require('../../../lib/assert/is-not-match');
		isNotNaN = require('../../../lib/assert/is-not-nan');
		isNotNull = require('../../../lib/assert/is-not-null');
		isNotNumber = require('../../../lib/assert/is-not-number');
		isNotObject = require('../../../lib/assert/is-not-object');
		isNotStrictEqual = require('../../../lib/assert/is-not-strict-equal');
		isNotString = require('../../../lib/assert/is-not-string');
		isNotType = require('../../../lib/assert/is-not-type');
		isNull = require('../../../lib/assert/is-null');
		isNumber = require('../../../lib/assert/is-number');
		isObject = require('../../../lib/assert/is-object');
		isStrictEqual = require('../../../lib/assert/is-strict-equal');
		isString = require('../../../lib/assert/is-string');
		isTrue = require('../../../lib/assert/is-true');
		isTruthy = require('../../../lib/assert/is-truthy');
		isType = require('../../../lib/assert/is-type');
		isUndefined = require('../../../lib/assert/is-undefined');
		proclaim = require('../../../lib/proclaim');
	});

	it('is an alias of `lib/verify/is-truthy`', () => {
		assert.isFunction(proclaim);
		assert.isStrictEqual(proclaim, isTruthy);
	});

	describe('.isArray', () => {

		it('is an alias of `lib/assert/is-array`', () => {
			assert.isStrictEqual(proclaim.isArray, isArray);
		});

	});

	describe('.isBoolean', () => {

		it('is an alias of `lib/assert/is-boolean`', () => {
			assert.isStrictEqual(proclaim.isBoolean, isBoolean);
		});

	});

	describe('.isDefined', () => {

		it('is an alias of `lib/assert/is-defined`', () => {
			assert.isStrictEqual(proclaim.isDefined, isDefined);
		});

	});

	describe('.isEqual', () => {

		it('is an alias of `lib/assert/is-equal`', () => {
			assert.isStrictEqual(proclaim.isEqual, isEqual);
		});

	});

	describe('.isFalse', () => {

		it('is an alias of `lib/assert/is-false`', () => {
			assert.isStrictEqual(proclaim.isFalse, isFalse);
		});

	});

	describe('.isFalsy', () => {

		it('is an alias of `lib/assert/is-falsy`', () => {
			assert.isStrictEqual(proclaim.isFalsy, isFalsy);
		});

	});

	describe('.isFunction', () => {

		it('is an alias of `lib/assert/is-function`', () => {
			assert.isStrictEqual(proclaim.isFunction, isFunction);
		});

	});

	describe('.isGreaterThan', () => {

		it('is an alias of `lib/assert/is-greater-than`', () => {
			assert.isStrictEqual(proclaim.isGreaterThan, isGreaterThan);
		});

	});

	describe('.isGreaterThanOrEqual', () => {

		it('is an alias of `lib/assert/is-greater-than-or-equal`', () => {
			assert.isStrictEqual(proclaim.isGreaterThanOrEqual, isGreaterThanOrEqual);
		});

	});

	describe('.isInstance', () => {

		it('is an alias of `lib/assert/is-instance`', () => {
			assert.isStrictEqual(proclaim.isInstance, isInstance);
		});

	});

	describe('.isLessThan', () => {

		it('is an alias of `lib/assert/is-less-than`', () => {
			assert.isStrictEqual(proclaim.isLessThan, isLessThan);
		});

	});

	describe('.isLessThanOrEqual', () => {

		it('is an alias of `lib/assert/is-less-than-or-equal`', () => {
			assert.isStrictEqual(proclaim.isLessThanOrEqual, isLessThanOrEqual);
		});

	});

	describe('.isMatch', () => {

		it('is an alias of `lib/assert/is-match`', () => {
			assert.isStrictEqual(proclaim.isMatch, isMatch);
		});

	});

	describe('.isNaN', () => {

		it('is an alias of `lib/assert/is-nan`', () => {
			assert.isStrictEqual(proclaim.isNaN, isNaN);
		});

	});

	describe('.isNotArray', () => {

		it('is an alias of `lib/assert/is-not-array`', () => {
			assert.isStrictEqual(proclaim.isNotArray, isNotArray);
		});

	});

	describe('.isNotBoolean', () => {

		it('is an alias of `lib/assert/is-not-boolean`', () => {
			assert.isStrictEqual(proclaim.isNotBoolean, isNotBoolean);
		});

	});

	describe('.isNotEqual', () => {

		it('is an alias of `lib/assert/is-not-equal`', () => {
			assert.isStrictEqual(proclaim.isNotEqual, isNotEqual);
		});

	});

	describe('.isNotFunction', () => {

		it('is an alias of `lib/assert/is-not-function`', () => {
			assert.isStrictEqual(proclaim.isNotFunction, isNotFunction);
		});

	});

	describe('.isNotInstance', () => {

		it('is an alias of `lib/assert/is-not-instance`', () => {
			assert.isStrictEqual(proclaim.isNotInstance, isNotInstance);
		});

	});

	describe('.isNotMatch', () => {

		it('is an alias of `lib/assert/is-not-match`', () => {
			assert.isStrictEqual(proclaim.isNotMatch, isNotMatch);
		});

	});

	describe('.isNotNaN', () => {

		it('is an alias of `lib/assert/is-not-nan`', () => {
			assert.isStrictEqual(proclaim.isNotNaN, isNotNaN);
		});

	});

	describe('.isNotNull', () => {

		it('is an alias of `lib/assert/is-not-null`', () => {
			assert.isStrictEqual(proclaim.isNotNull, isNotNull);
		});

	});

	describe('.isNotNumber', () => {

		it('is an alias of `lib/assert/is-not-number`', () => {
			assert.isStrictEqual(proclaim.isNotNumber, isNotNumber);
		});

	});

	describe('.isNotObject', () => {

		it('is an alias of `lib/assert/is-not-object`', () => {
			assert.isStrictEqual(proclaim.isNotObject, isNotObject);
		});

	});

	describe('.isNotStrictEqual', () => {

		it('is an alias of `lib/assert/is-not-strict-equal`', () => {
			assert.isStrictEqual(proclaim.isNotStrictEqual, isNotStrictEqual);
		});

	});

	describe('.isNotString', () => {

		it('is an alias of `lib/assert/is-not-string`', () => {
			assert.isStrictEqual(proclaim.isNotString, isNotString);
		});

	});

	describe('.isNotType', () => {

		it('is an alias of `lib/assert/is-not-type`', () => {
			assert.isStrictEqual(proclaim.isNotType, isNotType);
		});

	});

	describe('.isNull', () => {

		it('is an alias of `lib/assert/is-null`', () => {
			assert.isStrictEqual(proclaim.isNull, isNull);
		});

	});

	describe('.isNumber', () => {

		it('is an alias of `lib/assert/is-number`', () => {
			assert.isStrictEqual(proclaim.isNumber, isNumber);
		});

	});

	describe('.isObject', () => {

		it('is an alias of `lib/assert/is-object`', () => {
			assert.isStrictEqual(proclaim.isObject, isObject);
		});

	});

	describe('.isStrictEqual', () => {

		it('is an alias of `lib/assert/is-strict-equal`', () => {
			assert.isStrictEqual(proclaim.isStrictEqual, isStrictEqual);
		});

	});

	describe('.isString', () => {

		it('is an alias of `lib/assert/is-string`', () => {
			assert.isStrictEqual(proclaim.isString, isString);
		});

	});

	describe('.isTrue', () => {

		it('is an alias of `lib/assert/is-true`', () => {
			assert.isStrictEqual(proclaim.isTrue, isTrue);
		});

	});

	describe('.isTruthy', () => {

		it('is an alias of `lib/assert/is-truthy`', () => {
			assert.isStrictEqual(proclaim.isTruthy, isTruthy);
		});

	});

	describe('.isType', () => {

		it('is an alias of `lib/assert/is-type`', () => {
			assert.isStrictEqual(proclaim.isType, isType);
		});

	});

	describe('.isUndefined', () => {

		it('is an alias of `lib/assert/is-undefined`', () => {
			assert.isStrictEqual(proclaim.isUndefined, isUndefined);
		});

	});

	describe('.equal', () => {

		it('is an alias of `lib/assert/is-equal`', () => {
			assert.isStrictEqual(proclaim.equal, isEqual);
		});

	});

	describe('.greaterThan', () => {

		it('is an alias of `lib/assert/is-greater-than`', () => {
			assert.isStrictEqual(proclaim.greaterThan, isGreaterThan);
		});

	});

	describe('.greaterThanOrEqual', () => {

		it('is an alias of `lib/assert/is-greaterthan-or-equal`', () => {
			assert.isStrictEqual(proclaim.greaterThanOrEqual, isGreaterThanOrEqual);
		});

	});

	describe('.instanceOf', () => {

		it('is an alias of `lib/assert/is-instance`', () => {
			assert.isStrictEqual(proclaim.instanceOf, isInstance);
		});

	});

	describe('.isAbove', () => {

		it('is an alias of `lib/assert/is-greater-than`', () => {
			assert.isStrictEqual(proclaim.isAbove, isGreaterThan);
		});

	});

	describe('.isBelow', () => {

		it('is an alias of `lib/assert/is-less-than`', () => {
			assert.isStrictEqual(proclaim.isBelow, isLessThan);
		});

	});

	describe('.isInstanceOf', () => {

		it('is an alias of `lib/assert/is-instance`', () => {
			assert.isStrictEqual(proclaim.isInstanceOf, isInstance);
		});

	});

	describe('.isNotInstanceOf', () => {

		it('is an alias of `lib/assert/is-not-instance`', () => {
			assert.isStrictEqual(proclaim.isNotInstanceOf, isNotInstance);
		});

	});

	describe('.isNotTypeOf', () => {

		it('is an alias of `lib/assert/is-not-type`', () => {
			assert.isStrictEqual(proclaim.isNotTypeOf, isNotType);
		});

	});

	describe('.isTypeOf', () => {

		it('is an alias of `lib/assert/is-type`', () => {
			assert.isStrictEqual(proclaim.isTypeOf, isType);
		});

	});

	describe('.lessThan', () => {

		it('is an alias of `lib/assert/is-less-than`', () => {
			assert.isStrictEqual(proclaim.lessThan, isLessThan);
		});

	});

	describe('.lessThanOrEqual', () => {

		it('is an alias of `lib/assert/is-less-than-or-equal`', () => {
			assert.isStrictEqual(proclaim.lessThanOrEqual, isLessThanOrEqual);
		});

	});

	describe('.match', () => {

		it('is an alias of `lib/assert/is-match`', () => {
			assert.isStrictEqual(proclaim.match, isMatch);
		});

	});

	describe('.notEqual', () => {

		it('is an alias of `lib/assert/is-not-equal`', () => {
			assert.isStrictEqual(proclaim.notEqual, isNotEqual);
		});

	});

	describe('.notInstanceOf', () => {

		it('is an alias of `lib/assert/is-not-instance`', () => {
			assert.isStrictEqual(proclaim.notInstanceOf, isNotInstance);
		});

	});

	describe('.notMatch', () => {

		it('is an alias of `lib/assert/is-not-match`', () => {
			assert.isStrictEqual(proclaim.notMatch, isNotMatch);
		});

	});

	describe('.notOk', () => {

		it('is an alias of `lib/assert/is-falsy`', () => {
			assert.isStrictEqual(proclaim.notOk, isFalsy);
		});

	});

	describe('.notStrictEqual', () => {

		it('is an alias of `lib/assert/is-not-strict-equal`', () => {
			assert.isStrictEqual(proclaim.notStrictEqual, isNotStrictEqual);
		});

	});

	describe('.notTypeOf', () => {

		it('is an alias of `lib/assert/is-not-type`', () => {
			assert.isStrictEqual(proclaim.notTypeOf, isNotType);
		});

	});

	describe('.ok', () => {

		it('is an alias of `lib/assert/is-truthy`', () => {
			assert.isStrictEqual(proclaim.ok, isTruthy);
		});

	});

	describe('.strictEqual', () => {

		it('is an alias of `lib/assert/is-strict-equal`', () => {
			assert.isStrictEqual(proclaim.strictEqual, isStrictEqual);
		});

	});

	describe('.typeOf', () => {

		it('is an alias of `lib/assert/is-type`', () => {
			assert.isStrictEqual(proclaim.typeOf, isType);
		});

	});

});
