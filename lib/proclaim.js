/* eslint strict: ['error', 'function'] */
(function(undef) {
	'use strict';

	var root = {};

	// Set `root` to window (in a browser)
	if (typeof window === 'object' && window) {
		root = window;

	// Self (in a web worker),
	} else if (typeof self === 'object' && self) {
		root = self;

	// global (in Node/IOjs)
	} else if (typeof global === 'object' && global) {
		root = global;
	}

	var proclaim = ok;

	// Assertions as outlined in
	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0#Assert
	// -----------------------------------------------------

	// Assert that a value is truthy
	function ok(val, msg) {
		if (!val) {
			fail(val, true, msg, '==');
		}
	}
	proclaim.ok = ok;

	// Assert that two values are equal
	proclaim.equal = function(actual, expected, msg) {
		/* eslint-disable eqeqeq */
		if (actual != expected) {
			fail(actual, expected, msg, '==');
		}
		/* eslint-enable eqeqeq */
	};

	// Assert that two values are not equal
	proclaim.notEqual = function(actual, expected, msg) {
		/* eslint-disable eqeqeq */
		if (actual == expected) {
			fail(actual, expected, msg, '!=');
		}
		/* eslint-enable eqeqeq */
	};

	// Assert that two values are equal with strict comparison
	proclaim.strictEqual = function(actual, expected, msg) {
		if (actual !== expected) {
			fail(actual, expected, msg, '===');
		}
	};

	// Assert that two values are not equal with strict comparison
	proclaim.notStrictEqual = function(actual, expected, msg) {
		if (actual === expected) {
			fail(actual, expected, msg, '!==');
		}
	};

	// Assert that two values are deeply equal
	proclaim.deepEqual = function(actual, expected, msg) {
		if (!isDeepEqual(actual, expected)) {
			fail(actual, expected, msg, 'deepEqual');
		}
	};

	// Assert that two values are not deeply equal
	proclaim.notDeepEqual = function(actual, expected, msg) {
		if (isDeepEqual(actual, expected)) {
			fail(actual, expected, msg, '!deepEqual');
		}
	};

	// Assert that two values are strictly deeply equal
	proclaim.deepStrictEqual = function(actual, expected, msg) {
		if (!isDeepEqual(actual, expected, true)) {
			fail(actual, expected, msg, 'deepStrictEqual', proclaim.deepStrictEqual);
		}
	};

	// Assert that two values are not strictly deeply equal
	proclaim.notDeepStrictEqual = function(actual, expected, msg) {
		if (isDeepEqual(actual, expected, true)) {
			fail(actual, expected, msg, 'notDeepStrictEqual', proclaim.notDeepStrictEqual);
		}
	};

	// Assert that a function throws an error
	proclaim.throws = function(fn, expected, msg) {
		if (!functionThrows(fn, expected, true)) {
			fail(fn, expected, msg, 'throws');
		}
	};


	// Additional assertions
	// ---------------------

	// Assert that a value is falsy
	proclaim.notOk = function(val, msg) {
		if (val) {
			fail(val, true, msg, '!=');
		}
	};

	// Assert that a function does not throw an error
	proclaim.doesNotThrow = function(fn, expected, msg) {
		if (functionThrows(fn, expected, false)) {
			fail(fn, expected, msg, '!throws');
		}
	};

	// Assert that a value is a specific type
	proclaim.isTypeOf = function(val, type, msg) {
		proclaim.strictEqual(typeof val, type, msg);
	};

	// Assert that a value is not a specific type
	proclaim.isNotTypeOf = function(val, type, msg) {
		proclaim.notStrictEqual(typeof val, type, msg);
	};

	// Assert that a value is an instance of a constructor
	proclaim.isInstanceOf = function(val, constructor, msg) {
		if (!(val instanceof constructor)) {
			fail(val, constructor, msg, 'instanceof');
		}
	};

	// Assert that a value not an instance of a constructor
	proclaim.isNotInstanceOf = function(val, constructor, msg) {
		if (val instanceof constructor) {
			fail(val, constructor, msg, '!instanceof');
		}
	};

	// Assert that a value is an array
	proclaim.isArray = function(val, msg) {
		if (!isArray(val)) {
			fail(typeof val, 'array', msg, '===');
		}
	};

	// Assert that a value is not an array
	proclaim.isNotArray = function(val, msg) {
		if (isArray(val)) {
			fail(typeof val, 'array', msg, '!==');
		}
	};

	// Assert that a value is a boolean
	proclaim.isBoolean = function(val, msg) {
		proclaim.isTypeOf(val, 'boolean', msg);
	};

	// Assert that a value is not a boolean
	proclaim.isNotBoolean = function(val, msg) {
		proclaim.isNotTypeOf(val, 'boolean', msg);
	};

	// Assert that a value is true
	proclaim.isTrue = function(val, msg) {
		proclaim.strictEqual(val, true, msg);
	};

	// Assert that a value is false
	proclaim.isFalse = function(val, msg) {
		proclaim.strictEqual(val, false, msg);
	};

	// Assert that a value is a function
	proclaim.isFunction = function(val, msg) {
		proclaim.isTypeOf(val, 'function', msg);
	};

	// Assert that a value is not a function
	proclaim.isNotFunction = function(val, msg) {
		proclaim.isNotTypeOf(val, 'function', msg);
	};

	// Assert that a value is null
	proclaim.isNull = function(val, msg) {
		proclaim.strictEqual(val, null, msg);
	};

	// Assert that a value is not null
	proclaim.isNotNull = function(val, msg) {
		proclaim.notStrictEqual(val, null, msg);
	};

	// Assert that a value is a number
	proclaim.isNumber = function(val, msg) {
		proclaim.isTypeOf(val, 'number', msg);
	};

	// Assert that a value is not a number
	proclaim.isNotNumber = function(val, msg) {
		proclaim.isNotTypeOf(val, 'number', msg);
	};

	// Assert that a value is an object
	proclaim.isObject = function(val, msg) {
		proclaim.isTypeOf(val, 'object', msg);
	};

	// Assert that a value is not an object
	proclaim.isNotObject = function(val, msg) {
		proclaim.isNotTypeOf(val, 'object', msg);
	};

	// Assert that a value is a string
	proclaim.isString = function(val, msg) {
		proclaim.isTypeOf(val, 'string', msg);
	};

	// Assert that a value is not a string
	proclaim.isNotString = function(val, msg) {
		proclaim.isNotTypeOf(val, 'string', msg);
	};

	// Assert that a value is undefined
	proclaim.isUndefined = function(val, msg) {
		proclaim.isTypeOf(val, 'undefined', msg);
	};

	// Assert that a value is defined
	proclaim.isDefined = function(val, msg) {
		proclaim.isNotTypeOf(val, 'undefined', msg);
	};

	// Assert that a value matches a regular expression
	proclaim.match = function(actual, expected, msg) {
		if (!expected.test(actual)) {
			fail(actual, expected, msg, 'match');
		}
	};

	// Assert that a value does not match a regular expression
	proclaim.notMatch = function(actual, expected, msg) {
		if (expected.test(actual)) {
			fail(actual, expected, msg, '!match');
		}
	};

	// Assert that an object includes something
	proclaim.include = function(haystack, needle, msg) {
		if (!includes(haystack, needle)) {
			fail(haystack, needle, msg, 'include');
		}
	};

	// Assert that an object does not include something
	proclaim.doesNotInclude = function(haystack, needle, msg) {
		if (includes(haystack, needle)) {
			fail(haystack, needle, msg, '!include');
		}
	};

	// Assert that an object (Array, String, etc.) has the expected length
	proclaim.lengthEquals = function(obj, expected, msg) {
		if (isUndefinedOrNull(obj)) {
			return fail(undef, expected, msg, 'length');
		}
		if (obj.length !== expected) {
			fail(obj.length, expected, msg, 'length');
		}
	};

	// Assert that a value is less than another value
	proclaim.lessThan = function(actual, expected, msg) {
		if (actual >= expected) {
			fail(actual, expected, msg, '<');
		}
	};

	// Assert that a value is less than or equal to another value
	proclaim.lessThanOrEqual = function(actual, expected, msg) {
		if (actual > expected) {
			fail(actual, expected, msg, '<=');
		}
	};

	// Assert that a value is greater than another value
	proclaim.greaterThan = function(actual, expected, msg) {
		if (actual <= expected) {
			fail(actual, expected, msg, '>');
		}
	};

	// Assert that a value is greater than another value
	proclaim.greaterThanOrEqual = function(actual, expected, msg) {
		if (actual < expected) {
			fail(actual, expected, msg, '>=');
		}
	};


	// Aliases
	// -------

	proclaim.notThrows = proclaim.doesNotThrow;
	proclaim.typeOf = proclaim.isTypeOf;
	proclaim.notTypeOf = proclaim.isNotTypeOf;
	proclaim.instanceOf = proclaim.isInstanceOf;
	proclaim.notInstanceOf = proclaim.isNotInstanceOf;
	proclaim.notInclude = proclaim.doesNotInclude;
	proclaim.lengthOf = proclaim.lengthEquals;
	proclaim.isBelow = proclaim.lessThan;
	proclaim.isAbove = proclaim.greaterThan;


	// Error handling
	// --------------

	// Assertion error class
	function AssertionError(opts) {
		opts = opts || {};
		this.name = 'AssertionError';
		this.actual = opts.actual;
		this.expected = opts.expected;
		this.operator = opts.operator || '';
		this.message = opts.message || getAssertionErrorMessage(this);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, opts.stackStartFunction || fail);
		}
	}
	AssertionError.prototype = (Object.create ? Object.create(Error.prototype) : new Error());
	AssertionError.prototype.name = 'AssertionError';
	AssertionError.prototype.constructor = AssertionError;

	// Assertion error to string
	AssertionError.prototype.toString = function() {
		return this.name + ': ' + this.message;
	};

	// Fail a test
	function fail(actual, expected, message, operator, stackStartFunction) {
		throw new AssertionError({
			message: message,
			actual: actual,
			expected: expected,
			operator: operator,
			stackStartFunction: stackStartFunction
		});
	}

	// Expose error handling tools
	proclaim.AssertionError = AssertionError;
	proclaim.fail = fail;


	// Utilities
	// ---------

	// Utility for checking whether a value is undefined or null
	function isUndefinedOrNull(val) {
		return (val === null || typeof val === 'undefined');
	}

	// Utility for checking whether a value is an arguments object
	function isArgumentsObject(val) {
		return (Object.prototype.toString.call(val) === '[object Arguments]');
	}

	// Utility for checking whether an object contains another object
	function includes(haystack, needle) {
		var i;

		// Array#indexOf, but ie...
		if (isArray(haystack)) {
			for (i = haystack.length - 1; i >= 0; i -= 1) {
				if (haystack[i] === needle) {
					return true;
				}
			}
		}

		// String#indexOf
		if (typeof haystack === 'string') {
			if (haystack.indexOf(needle) !== -1) {
				return true;
			}
		}

		// Object#hasOwnProperty
		if (typeof haystack === 'object' && haystack !== null) {
			/* eslint-disable no-prototype-builtins */
			if (haystack.hasOwnProperty(needle)) {
				return true;
			}
			/* eslint-enable no-prototype-builtins */
		}

		return false;
	}

	// Utility for checking whether a value is an array
	var isArray = Array.isArray || function(val) {
		return (Object.prototype.toString.call(val) === '[object Array]');
	};

	// Utility for getting object keys
	function getObjectKeys(obj) {
		var key;
		var keys = [];
		for (key in obj) {
			/* eslint-disable no-prototype-builtins */
			if (obj.hasOwnProperty(key)) {
				keys.push(key);
			}
			/* eslint-enable no-prototype-builtins */
		}
		return keys;
	}

	// Utility for deep equality testing of objects
	function objectsEqual(obj1, obj2, strict) {
		/* eslint-disable eqeqeq */

		// Check for undefined or null
		if (isUndefinedOrNull(obj1) || isUndefinedOrNull(obj2)) {
			return false;
		}

		if (isPrimitive(obj1) || isPrimitive(obj2)) {
			return obj1 === obj2;
		}

		if (strict) {
			// Object prototypes must be the same
			/* eslint-disable no-proto */
			var obj1prototype = obj1.prototype || (obj1).__proto__;
			var obj2prototype = obj2.prototype || (obj2).__proto__;
			/* eslint-enable no-proto */
			if (obj1prototype !== obj2prototype) {
				return false;
			}
		}

		// Handle argument objects
		var obj1IsArgumentsObject = isArgumentsObject(obj1);
		var obj2IsArgumentsObject = isArgumentsObject(obj2);
		if (
			(obj1IsArgumentsObject && !obj2IsArgumentsObject) ||
												(!obj1IsArgumentsObject && obj2IsArgumentsObject)
		) {
			return false;
		}
		if (isArgumentsObject(obj1)) {
			if (!isArgumentsObject(obj2)) {
				return false;
			}
			obj1 = Array.prototype.slice.call(obj1);
			obj2 = Array.prototype.slice.call(obj2);
		}

		var obj1Keys;
		var obj2Keys;
		try {
			if (isArray(obj1) && isArray(obj2)) {
				obj1Keys = getObjectKeys(cloneArray(obj1));
				obj2Keys = getObjectKeys(cloneArray(obj2));
			} else {
				// Check number of own properties
				obj1Keys = getObjectKeys(obj1);
				obj2Keys = getObjectKeys(obj2);
			}
		} catch (error) {
			return false;
		}

		if (obj1Keys.length !== obj2Keys.length) {
			return false;
		}

		obj1Keys.sort();
		obj2Keys.sort();

		// Cheap initial key test (see https://github.com/joyent/node/blob/master/lib/assert.js)
		var key;
		var i;
		var len = obj1Keys.length;
		for (i = 0; i < len; i += 1) {
			if (obj1Keys[i] != obj2Keys[i]) {
				return false;
			}
		}

		// Expensive deep test
		for (i = 0; i < len; i += 1) {
			key = obj1Keys[i];
			if (!isDeepEqual(obj1[key], obj2[key], strict)) {
				return false;
			}
		}

		// If it got this far...
		return true;
		/* eslint-enable eqeqeq */
	}

	// Utility for deep equality testing
	function isDeepEqual(actual, expected, strict) {
		/* eslint-disable eqeqeq */
		if (actual === expected) {
			return true;
		}
		if (expected instanceof Date && actual instanceof Date) {
			return actual.getTime() === expected.getTime();
		}
		if (actual instanceof RegExp && expected instanceof RegExp) {
			return (
				actual.source === expected.source &&
																actual.global === expected.global &&
																actual.multiline === expected.multiline &&
																actual.lastIndex === expected.lastIndex &&
																actual.ignoreCase === expected.ignoreCase
			);
		}
		if (typeof actual !== 'object' && typeof expected !== 'object') {
			return strict ? actual === expected : actual == expected;
		}
		return objectsEqual(actual, expected, strict);
	}

	// Utility for testing whether a function throws an error
	function functionThrows(fn, expected, shouldThrow) {

		// Try/catch
		var thrown = false;
		var thrownError;
		try {
			fn();
		} catch (error) {
			thrown = true;
			thrownError = error;
		}

		// Check error
		if (thrown && expected) {
			thrown = errorMatches(thrownError, expected);
		}

		var isUnexpectedException = !shouldThrow && thrownError && !expected;
		var isUnwantedException = !shouldThrow && isError(thrownError);

		if (isUnexpectedException || (isUnwantedException && thrown)) {
			return thrown;
		}

		if ((shouldThrow && thrownError && expected &&
												!errorMatches(thrownError, expected)) || (!shouldThrow && thrownError)) {
			throw thrownError;
		}

		return thrown;
	}

	// Utility for checking whether an error matches a given constructor, regexp or string
	function errorMatches(actual, expected) {
		if (typeof expected === 'string') {
			return actual.message === expected;
		}
		if (expected instanceof RegExp) {
			return expected.test(actual.message);
		}
		if (actual instanceof expected) {
			return true;
		}

		return expected.call({}, actual) === true;
	}

	// Get a formatted assertion error message
	function getAssertionErrorMessage(error) {
		if (typeof require === 'function' && typeof module !== 'undefined' && module.exports) {
			var inspect = require('util-inspect');
			return [
				truncateString(inspect(error.actual, {depth: null}), 128),
				error.operator,
				truncateString(inspect(error.expected, {depth: null}), 128)
			].join(' ');
		}
		return error.actual + ' ' + error.operator + ' ' + error.expected;

	}

	// Truncate a string to a length
	function truncateString(string, length) {
		return (string.length < length ? string : string.slice(0, length) + '…');
	}

	// Utility for cloning an array, useful for ensuring undefined items are iterated over.
	function cloneArray(arr) {
		var clone = [];
		for (var i = 0; i < arr.length; i += 1) {
			clone.push(arr[i]);
		}
		return clone;
	}

	// Utility for detecting if a value is a primitive. A primitive value is a member of one of
	// the following built-in types: Undefined, Null, Boolean, Number, String, and Symbol;
	function isPrimitive(value) {
		return value === null || (typeof value !== 'function' && typeof value !== 'object');
	}

	// Utility for checking if a value is an Error.
	function isError(error) {
		return (
			isObject(error) &&
			(Object.prototype.toString.call(error) === '[object Error]' || error instanceof Error)
		);
	}

	// Utility for checking if a value is an Object.
	function isObject(arg) {
		return typeof arg === 'object' && arg !== null;
	}


	// Exports
	// -------

	// AMD
	if (typeof define !== 'undefined' && define.amd) {
		define([], function() {
			return proclaim;
		});
	}
	// CommonJS
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = proclaim;
	}
	// Script tag
	root.proclaim = proclaim;
	if (typeof global !== 'undefined') {
		global.proclaim = proclaim;
	}

}());
