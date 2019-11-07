'use strict';

// Define Proclaim
const proclaim = module.exports = require('./assert/is-truthy');

// Define consistently named methods
proclaim.isArray = require('./assert/is-array');
proclaim.isBoolean = require('./assert/is-boolean');
proclaim.isDefined = require('./assert/is-defined');
proclaim.isEqual = require('./assert/is-equal');
proclaim.isFalse = require('./assert/is-false');
proclaim.isFalsy = require('./assert/is-falsy');
proclaim.isFunction = require('./assert/is-function');
proclaim.isGreaterThan = require('./assert/is-greater-than');
proclaim.isGreaterThanOrEqual = require('./assert/is-greater-than-or-equal');
proclaim.isInstance = require('./assert/is-instance');
proclaim.isLessThan = require('./assert/is-less-than');
proclaim.isLessThanOrEqual = require('./assert/is-less-than-or-equal');
proclaim.isMatch = require('./assert/is-match');
proclaim.isNaN = require('./assert/is-nan');
proclaim.isNotArray = require('./assert/is-not-array');
proclaim.isNotBoolean = require('./assert/is-not-boolean');
proclaim.isNotEqual = require('./assert/is-not-equal');
proclaim.isNotFunction = require('./assert/is-not-function');
proclaim.isNotInstance = require('./assert/is-not-instance');
proclaim.isNotMatch = require('./assert/is-not-match');
proclaim.isNotNaN = require('./assert/is-not-nan');
proclaim.isNotNull = require('./assert/is-not-null');
proclaim.isNotNumber = require('./assert/is-not-number');
proclaim.isNotObject = require('./assert/is-not-object');
proclaim.isNotStrictEqual = require('./assert/is-not-strict-equal');
proclaim.isNotString = require('./assert/is-not-string');
proclaim.isNotType = require('./assert/is-not-type');
proclaim.isNull = require('./assert/is-null');
proclaim.isNumber = require('./assert/is-number');
proclaim.isObject = require('./assert/is-object');
proclaim.isStrictEqual = require('./assert/is-strict-equal');
proclaim.isString = require('./assert/is-string');
proclaim.isTrue = require('./assert/is-true');
proclaim.isTruthy = require('./assert/is-truthy');
proclaim.isType = require('./assert/is-type');
proclaim.isUndefined = require('./assert/is-undefined');

// Define aliases
proclaim.equal = proclaim.isEqual;
proclaim.greaterThan = proclaim.isGreaterThan;
proclaim.greaterThanOrEqual = proclaim.isGreaterThanOrEqual;
proclaim.instanceOf = proclaim.isInstance;
proclaim.isAbove = proclaim.isGreaterThan;
proclaim.isBelow = proclaim.isLessThan;
proclaim.isInstanceOf = proclaim.isInstance;
proclaim.isNotInstanceOf = proclaim.isNotInstance;
proclaim.isNotTypeOf = proclaim.isNotType;
proclaim.isTypeOf = proclaim.isType;
proclaim.lessThan = proclaim.isLessThan;
proclaim.lessThanOrEqual = proclaim.isLessThanOrEqual;
proclaim.match = proclaim.isMatch;
proclaim.notEqual = proclaim.isNotEqual;
proclaim.notInstanceOf = proclaim.isNotInstance;
proclaim.notMatch = proclaim.isNotMatch;
proclaim.notOk = proclaim.isFalsy;
proclaim.notStrictEqual = proclaim.isNotStrictEqual;
proclaim.notTypeOf = proclaim.isNotType;
proclaim.ok = proclaim.isTruthy;
proclaim.strictEqual = proclaim.isStrictEqual;
proclaim.typeOf = proclaim.isType;
