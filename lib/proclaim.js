// global define
(function (root, proclaim) {
    'use strict';


    // Utilities
    // ---------

    // Utility for checking whether a value is undefined or null
    function isUndefinedOrNull (val) {
        return (val === null || typeof val === 'undefined');
    }

    // Utility for checking whether a value is an arguments object
    function isArgumentsObject (val) {
        return (Object.prototype.toString.call(val) === '[object Arguments]');
    }

    // Utility for checking whether a value is an array
    var isArray = Array.isArray || function (val) {
        return (Object.prototype.toString.call(val) === '[object Array]');
    };

    // Utility for getting object keys
    function getObjectKeys (obj) {
        var key, keys = [];
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }

    // Utility for deep equality testing of objects
    // Note: this function does an awful lot, look into sorting this
    function objectsEqual (obj1, obj2) {
        // jshint eqeqeq: false

        // Check for undefined or null
        if (isUndefinedOrNull(obj1) || isUndefinedOrNull(obj2)) {
            return false;
        }

        // Object prototypes must be the same
        if (obj1.prototype !== obj2.prototype) {
            return false;
        }

        // Handle argument objects
        if (isArgumentsObject(obj1)) {
            if (!isArgumentsObject(obj2)) {
                return false;
            }
            obj1 = Array.prototype.slice.call(obj1);
            obj2 = Array.prototype.slice.call(obj2);
        }

        // Check number of own properties
        var obj1Keys = getObjectKeys(obj1);
        var obj2Keys = getObjectKeys(obj2);
        if (obj1Keys.length !== obj2Keys.length) {
            return false;
        }

        // Cheap initial key test (see https://github.com/joyent/node/blob/master/lib/assert.js)
        var key, i, len = obj1Keys.length;
        for (i = 0; i < len; i += 1) {
            if (obj1Keys[i] != obj2Keys[i]) {
                return false;
            }
        }

        // Expensive deep test
        for (i = 0; i < len; i += 1) {
            key = obj1Keys[i];
            if (!isDeepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }

        // If it got this far...
        return true;
    }

    // Utility for deep equality testing
    function isDeepEqual (actual, expected) {
        // jshint eqeqeq: false
        if (actual === expected) {
            return true;
        }
        if (expected instanceof Date && actual instanceof Date) {
            return actual.getTime() === expected.getTime();
        }
        if (typeof actual !== 'object' && typeof expected !== 'object') {
            return actual == expected;
        }
        return objectsEqual(actual, expected);
    }

    // Utility for testing whether a function throws an error
    function functionThrows (fn, expected) {

        // Try/catch
        var thrown = false;
        var thrownError;
        try {
            fn();
        } catch (err) {
            thrown = true;
            thrownError = err;
        }

        // Check error
        if (thrown && expected) {
            thrown = errorMatches(thrownError, expected);
        }

        return thrown;
    }

    // Utility for checking whether an error matches a given constructor, regexp or string
    function errorMatches (actual, expected) {
        if (typeof expected === 'string') {
            return actual.message === expected;
        }
        if (Object.prototype.toString.call(expected) === '[object RegExp]') {
            return expected.test(actual.message);
        }
        if (actual instanceof expected) {
            return true;
        }
        return false;
    }


    // Error handling
    // --------------

    // Assertion error class
    function AssertionError (opts) {
        this.message = opts.message;
        this.actual = opts.actual;
        this.expected = opts.expected;
        this.operator = opts.operator;
    }
    AssertionError.prototype = new Error();
    AssertionError.prototype.constructor = AssertionError;
    AssertionError.prototype.name = 'AssertionError';

    // Assertion error to string
    AssertionError.prototype.toString = function () {
        if (this.message) {
            return this.name + ': ' + this.message;
        } else {
            return this.name + ': ' +
                this.actual + ' ' +
                this.operator + ' ' +
                this.expected;
        }
    };

    // Fail a test
    function fail (actual, operator, expected, message) {
        throw new AssertionError({
            message: message,
            actual: actual,
            expected: expected,
            operator: operator
        });
    }

    // Expose error handling tools
    proclaim.AssertionError = AssertionError;
    proclaim.fail = fail;


    // Assertions as outlined in
    // http://wiki.commonjs.org/wiki/Unit_Testing/1.0#Assert
    // -----------------------------------------------------

    // Assert that a value is truthy
    proclaim.ok = function (val, msg) {
        if (!!!val) {
            fail(val, '==', true, msg);
        }
    };

    // Assert that two values are equal
    proclaim.equal = function (actual, expected, msg) {
        // jshint eqeqeq: false
        if (actual != expected) {
            fail(actual, '==', expected, msg);
        }
    };

    // Assert that two values are not equal
    proclaim.notEqual = function (actual, expected, msg) {
        // jshint eqeqeq: false
        if (actual == expected) {
            fail(actual, '!=', expected, msg);
        }
    };

    // Assert that two values are equal with strict comparison
    proclaim.strictEqual = function (actual, expected, msg) {
        if (actual !== expected) {
            fail(actual, '===', expected, msg);
        }
    };

    // Assert that two values are not equal with strict comparison
    proclaim.notStrictEqual = function (actual, expected, msg) {
        if (actual === expected) {
            fail(actual, '!==', expected, msg);
        }
    };

    // Assert that two values are deeply equal
    proclaim.deepEqual = function (actual, expected, msg) {
        if (!isDeepEqual(actual, expected)) {
            fail(actual, 'deepEqual', expected, msg);
        }
    };

    // Assert that two values are not deeply equal
    proclaim.notDeepEqual = function (actual, expected, msg) {
        if (isDeepEqual(actual, expected)) {
            fail(actual, '!deepEqual', expected, msg);
        }
    };

    // Assert that a function throws an error
    proclaim.throws = function (fn, expected, msg) {
        if (!functionThrows(fn, expected)) {
            fail(fn, 'throws', expected, msg);
        }
    };


    // Additional assertions
    // ---------------------

    // Assert that a function does not throw an error
    proclaim.doesNotThrow = function (fn, expected, msg) {
        if (functionThrows(fn, expected)) {
            fail(fn, '!throws', expected, msg);
        }
    };

    // Assert that a value is a specific type
    proclaim.isTypeOf = function (val, type, msg) {
        proclaim.strictEqual(typeof val, type, msg);
    };

    // Assert that a value is not a specific type
    proclaim.isNotTypeOf = function (val, type, msg) {
        proclaim.notStrictEqual(typeof val, type, msg);
    };

    // Assert that a value is an instance of a constructor
    proclaim.isInstanceOf = function (val, constructor, msg) {
        if (!(val instanceof constructor)) {
            fail(val, 'instanceof', constructor, msg);
        }
    };

    // Assert that a value not an instance of a constructor
    proclaim.isNotInstanceOf = function (val, constructor, msg) {
        if (val instanceof constructor) {
            fail(val, '!instanceof', constructor, msg);
        }
    };

    // Assert that a value is an array
    proclaim.isArray = function (val, msg) {
        if (!isArray(val)) {
            fail(typeof val, '===', 'array', msg);
        }
    };

    // Assert that a value is not an array
    proclaim.isNotArray = function (val, msg) {
        if (isArray(val)) {
            fail(typeof val, '!==', 'array', msg);
        }
    };

    // Assert that a value is a boolean
    proclaim.isBoolean = function (val, msg) {
        proclaim.isTypeOf(val, 'boolean', msg);
    };

    // Assert that a value is not a boolean
    proclaim.isNotBoolean = function (val, msg) {
        proclaim.isNotTypeOf(val, 'boolean', msg);
    };

    // Assert that a value is true
    proclaim.isTrue = function (val, msg) {
        proclaim.strictEqual(val, true, msg);
    };

    // Assert that a value is false
    proclaim.isFalse = function (val, msg) {
        proclaim.strictEqual(val, false, msg);
    };

    // Assert that a value is a function
    proclaim.isFunction = function (val, msg) {
        proclaim.isTypeOf(val, 'function', msg);
    };

    // Assert that a value is not a function
    proclaim.isNotFunction = function (val, msg) {
        proclaim.isNotTypeOf(val, 'function', msg);
    };

    // Assert that a value is null
    proclaim.isNull = function (val, msg) {
        proclaim.strictEqual(val, null, msg);
    };

    // Assert that a value is not null
    proclaim.isNotNull = function (val, msg) {
        proclaim.notStrictEqual(val, null, msg);
    };

    // Assert that a value is a number
    proclaim.isNumber = function (val, msg) {
        proclaim.isTypeOf(val, 'number', msg);
    };

    // Assert that a value is not a number
    proclaim.isNotNumber = function (val, msg) {
        proclaim.isNotTypeOf(val, 'number', msg);
    };

    // Assert that a value is an object
    proclaim.isObject = function (val, msg) {
        proclaim.isTypeOf(val, 'object', msg);
    };

    // Assert that a value is not an object
    proclaim.isNotObject = function (val, msg) {
        proclaim.isNotTypeOf(val, 'object', msg);
    };

    // Assert that a value is a string
    proclaim.isString = function (val, msg) {
        proclaim.isTypeOf(val, 'string', msg);
    };

    // Assert that a value is not a string
    proclaim.isNotString = function (val, msg) {
        proclaim.isNotTypeOf(val, 'string', msg);
    };

    // Assert that a value is undefined
    proclaim.isUndefined = function (val, msg) {
        proclaim.isTypeOf(val, 'undefined', msg);
    };

    // Assert that a value is defined
    proclaim.isDefined = function (val, msg) {
        proclaim.isNotTypeOf(val, 'undefined', msg);
    };

    // Assert that a value matches a regular expression
    proclaim.match = function (val, pattern, msg) {
        if (!pattern.test(val)) {
            fail(val, 'match', pattern, msg);
        }
    };

    // Assert that a value does not match a regular expression
    proclaim.notMatch = function (val, pattern, msg) {
        if (pattern.test(val)) {
            fail(val, '!match', pattern, msg);
        }
    };


    // Exports
    // -------

    // AMD
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return proclaim;
        });
    }
    // CommonJS
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = proclaim;
    }
    // Script tag
    else {
        root.proclaim = proclaim;
    }


} (this, {}));
