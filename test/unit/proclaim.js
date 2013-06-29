/* jshint maxlen: 200 */
/* global beforeEach, describe, it */
(function () {
    'use strict';

    // Dependencies
    var assert = require('assert');

    // Test subject
    var proclaim = require('../../lib/proclaim');

    // Test suite
    describe('proclaim', function () {

        beforeEach(function (done) {
            // Nasty hack to prevent stack space errors in IE
            // https://github.com/visionmedia/mocha/issues/502
            // (also function wrapper fixes error in Firefox 3.6)
            setTimeout(function () {
                done();
            }, 0);
        });

        it('should be a function', function () {
            assert.strictEqual(typeof proclaim, 'function');
        });

        it('should alias proclaim.ok', function () {
            assert.strictEqual(proclaim, proclaim.ok);
        });

        describe('.AssertionError()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.AssertionError, 'function');
            });

            describe('instance', function () {
                var optsWithMessage, errWithMessage, optsWithNoMessage, errWithNoMessage;

                beforeEach(function () {
                    optsWithMessage = {
                        message: 'foo',
                        actual: 'bar',
                        expected: 'baz',
                        operator: '==='
                    };
                    errWithMessage = new proclaim.AssertionError(optsWithMessage);
                    optsWithNoMessage = {
                        message: null,
                        actual: 'bar',
                        expected: 'baz',
                        operator: '==='
                    };
                    errWithNoMessage = new proclaim.AssertionError(optsWithNoMessage);
                });

                it('should extend the Error object', function () {
                    assert.strictEqual(errWithMessage instanceof Error, true);
                });

                it('should save the expected options as instance properties', function () {
                    assert.strictEqual(errWithMessage.message, optsWithMessage.message);
                    assert.strictEqual(errWithMessage.actual, optsWithMessage.actual);
                    assert.strictEqual(errWithMessage.expected, optsWithMessage.expected);
                    assert.strictEqual(errWithMessage.operator, optsWithMessage.operator);
                });

                describe('#toString()', function () {

                    it('should return a string representation of the message', function () {
                        assert.strictEqual('' + errWithMessage, 'AssertionError: foo');
                    });

                    it('should return a string representation of the error when no message is set', function () {
                        assert.strictEqual('' + errWithNoMessage, 'AssertionError: bar === baz');
                    });

                });

            });

        });

        describe('.fail()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.fail, 'function');
            });

            it('should throw an AssertionError', function () {
                assert.throws(function () { proclaim.fail('foo', 'bar'); }, proclaim.AssertionError);
            });

            describe('error', function () {

                it('should have the expected properties', function () {
                    var error;
                    try { proclaim.fail('foo', 'bar', 'baz', 'qux'); }
                    catch (err) { error = err; }
                    assert.strictEqual(error.actual, 'foo');
                    assert.strictEqual(error.expected, 'bar');
                    assert.strictEqual(error.message, 'baz');
                    assert.strictEqual(error.operator, 'qux');
                });

            });

        });

        describe('.ok()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.ok, 'function');
            });

            it('should not throw when called with truthy values', function () {
                assert.doesNotThrow(function () { proclaim.ok(true); });
                assert.doesNotThrow(function () { proclaim.ok(1); });
                assert.doesNotThrow(function () { proclaim.ok('foo'); });
            });

            it('should throw when called with falsy values', function () {
                assert.throws(function () { proclaim.ok(false); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.ok(0); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.ok(''); }, proclaim.AssertionError);
            });

        });

        describe('.notOk()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.notOk, 'function');
            });

            it('should not throw when called with falsy values', function () {
                assert.doesNotThrow(function () { proclaim.notOk(false); });
                assert.doesNotThrow(function () { proclaim.notOk(0); });
                assert.doesNotThrow(function () { proclaim.notOk(''); });
            });

            it('should throw when called with truthy values', function () {
                assert.throws(function () { proclaim.notOk(true); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.notOk(1); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.notOk('foo'); }, proclaim.AssertionError);
            });

        });

        describe('.equal()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.equal, 'function');
            });

            it('should not throw when called with equal values', function () {
                assert.doesNotThrow(function () { proclaim.equal(true, true); });
                assert.doesNotThrow(function () { proclaim.equal(true, 1); });
                assert.doesNotThrow(function () { proclaim.equal('123', 123); });
            });

            it('should throw when called with inequal values', function () {
                assert.throws(function () { proclaim.equal(true, false); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.equal(true, 0); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.equal('foo', 123); }, proclaim.AssertionError);
            });

        });

        describe('.notEqual()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.notEqual, 'function');
            });

            it('should not throw when called with inequal values', function () {
                assert.doesNotThrow(function () { proclaim.notEqual(true, false); });
                assert.doesNotThrow(function () { proclaim.notEqual(true, 0); });
                assert.doesNotThrow(function () { proclaim.notEqual('foo', 123); });
            });

            it('should throw when called with equal values', function () {
                assert.throws(function () { proclaim.notEqual(true, true); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.notEqual(true, 1); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.notEqual('123', 123); }, proclaim.AssertionError);
            });

        });

        describe('.deepEqual()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.deepEqual, 'function');
            });

            it('should not throw when called with deeply equal values', function () {
                var date = new Date();
                assert.doesNotThrow(function () { proclaim.deepEqual(true, true); });
                assert.doesNotThrow(function () { proclaim.deepEqual(date, date); });
                assert.doesNotThrow(function () {
                    proclaim.deepEqual({foo: 'bar', bar: ['baz']}, {foo: 'bar', bar: ['baz']});
                });
                assert.doesNotThrow(function () { proclaim.deepEqual(arguments, arguments); });
                // Todo: write some more thorough tests for this
            });

            it('should throw when called with deeply inequal values', function () {
                assert.throws(function () { proclaim.deepEqual(true, false); }, proclaim.AssertionError, 'test1');
                assert.throws(function () { proclaim.deepEqual(new Date(), new Date(1000)); }, proclaim.AssertionError, 'test2');
                assert.throws(function () {
                    proclaim.deepEqual({foo: 'bar', bar: ['baz']}, {bar: 'baz', baz: ['qux']});
                }, proclaim.AssertionError, 'test3');
            });

            it('should not throw when keys are in a different order', function () {
                assert.doesNotThrow(function () {
                    proclaim.deepEqual({ hello: 1, goodbye: 1 }, { goodbye: 1, hello: 1 });
                });
            });

            it('should handle RegExps', function () {
                var a = new RegExp('goodbye', 'g'),
                    b = /goodbye/gi,
                    c = new RegExp('hello', 'g'),
                    d = /hello/i,
                    e = new RegExp('hello', 'i');

                assert.doesNotThrow(function () { proclaim.deepEqual(a, a); });
                assert.doesNotThrow(function () { proclaim.deepEqual(d, e); });
                assert.throws(function () { proclaim.deepEqual(a, b); });
                assert.throws(function () { proclaim.deepEqual(a, c); });
                assert.throws(function () { proclaim.deepEqual(a, d); });
                assert.throws(function () { proclaim.deepEqual(a, e); });
            });
        });

        describe('.notDeepEqual()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.notDeepEqual, 'function');
            });

            it('should not throw when called with deeply inequal values', function () {
                assert.doesNotThrow(function () { proclaim.notDeepEqual(true, false); });
                assert.doesNotThrow(function () { proclaim.notDeepEqual(new Date(), new Date(1000)); });
                assert.doesNotThrow(function () {
                    proclaim.notDeepEqual({foo: 'bar', bar: ['baz']}, {bar: 'baz', baz: ['qux']});
                });
            });

            it('should throw when called with deeply equal values', function () {
                var date = new Date();
                assert.throws(function () { proclaim.notDeepEqual(true, true); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.notDeepEqual(date, date); }, proclaim.AssertionError);
                assert.throws(function () {
                    proclaim.notDeepEqual({foo: 'bar', bar: ['baz']}, {foo: 'bar', bar: ['baz']});
                }, proclaim.AssertionError);
                assert.throws(function () { proclaim.notDeepEqual(arguments, arguments); }, proclaim.AssertionError);
            });

        });

        describe('.strictEqual()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.strictEqual, 'function');
            });

            it('should not throw when called with strictly equal values', function () {
                assert.doesNotThrow(function () { proclaim.strictEqual(true, true); });
                assert.doesNotThrow(function () { proclaim.strictEqual(1, 1); });
                assert.doesNotThrow(function () { proclaim.strictEqual('foo', 'foo'); });
            });

            it('should throw when called with strictly inequal values', function () {
                assert.throws(function () { proclaim.strictEqual(true, false); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.strictEqual(true, 1); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.strictEqual('123', 123); }, proclaim.AssertionError);
            });

        });

        describe('.notStrictEqual()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.notStrictEqual, 'function');
            });

            it('should not throw when called with strictly inequal values', function () {
                assert.doesNotThrow(function () { proclaim.notStrictEqual(true, false); });
                assert.doesNotThrow(function () { proclaim.notStrictEqual(true, 1); });
                assert.doesNotThrow(function () { proclaim.notStrictEqual('123', 123); });
            });

            it('should throw when called with strictly equal values', function () {
                assert.throws(function () { proclaim.notStrictEqual(true, true); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.notStrictEqual(1, 1); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.notStrictEqual('foo', 'foo'); }, proclaim.AssertionError);
            });

        });

        // This is about to get more confusing than I though possible...
        describe('.throws()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.throws, 'function');
            });

            it('should not throw when called with a function which does throw', function () {
                assert.doesNotThrow(function () {
                    proclaim.throws(function () {
                        throw new Error('foo');
                    });
                });
            });

            it('should throw when called with a function which does not throw', function () {
                assert.throws(function () {
                    proclaim.throws(function () {});
                }, proclaim.AssertionError);
            });

            it('should not throw when thrown error matches the expected error', function () {
                assert.doesNotThrow(function () {
                    proclaim.throws(function () {
                        throw new Error('foo');
                    }, Error);
                });
                assert.doesNotThrow(function () {
                    proclaim.throws(function () {
                        throw new Error('foo');
                    }, /foo/);
                });
                assert.doesNotThrow(function () {
                    proclaim.throws(function () {
                        throw new Error('foo');
                    }, 'foo');
                });
            });

            it('should throw when thrown error does not match the expected error', function () {
                assert.throws(function () {
                    proclaim.throws(function () {
                        throw new Error('foo');
                    }, proclaim.AssertionError);
                }, proclaim.AssertionError);
                assert.throws(function () {
                    proclaim.throws(function () {
                        throw new Error('foo');
                    }, /bar/);
                }, proclaim.AssertionError);
                assert.throws(function () {
                    proclaim.throws(function () {
                        throw new Error('foo');
                    }, 'bar');
                }, proclaim.AssertionError);
            });

        });

        describe('.doesNotThrow()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.doesNotThrow, 'function');
            });

            it('should not throw when called with a function which does not throw', function () {
                assert.doesNotThrow(function () {
                    proclaim.doesNotThrow(function () {});
                });
            });

            it('should throw when called with a function which does throw', function () {
                assert.throws(function () {
                    proclaim.doesNotThrow(function () {
                        throw new Error('foo');
                    });
                }, proclaim.AssertionError);
            });

            it('should not throw when thrown error does not match the expected error', function () {
                assert.doesNotThrow(function () {
                    proclaim.doesNotThrow(function () {
                        throw new Error('foo');
                    }, proclaim.AssertionError);
                });
                assert.doesNotThrow(function () {
                    proclaim.doesNotThrow(function () {
                        throw new Error('foo');
                    }, /bar/);
                });
                assert.doesNotThrow(function () {
                    proclaim.doesNotThrow(function () {
                        throw new Error('foo');
                    }, 'bar');
                });
            });

            it('should throw when thrown error matches the expected error', function () {
                assert.throws(function () {
                    proclaim.doesNotThrow(function () {
                        throw new Error('foo');
                    }, Error);
                }, proclaim.AssertionError);
                assert.throws(function () {
                    proclaim.doesNotThrow(function () {
                        throw new Error('foo');
                    }, /foo/);
                }, proclaim.AssertionError);
                assert.throws(function () {
                    proclaim.doesNotThrow(function () {
                        throw new Error('foo');
                    }, 'foo');
                }, proclaim.AssertionError);
            });

        });

        describe('isTypeOf()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isTypeOf, 'function');
            });

            it('should not throw when called with a matching value and type', function () {
                assert.doesNotThrow(function () { proclaim.isTypeOf(true, 'boolean'); });
                assert.doesNotThrow(function () { proclaim.isTypeOf('foo', 'string'); });
                assert.doesNotThrow(function () { proclaim.isTypeOf([], 'object'); });
            });

            it('should throw when called with an unmatching value and type', function () {
                assert.throws(function () { proclaim.isTypeOf(true, 'undefined'); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isTypeOf('foo', 'number'); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isTypeOf([], 'function'); }, proclaim.AssertionError);
            });

        });

        describe('isNotTypeOf()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotTypeOf, 'function');
            });

            it('should not throw when called with an umatching value and type', function () {
                assert.doesNotThrow(function () { proclaim.isNotTypeOf(true, 'undefined'); });
                assert.doesNotThrow(function () { proclaim.isNotTypeOf('foo', 'number'); });
                assert.doesNotThrow(function () { proclaim.isNotTypeOf([], 'function'); });
            });

            it('should throw when called with a matching value and type', function () {
                assert.throws(function () { proclaim.isNotTypeOf(true, 'boolean'); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isNotTypeOf('foo', 'string'); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isNotTypeOf([], 'object'); }, proclaim.AssertionError);
            });

        });

        describe('isInstanceOf()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isInstanceOf, 'function');
            });

            it('should not throw when called with a matching value and constructor', function () {
                assert.doesNotThrow(function () { proclaim.isInstanceOf(new Date(), Date); });
            });

            it('should throw when called with an unmatching value and constructor', function () {
                assert.throws(function () { proclaim.isInstanceOf({}, Date); }, proclaim.AssertionError);
            });

        });

        describe('isNotInstanceOf()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotInstanceOf, 'function');
            });

            it('should not throw when called with an umatching value and constructor', function () {
                assert.doesNotThrow(function () { proclaim.isNotInstanceOf({}, Date); });
            });

            it('should throw when called with a matching value and constructor', function () {
                assert.throws(function () { proclaim.isNotInstanceOf(new Date(), Date); }, proclaim.AssertionError);
            });

        });

        describe('isArray()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isArray, 'function');
            });

            it('should not throw when called with an array', function () {
                assert.doesNotThrow(function () { proclaim.isArray([]); });
            });

            it('should throw when called with a non-array', function () {
                assert.throws(function () { proclaim.isArray(null); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isArray('foo'); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isArray({}); }, proclaim.AssertionError);
            });

        });

        describe('isNotArray()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotArray, 'function');
            });

            it('should not throw when called with a non-array', function () {
                assert.doesNotThrow(function () { proclaim.isNotArray(null); });
                assert.doesNotThrow(function () { proclaim.isNotArray('foo'); });
                assert.doesNotThrow(function () { proclaim.isNotArray({}); });
            });

            it('should throw when called with an array', function () {
                assert.throws(function () { proclaim.isNotArray([]); }, proclaim.AssertionError);
            });

        });

        describe('isBoolean()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isBoolean, 'function');
            });

            it('should not throw when called with a boolean', function () {
                assert.doesNotThrow(function () { proclaim.isBoolean(true); });
                assert.doesNotThrow(function () { proclaim.isBoolean(false); });
            });

            it('should throw when called with a non-boolean', function () {
                assert.throws(function () { proclaim.isBoolean(null); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isBoolean('foo'); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isBoolean({}); }, proclaim.AssertionError);
            });

        });

        describe('isNotBoolean()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotBoolean, 'function');
            });

            it('should not throw when called with a non-boolean', function () {
                assert.doesNotThrow(function () { proclaim.isNotBoolean(null); });
                assert.doesNotThrow(function () { proclaim.isNotBoolean('foo'); });
                assert.doesNotThrow(function () { proclaim.isNotBoolean({}); });
            });

            it('should throw when called with a boolean', function () {
                assert.throws(function () { proclaim.isNotBoolean(true); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isNotBoolean(false); }, proclaim.AssertionError);
            });

        });

        describe('isTrue()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isTrue, 'function');
            });

            it('should not throw when called with true', function () {
                assert.doesNotThrow(function () { proclaim.isTrue(true); });
            });

            it('should throw when called with a non-true value', function () {
                assert.throws(function () { proclaim.isTrue(false); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isTrue(1); }, proclaim.AssertionError);
            });

        });

        describe('isFalse()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isFalse, 'function');
            });

            it('should not throw when called with false', function () {
                assert.doesNotThrow(function () { proclaim.isFalse(false); });
            });

            it('should throw when called with a non-false value', function () {
                assert.throws(function () { proclaim.isFalse(true); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isFalse(0); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isFalse(null); }, proclaim.AssertionError);
            });

        });

        describe('isFunction()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isFunction, 'function');
            });

            it('should not throw when called with a function', function () {
                assert.doesNotThrow(function () { proclaim.isFunction(function () {}); });
            });

            it('should throw when called with a non-function', function () {
                assert.throws(function () { proclaim.isFunction(null); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isFunction('foo'); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isFunction({}); }, proclaim.AssertionError);
            });

        });

        describe('isNotFunction()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotFunction, 'function');
            });

            it('should not throw when called with a non-function', function () {
                assert.doesNotThrow(function () { proclaim.isNotFunction(null); });
                assert.doesNotThrow(function () { proclaim.isNotFunction('foo'); });
                assert.doesNotThrow(function () { proclaim.isNotFunction({}); });
            });

            it('should throw when called with a function', function () {
                assert.throws(function () { proclaim.isNotFunction(function () {}); }, proclaim.AssertionError);
            });

        });

        describe('isNull()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNull, 'function');
            });

            it('should not throw when called with a null value', function () {
                assert.doesNotThrow(function () { proclaim.isNull(null); });
            });

            it('should throw when called with a non-null value', function () {
                assert.throws(function () { proclaim.isNull(undefined); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isNull('foo'); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isNull({}); }, proclaim.AssertionError);
            });

        });

        describe('isNotNull()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotNull, 'function');
            });

            it('should not throw when called with a non-null value', function () {
                assert.doesNotThrow(function () { proclaim.isNotNull(undefined); });
                assert.doesNotThrow(function () { proclaim.isNotNull('foo'); });
                assert.doesNotThrow(function () { proclaim.isNotNull({}); });
            });

            it('should throw when called with a null value', function () {
                assert.throws(function () { proclaim.isNotNull(null); }, proclaim.AssertionError);
            });

        });

        describe('isNumber()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNumber, 'function');
            });

            it('should not throw when called with a number', function () {
                assert.doesNotThrow(function () { proclaim.isNumber(123); });
            });

            it('should throw when called with a non-number', function () {
                assert.throws(function () { proclaim.isNumber(null); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isNumber('foo'); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isNumber({}); }, proclaim.AssertionError);
            });

        });

        describe('isNotNumber()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotNumber, 'function');
            });

            it('should not throw when called with a non-number', function () {
                assert.doesNotThrow(function () { proclaim.isNotNumber(null); });
                assert.doesNotThrow(function () { proclaim.isNotNumber('foo'); });
                assert.doesNotThrow(function () { proclaim.isNotNumber({}); });
            });

            it('should throw when called with a number', function () {
                assert.throws(function () { proclaim.isNotNumber(123); }, proclaim.AssertionError);
            });

        });

        describe('isObject()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isObject, 'function');
            });

            it('should not throw when called with an object', function () {
                assert.doesNotThrow(function () { proclaim.isObject({}); });
            });

            it('should throw when called with a non-object', function () {
                assert.throws(function () { proclaim.isObject(undefined); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isObject('foo'); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isObject(123); }, proclaim.AssertionError);
            });

        });

        describe('isNotObject()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotObject, 'function');
            });

            it('should not throw when called with a non-object', function () {
                assert.doesNotThrow(function () { proclaim.isNotObject(undefined); });
                assert.doesNotThrow(function () { proclaim.isNotObject('foo'); });
                assert.doesNotThrow(function () { proclaim.isNotObject(123); });
            });

            it('should throw when called with an object', function () {
                assert.throws(function () { proclaim.isNotObject({}); }, proclaim.AssertionError);
            });

        });

        describe('isString()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isString, 'function');
            });

            it('should not throw when called with a string', function () {
                assert.doesNotThrow(function () { proclaim.isString('foo'); });
            });

            it('should throw when called with a non-string', function () {
                assert.throws(function () { proclaim.isString(null); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isString(123); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isString({}); }, proclaim.AssertionError);
            });

        });

        describe('isNotString()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotString, 'function');
            });

            it('should not throw when called with a non-string', function () {
                assert.doesNotThrow(function () { proclaim.isNotString(null); });
                assert.doesNotThrow(function () { proclaim.isNotString(123); });
                assert.doesNotThrow(function () { proclaim.isNotString({}); });
            });

            it('should throw when called with a string', function () {
                assert.throws(function () { proclaim.isNotString('foo'); }, proclaim.AssertionError);
            });

        });

        describe('isUndefined()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isUndefined, 'function');
            });

            it('should not throw when called with an undefined value', function () {
                assert.doesNotThrow(function () { proclaim.isUndefined(undefined); });
            });

            it('should throw when called with a defined value', function () {
                assert.throws(function () { proclaim.isUndefined(null); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isUndefined('foo'); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.isUndefined({}); }, proclaim.AssertionError);
            });

        });

        describe('isDefined()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isDefined, 'function');
            });

            it('should not throw when called with a defined value', function () {
                assert.doesNotThrow(function () { proclaim.isDefined(null); });
            });

            it('should throw when called with an undefined value', function () {
                assert.throws(function () { proclaim.isDefined(undefined); }, proclaim.AssertionError);
            });

        });

        describe('match()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.match, 'function');
            });

            it('should not throw when called with a matching value and regexp', function () {
                assert.doesNotThrow(function () { proclaim.match('foo', /f[a-z]o/); });
            });

            it('should throw when called with a non-matching value and regexp', function () {
                assert.throws(function () { proclaim.match('bar', /f[a-z]o/); }, proclaim.AssertionError);
            });

        });

        describe('notMatch()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.notMatch, 'function');
            });

            it('should not throw when called with a non-matching value and regexp', function () {
                assert.doesNotThrow(function () { proclaim.notMatch('bar', /f[a-z]o/); });
            });

            it('should throw when called with a matching value and regexp', function () {
                assert.throws(function () { proclaim.notMatch('foo', /f[a-z]o/); }, proclaim.AssertionError);
            });

        });

        describe('includes()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.includes, 'function');
            });

            describe('given an array', function () {

                it('should throw if "needle" is not found', function () {
                    assert.throws(function () {
                        proclaim.includes([ 1, 2, 3 ], 4);
                    }, proclaim.AssertionError);
                });

                it('should not throw if "needle" is found', function () {
                    assert.doesNotThrow(function () {
                        proclaim.includes([ 1, 2, 3, 4 ], 4);
                    });
                });

            });

            describe('given a string', function () {

                it('should throw if "needle" is not found', function () {
                    assert.throws(function () {
                        proclaim.includes('hello', 'world');
                    }, proclaim.AssertionError);
                });

                it('should not throw if "needle" is found', function () {
                    assert.doesNotThrow(function () {
                        proclaim.includes('hello world', 'world');
                    });
                });

            });

            describe('given an object', function () {

                it('should throw if the "needle" property is not found', function () {
                    assert.throws(function () {
                        proclaim.includes({ hello: true }, 'world');
                    }, proclaim.AssertionError);
                });

                it('should not throw if the "needle" property is found', function () {
                    assert.doesNotThrow(function () {
                        proclaim.includes({ hello: true, world: false }, 'world');
                    });
                });

            });
        });

        describe('doesNotInclude()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.doesNotInclude, 'function');
            });

            describe('given an array', function () {

                it('should throw if "needle" is not found', function () {
                    assert.doesNotThrow(function () {
                        proclaim.doesNotInclude([ 1, 2, 3 ], 4);
                    });
                });

                it('should not throw if "needle" is found', function () {
                    assert.throws(function () {
                        proclaim.doesNotInclude([ 1, 2, 3, 4 ], 4);
                    }, proclaim.AssertionError);
                });

            });

            describe('given a string', function () {

                it('should throw if "needle" is not found', function () {
                    assert.doesNotThrow(function () {
                        proclaim.doesNotInclude('hello', 'world');
                    });
                });

                it('should not throw if "needle" is found', function () {
                    assert.throws(function () {
                        proclaim.doesNotInclude('hello world', 'world');
                    }, proclaim.AssertionError);
                });

            });

            describe('given an object', function () {

                it('should throw if the "needle" property is not found', function () {
                    assert.doesNotThrow(function () {
                        proclaim.doesNotInclude({ hello: true }, 'world');
                    });
                });

                it('should not throw if the "needle" property is found', function () {
                    assert.throws(function () {
                        proclaim.doesNotInclude({ hello: true, world: false }, 'world');
                    }, proclaim.AssertionError);
                });

            });

        });

        describe('lengthEquals()', function() {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.lengthEquals, 'function');
            });

            it('should not throw when called with an object which has the expected length property', function () {
                assert.doesNotThrow(function () { proclaim.lengthEquals({length: 3}, 3); });
            });

            it('should throw when called with an object that has a lower or higher length property value', function () {
                assert.throws(function () { proclaim.lengthEquals({length: 2}, 3); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.lengthEquals({length: 4}, 3); }, proclaim.AssertionError);
            });

            it('should throw when called with an object that has no length property', function () {
                assert.throws(function () { proclaim.lengthEquals({}, 3); }, proclaim.AssertionError);
            });

            it('should throw when called with unexpected types', function () {
                assert.throws(function () { proclaim.lengthEquals(null, 3); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.lengthEquals(undefined, 3); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.lengthEquals(NaN, 3); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.lengthEquals(true, 3); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.lengthEquals(2, 3); }, proclaim.AssertionError);
            });

        });

    });

} ());
