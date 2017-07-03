// jshint maxstatements: false
// jscs:disable disallowMultipleVarDecl, maximumLineLength, requireCamelCaseOrUpperCaseIdentifiers, requireObjectKeysOnNewLine
(function () {
    'use strict';

    var zuul_msg_bus = null;
    var assert;
    var proclaim;

    if (typeof window === 'undefined') {
        assert = proclaim = require('../../../lib/proclaim');
    }
    else {
        zuul_msg_bus = window.zuul_msg_bus;
        assert = proclaim = window.proclaim;
    }

    // Helper function to call a function with specified args
    function callFn (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(this, args);
        };
    }

    // Helper functions for testing throws/doesNotThrow
    function throwingFunction () {
        throw new Error('foo');
    }
    function nonThrowingFunction () {
        return 'foo';
    }

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
            assert.isFunction(proclaim);
        });

        it('should alias proclaim.ok', function () {
            assert.strictEqual(proclaim, proclaim.ok);
        });

        describe('.AssertionError()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.AssertionError);
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
                    assert.isInstanceOf(errWithMessage, Error);
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
                        if (typeof require === 'function' && !zuul_msg_bus) {
                            assert.strictEqual('' + errWithNoMessage, 'AssertionError: \'bar\' === \'baz\'');
                        }
                        else {
                            assert.strictEqual('' + errWithNoMessage, 'AssertionError: bar === baz');
                        }
                    });

                });

            });

        });

        describe('.fail()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.fail);
            });

            it('should throw an AssertionError', function () {
                assert.throws(callFn(proclaim.fail, 'foo', 'bar'), proclaim.AssertionError);
            });

            describe('error', function () {

                it('should have the expected properties', function () {
                    var error;
                    try {
                        proclaim.fail('foo', 'bar', 'baz', 'qux');
                    }
                    catch (err) {
                        error = err;
                    }
                    assert.strictEqual(error.actual, 'foo');
                    assert.strictEqual(error.expected, 'bar');
                    assert.strictEqual(error.message, 'baz');
                    assert.strictEqual(error.operator, 'qux');
                });

            });

        });

        describe('.ok()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.ok);
            });

            it('should not throw when called with truthy values', function () {
                assert.doesNotThrow(callFn(proclaim.ok, true));
                assert.doesNotThrow(callFn(proclaim.ok, 1));
                assert.doesNotThrow(callFn(proclaim.ok, 'foo'));
            });

            it('should throw when called with falsy values', function () {
                assert.throws(callFn(proclaim.ok, false), proclaim.AssertionError);
                assert.throws(callFn(proclaim.ok, 0), proclaim.AssertionError);
                assert.throws(callFn(proclaim.ok, ''), proclaim.AssertionError);
            });

        });

        describe('.notOk()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.notOk);
            });

            it('should not throw when called with falsy values', function () {
                assert.doesNotThrow(callFn(proclaim.notOk, false));
                assert.doesNotThrow(callFn(proclaim.notOk, 0));
                assert.doesNotThrow(callFn(proclaim.notOk, ''));
            });

            it('should throw when called with truthy values', function () {
                assert.throws(callFn(proclaim.notOk, true), proclaim.AssertionError);
                assert.throws(callFn(proclaim.notOk, 1), proclaim.AssertionError);
                assert.throws(callFn(proclaim.notOk, 'foo'), proclaim.AssertionError);
            });

        });

        describe('.equal()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.equal);
            });

            it('should not throw when called with equal values', function () {
                assert.doesNotThrow(callFn(proclaim.equal, true, true));
                assert.doesNotThrow(callFn(proclaim.equal, true, 1));
                assert.doesNotThrow(callFn(proclaim.equal, '123', 123));
            });

            it('should throw when called with inequal values', function () {
                assert.throws(callFn(proclaim.equal, true, false), proclaim.AssertionError);
                assert.throws(callFn(proclaim.equal, true, 0), proclaim.AssertionError);
                assert.throws(callFn(proclaim.equal, 'foo', 123), proclaim.AssertionError);
            });

        });

        describe('.notEqual()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.notEqual);
            });

            it('should not throw when called with inequal values', function () {
                assert.doesNotThrow(callFn(proclaim.notEqual, true, false));
                assert.doesNotThrow(callFn(proclaim.notEqual, true, 0));
                assert.doesNotThrow(callFn(proclaim.notEqual, 'foo', 123));
            });

            it('should throw when called with equal values', function () {
                assert.throws(callFn(proclaim.notEqual, true, true), proclaim.AssertionError);
                assert.throws(callFn(proclaim.notEqual, true, 1), proclaim.AssertionError);
                assert.throws(callFn(proclaim.notEqual, '123', 123), proclaim.AssertionError);
            });

        });

        describe('.deepEqual()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.deepEqual);
            });

            it('should not throw when called with deeply equal values', function () {
                var date = new Date();
                assert.doesNotThrow(callFn(proclaim.deepEqual, true, true));
                assert.doesNotThrow(callFn(proclaim.deepEqual, date, date));
                assert.doesNotThrow(callFn(proclaim.deepEqual, {foo: 'bar', bar: ['baz']}, {foo: 'bar', bar: ['baz']}));
                assert.doesNotThrow(callFn(proclaim.deepEqual, arguments, arguments));
                assert.doesNotThrow(callFn(proclaim.deepEqual, [1, undefined, 3], [1, undefined, 3]));
                // Todo: write some more thorough tests for this
            });

            it('should throw when called with deeply inequal values', function () {
                assert.throws(callFn(proclaim.deepEqual, true, false), proclaim.AssertionError, 'test1');
                assert.throws(callFn(proclaim.deepEqual, new Date(), new Date(1000)), proclaim.AssertionError, 'test2');
                assert.throws(callFn(proclaim.deepEqual, {foo: 'bar', bar: ['baz']}, {bar: 'baz', baz: ['qux']}), proclaim.AssertionError, 'test3');
                assert.throws(callFn(proclaim.deepEqual, false, {}), proclaim.AssertionError, 'test4');
                assert.throws(callFn(proclaim.deepEqual, [1, undefined, 3], [undefined,1,3]), proclaim.AssertionError, 'test5');
            });

            it('should not throw when keys are in a different order', function () {
                assert.doesNotThrow(callFn(proclaim.deepEqual, { hello: 1, goodbye: 1 }, { goodbye: 1, hello: 1 }));
            });

            it('should handle RegExps', function () {
                var a = new RegExp('goodbye', 'g'),
                    b = /goodbye/gi,
                    c = new RegExp('hello', 'g'),
                    d = /hello/i,
                    e = new RegExp('hello', 'i');

                assert.doesNotThrow(callFn(proclaim.deepEqual, a, a));
                assert.doesNotThrow(callFn(proclaim.deepEqual, d, e));
                assert.throws(callFn(proclaim.deepEqual, a, b));
                assert.throws(callFn(proclaim.deepEqual, a, c));
                assert.throws(callFn(proclaim.deepEqual, a, d));
                assert.throws(callFn(proclaim.deepEqual, a, e));
            });
        });

        describe('.notDeepEqual()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.notDeepEqual);
            });

            it('should not throw when called with deeply inequal values', function () {
                assert.doesNotThrow(callFn(proclaim.notDeepEqual, true, false));
                assert.doesNotThrow(callFn(proclaim.notDeepEqual, new Date(), new Date(1000)));
                assert.doesNotThrow(callFn(proclaim.notDeepEqual, {foo: 'bar', bar: ['baz']}, {bar: 'baz', baz: ['qux']}));
            });

            it('should throw when called with deeply equal values', function () {
                var date = new Date();
                assert.throws(callFn(proclaim.notDeepEqual, true, true), proclaim.AssertionError);
                assert.throws(callFn(proclaim.notDeepEqual, date, date), proclaim.AssertionError);
                assert.throws(callFn(proclaim.notDeepEqual, {foo: 'bar', bar: ['baz']}, {foo: 'bar', bar: ['baz']}), proclaim.AssertionError);
                assert.throws(callFn(proclaim.notDeepEqual, arguments, arguments), proclaim.AssertionError);
            });

        });

        describe('.strictEqual()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.strictEqual);
            });

            it('should not throw when called with strictly equal values', function () {
                assert.doesNotThrow(callFn(proclaim.strictEqual, true, true));
                assert.doesNotThrow(callFn(proclaim.strictEqual, 1, 1));
                assert.doesNotThrow(callFn(proclaim.strictEqual, 'foo', 'foo'));
            });

            it('should throw when called with strictly inequal values', function () {
                assert.throws(callFn(proclaim.strictEqual, true, false), proclaim.AssertionError);
                assert.throws(callFn(proclaim.strictEqual, true, 1), proclaim.AssertionError);
                assert.throws(callFn(proclaim.strictEqual, '123', 123), proclaim.AssertionError);
            });

        });

        describe('.notStrictEqual()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.notStrictEqual);
            });

            it('should not throw when called with strictly inequal values', function () {
                assert.doesNotThrow(callFn(proclaim.notStrictEqual, true, false));
                assert.doesNotThrow(callFn(proclaim.notStrictEqual, true, 1));
                assert.doesNotThrow(callFn(proclaim.notStrictEqual, '123', 123));
            });

            it('should throw when called with strictly equal values', function () {
                assert.throws(callFn(proclaim.notStrictEqual, true, true), proclaim.AssertionError);
                assert.throws(callFn(proclaim.notStrictEqual, 1, 1), proclaim.AssertionError);
                assert.throws(callFn(proclaim.notStrictEqual, 'foo', 'foo'), proclaim.AssertionError);
            });

        });

        describe('.throws()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.throws);
            });

            it('should not throw when called with a function which does throw', function () {
                assert.doesNotThrow(callFn(proclaim.throws, throwingFunction));
            });

            it('should throw when called with a function which does not throw', function () {
                assert.throws(callFn(proclaim.throws, nonThrowingFunction), proclaim.AssertionError);
            });

            it('should not throw when thrown error matches the expected error', function () {
                assert.doesNotThrow(callFn(proclaim.throws, throwingFunction, Error));
                assert.doesNotThrow(callFn(proclaim.throws, throwingFunction, /foo/));
                assert.doesNotThrow(callFn(proclaim.throws, throwingFunction, 'foo'));
            });

            it('should throw when thrown error does not match the expected error', function () {
                assert.throws(callFn(proclaim.throws, throwingFunction, proclaim.AssertionError), proclaim.AssertionError);
                assert.throws(callFn(proclaim.throws, throwingFunction, /bar/), proclaim.AssertionError);
                assert.throws(callFn(proclaim.throws, throwingFunction, 'bar'), proclaim.AssertionError);
            });

        });

        describe('.doesNotThrow()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.doesNotThrow);
            });

            it('should not throw when called with a function which does not throw', function () {
                assert.doesNotThrow(callFn(proclaim.doesNotThrow, nonThrowingFunction));
            });

            it('should throw when called with a function which does throw', function () {
                assert.throws(callFn(proclaim.doesNotThrow, throwingFunction), proclaim.AssertionError);
            });

            it('should not throw when thrown error does not match the expected error', function () {
                assert.doesNotThrow(callFn(proclaim.doesNotThrow, throwingFunction, proclaim.AssertionError));
                assert.doesNotThrow(callFn(proclaim.doesNotThrow, throwingFunction, /bar/));
                assert.doesNotThrow(callFn(proclaim.doesNotThrow, throwingFunction, 'bar'));
            });

            it('should throw when thrown error matches the expected error', function () {
                assert.throws(callFn(proclaim.doesNotThrow, throwingFunction, Error), proclaim.AssertionError);
                assert.throws(callFn(proclaim.doesNotThrow, throwingFunction, /foo/), proclaim.AssertionError);
                assert.throws(callFn(proclaim.doesNotThrow, throwingFunction, 'foo'), proclaim.AssertionError);
            });

        });

        describe('notThrows()', function () {
            it('should alias proclaim.doesNotThrow', function () {
                assert.strictEqual(proclaim.notThrows, proclaim.doesNotThrow);
            });
        });

        describe('isTypeOf()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isTypeOf);
            });

            it('should not throw when called with a matching value and type', function () {
                assert.doesNotThrow(callFn(proclaim.isTypeOf, true, 'boolean'));
                assert.doesNotThrow(callFn(proclaim.isTypeOf, 'foo', 'string'));
                assert.doesNotThrow(callFn(proclaim.isTypeOf, [], 'object'));
            });

            it('should throw when called with an unmatching value and type', function () {
                assert.throws(callFn(proclaim.isTypeOf, true, 'undefined'), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isTypeOf, 'foo', 'number'), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isTypeOf, [], 'function'), proclaim.AssertionError);
            });

        });

        describe('typeOf()', function () {
            it('should alias proclaim.isTypeOf', function () {
                assert.strictEqual(proclaim.typeOf, proclaim.isTypeOf);
            });
        });

        describe('isNotTypeOf()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isNotTypeOf);
            });

            it('should not throw when called with an umatching value and type', function () {
                assert.doesNotThrow(callFn(proclaim.isNotTypeOf, true, 'undefined'));
                assert.doesNotThrow(callFn(proclaim.isNotTypeOf, 'foo', 'number'));
                assert.doesNotThrow(callFn(proclaim.isNotTypeOf, [], 'function'));
            });

            it('should throw when called with a matching value and type', function () {
                assert.throws(callFn(proclaim.isNotTypeOf, true, 'boolean'), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isNotTypeOf, 'foo', 'string'), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isNotTypeOf, [], 'object'), proclaim.AssertionError);
            });

        });

        describe('notTypeOf()', function () {
            it('should alias proclaim.isNotTypeOf', function () {
                assert.strictEqual(proclaim.notTypeOf, proclaim.isNotTypeOf);
            });
        });

        describe('isInstanceOf()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isInstanceOf);
            });

            it('should not throw when called with a matching value and constructor', function () {
                assert.doesNotThrow(callFn(proclaim.isInstanceOf, new Date(), Date));
            });

            it('should throw when called with an unmatching value and constructor', function () {
                assert.throws(callFn(proclaim.isInstanceOf, {}, Date), proclaim.AssertionError);
            });

        });

        describe('instanceOf()', function () {
            it('should alias proclaim.isInstanceOf', function () {
                assert.strictEqual(proclaim.instanceOf, proclaim.isInstanceOf);
            });
        });

        describe('isNotInstanceOf()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isNotInstanceOf);
            });

            it('should not throw when called with an umatching value and constructor', function () {
                assert.doesNotThrow(callFn(proclaim.isNotInstanceOf, {}, Date));
            });

            it('should throw when called with a matching value and constructor', function () {
                assert.throws(callFn(proclaim.isNotInstanceOf, new Date(), Date), proclaim.AssertionError);
            });

        });

        describe('notInstanceOf()', function () {
            it('should alias proclaim.isNotInstanceOf', function () {
                assert.strictEqual(proclaim.notInstanceOf, proclaim.isNotInstanceOf);
            });
        });

        describe('isArray()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isArray);
            });

            it('should not throw when called with an array', function () {
                assert.doesNotThrow(callFn(proclaim.isArray, []));
            });

            it('should throw when called with a non-array', function () {
                assert.throws(callFn(proclaim.isArray, null), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isArray, 'foo'), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isArray, {}), proclaim.AssertionError);
            });

        });

        describe('isNotArray()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isNotArray);
            });

            it('should not throw when called with a non-array', function () {
                assert.doesNotThrow(callFn(proclaim.isNotArray, null));
                assert.doesNotThrow(callFn(proclaim.isNotArray, 'foo'));
                assert.doesNotThrow(callFn(proclaim.isNotArray, {}));
            });

            it('should throw when called with an array', function () {
                assert.throws(callFn(proclaim.isNotArray, []), proclaim.AssertionError);
            });

        });

        describe('isBoolean()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isBoolean);
            });

            it('should not throw when called with a boolean', function () {
                assert.doesNotThrow(callFn(proclaim.isBoolean, true));
                assert.doesNotThrow(callFn(proclaim.isBoolean, false));
            });

            it('should throw when called with a non-boolean', function () {
                assert.throws(callFn(proclaim.isBoolean, null), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isBoolean, 'foo'), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isBoolean, {}), proclaim.AssertionError);
            });

        });

        describe('isNotBoolean()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isNotBoolean);
            });

            it('should not throw when called with a non-boolean', function () {
                assert.doesNotThrow(callFn(proclaim.isNotBoolean, null));
                assert.doesNotThrow(callFn(proclaim.isNotBoolean, 'foo'));
                assert.doesNotThrow(callFn(proclaim.isNotBoolean, {}));
            });

            it('should throw when called with a boolean', function () {
                assert.throws(callFn(proclaim.isNotBoolean, true), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isNotBoolean, false), proclaim.AssertionError);
            });

        });

        describe('isTrue()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isTrue);
            });

            it('should not throw when called with true', function () {
                assert.doesNotThrow(callFn(proclaim.isTrue, true));
            });

            it('should throw when called with a non-true value', function () {
                assert.throws(callFn(proclaim.isTrue, false), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isTrue, 1), proclaim.AssertionError);
            });

        });

        describe('isFalse()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isFalse);
            });

            it('should not throw when called with false', function () {
                assert.doesNotThrow(callFn(proclaim.isFalse, false));
            });

            it('should throw when called with a non-false value', function () {
                assert.throws(callFn(proclaim.isFalse, true), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isFalse, 0), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isFalse, null), proclaim.AssertionError);
            });

        });

        describe('isFunction()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isFunction);
            });

            it('should not throw when called with a function', function () {
                assert.doesNotThrow(function () {
                    proclaim.isFunction(function () {});
                });
            });

            it('should throw when called with a non-function', function () {
                assert.throws(callFn(proclaim.isFunction, null), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isFunction, 'foo'), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isFunction, {}), proclaim.AssertionError);
            });

        });

        describe('isNotFunction()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isNotFunction);
            });

            it('should not throw when called with a non-function', function () {
                assert.doesNotThrow(callFn(proclaim.isNotFunction, null));
                assert.doesNotThrow(callFn(proclaim.isNotFunction, 'foo'));
                assert.doesNotThrow(callFn(proclaim.isNotFunction, {}));
            });

            it('should throw when called with a function', function () {
                assert.throws(callFn(proclaim.isNotFunction, function () {}), proclaim.AssertionError);
            });

        });

        describe('isNull()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isNull);
            });

            it('should not throw when called with a null value', function () {
                assert.doesNotThrow(callFn(proclaim.isNull, null));
            });

            it('should throw when called with a non-null value', function () {
                assert.throws(callFn(proclaim.isNull, undefined), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isNull, 'foo'), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isNull, {}), proclaim.AssertionError);
            });

        });

        describe('isNotNull()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isNotNull);
            });

            it('should not throw when called with a non-null value', function () {
                assert.doesNotThrow(callFn(proclaim.isNotNull, undefined));
                assert.doesNotThrow(callFn(proclaim.isNotNull, 'foo'));
                assert.doesNotThrow(callFn(proclaim.isNotNull, {}));
            });

            it('should throw when called with a null value', function () {
                assert.throws(callFn(proclaim.isNotNull, null), proclaim.AssertionError);
            });

        });

        describe('isNumber()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isNumber);
            });

            it('should not throw when called with a number', function () {
                assert.doesNotThrow(callFn(proclaim.isNumber, 123));
            });

            it('should throw when called with a non-number', function () {
                assert.throws(callFn(proclaim.isNumber, null), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isNumber, 'foo'), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isNumber, {}), proclaim.AssertionError);
            });

        });

        describe('isNotNumber()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isNotNumber);
            });

            it('should not throw when called with a non-number', function () {
                assert.doesNotThrow(callFn(proclaim.isNotNumber, null));
                assert.doesNotThrow(callFn(proclaim.isNotNumber, 'foo'));
                assert.doesNotThrow(callFn(proclaim.isNotNumber, {}));
            });

            it('should throw when called with a number', function () {
                assert.throws(callFn(proclaim.isNotNumber, 123), proclaim.AssertionError);
            });

        });

        describe('isObject()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isObject);
            });

            it('should not throw when called with an object', function () {
                assert.doesNotThrow(callFn(proclaim.isObject, {}));
            });

            it('should throw when called with a non-object', function () {
                assert.throws(callFn(proclaim.isObject, undefined), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isObject, 'foo'), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isObject, 123), proclaim.AssertionError);
            });

        });

        describe('isNotObject()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isNotObject);
            });

            it('should not throw when called with a non-object', function () {
                assert.doesNotThrow(callFn(proclaim.isNotObject, undefined));
                assert.doesNotThrow(callFn(proclaim.isNotObject, 'foo'));
                assert.doesNotThrow(callFn(proclaim.isNotObject, 123));
            });

            it('should throw when called with an object', function () {
                assert.throws(callFn(proclaim.isNotObject, {}), proclaim.AssertionError);
            });

        });

        describe('isString()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isString);
            });

            it('should not throw when called with a string', function () {
                assert.doesNotThrow(callFn(proclaim.isString, 'foo'));
            });

            it('should throw when called with a non-string', function () {
                assert.throws(callFn(proclaim.isString, null), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isString, 123), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isString, {}), proclaim.AssertionError);
            });

        });

        describe('isNotString()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isNotString);
            });

            it('should not throw when called with a non-string', function () {
                assert.doesNotThrow(callFn(proclaim.isNotString, null));
                assert.doesNotThrow(callFn(proclaim.isNotString, 123));
                assert.doesNotThrow(callFn(proclaim.isNotString, {}));
            });

            it('should throw when called with a string', function () {
                assert.throws(callFn(proclaim.isNotString, 'foo'), proclaim.AssertionError);
            });

        });

        describe('isUndefined()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isUndefined);
            });

            it('should not throw when called with an undefined value', function () {
                assert.doesNotThrow(callFn(proclaim.isUndefined, undefined));
            });

            it('should throw when called with a defined value', function () {
                assert.throws(callFn(proclaim.isUndefined, null), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isUndefined, 'foo'), proclaim.AssertionError);
                assert.throws(callFn(proclaim.isUndefined, {}), proclaim.AssertionError);
            });

        });

        describe('isDefined()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.isDefined);
            });

            it('should not throw when called with a defined value', function () {
                assert.doesNotThrow(callFn(proclaim.isDefined, null));
            });

            it('should throw when called with an undefined value', function () {
                assert.throws(callFn(proclaim.isDefined, undefined), proclaim.AssertionError);
            });

        });

        describe('match()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.match);
            });

            it('should not throw when called with a matching value and regexp', function () {
                assert.doesNotThrow(callFn(proclaim.match, 'foo', /f[a-z]o/));
            });

            it('should throw when called with a non-matching value and regexp', function () {
                assert.throws(callFn(proclaim.match, 'bar', /f[a-z]o/), proclaim.AssertionError);
            });

        });

        describe('notMatch()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.notMatch);
            });

            it('should not throw when called with a non-matching value and regexp', function () {
                assert.doesNotThrow(callFn(proclaim.notMatch, 'bar', /f[a-z]o/));
            });

            it('should throw when called with a matching value and regexp', function () {
                assert.throws(callFn(proclaim.notMatch, 'foo', /f[a-z]o/), proclaim.AssertionError);
            });

        });

        describe('include()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.include);
            });

            describe('given an array', function () {

                it('should throw if "needle" is not found', function () {
                    assert.throws(callFn(proclaim.include, [ 1, 2, 3 ], 4), proclaim.AssertionError);
                });

                it('should not throw if "needle" is found', function () {
                    assert.doesNotThrow(callFn(proclaim.include, [ 1, 2, 3, 4 ], 4));
                });

            });

            describe('given a string', function () {

                it('should throw if "needle" is not found', function () {
                    assert.throws(callFn(proclaim.include, 'hello', 'world'), proclaim.AssertionError);
                });

                it('should not throw if "needle" is found', function () {
                    assert.doesNotThrow(callFn(proclaim.include, 'hello world', 'world'));
                });

            });

            describe('given an object', function () {

                it('should throw if the "needle" property is not found', function () {
                    assert.throws(callFn(proclaim.include, { hello: true }, 'world'), proclaim.AssertionError);
                });

                it('should not throw if the "needle" property is found', function () {
                    assert.doesNotThrow(callFn(proclaim.include, { hello: true, world: false }, 'world'));
                });

            });

            describe('given an enhanced object (such as Window)', function () {
                var MockWindow;
                var mockWindow;

                beforeEach(function () {
                    // jscs:disable requireFunctionDeclarations
                    MockWindow = function () {
                        this.document = {};
                    };
                    MockWindow.prototype.toString = function () {
                        return '[object Window]';
                    };
                    mockWindow = new MockWindow();
                });

                it('should throw if the "needle" property is not found', function () {
                    assert.throws(callFn(proclaim.include, mockWindow, 'notaproperty'), proclaim.AssertionError);
                });

                it('should not throw if the "needle" property is found', function () {
                    assert.doesNotThrow(callFn(proclaim.include, mockWindow, 'document'));
                });

            });
        });

        describe('doesNotInclude()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.doesNotInclude);
            });

            describe('given an array', function () {

                it('should throw if "needle" is not found', function () {
                    assert.doesNotThrow(callFn(proclaim.doesNotInclude, [ 1, 2, 3 ], 4));
                });

                it('should not throw if "needle" is found', function () {
                    assert.throws(callFn(proclaim.doesNotInclude, [ 1, 2, 3, 4 ], 4), proclaim.AssertionError);
                });

            });

            describe('given a string', function () {

                it('should throw if "needle" is not found', function () {
                    assert.doesNotThrow(callFn(proclaim.doesNotInclude, 'hello', 'world'));
                });

                it('should not throw if "needle" is found', function () {
                    assert.throws(callFn(proclaim.doesNotInclude, 'hello world', 'world'), proclaim.AssertionError);
                });

            });

            describe('given an object', function () {

                it('should throw if the "needle" property is not found', function () {
                    assert.doesNotThrow(callFn(proclaim.doesNotInclude, { hello: true }, 'world'));
                });

                it('should not throw if the "needle" property is found', function () {
                    assert.throws(callFn(proclaim.doesNotInclude, { hello: true, world: false }, 'world'), proclaim.AssertionError);
                });

            });

        });

        describe('notInclude()', function () {
            it('should alias proclaim.doesNotInclude', function () {
                assert.strictEqual(proclaim.notInclude, proclaim.doesNotInclude);
            });
        });

        describe('lengthEquals()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.lengthEquals);
            });

            it('should not throw when called with an object which has the expected length property', function () {
                assert.doesNotThrow(callFn(proclaim.lengthEquals, {length: 3}, 3));
            });

            it('should throw when called with an object that has a lower or higher length property value', function () {
                assert.throws(callFn(proclaim.lengthEquals, {length: 2}, 3), proclaim.AssertionError);
                assert.throws(callFn(proclaim.lengthEquals, {length: 4}, 3), proclaim.AssertionError);
            });

            it('should throw when called with an object that has no length property', function () {
                assert.throws(callFn(proclaim.lengthEquals, {}, 3), proclaim.AssertionError);
            });

            it('should throw when called with unexpected types', function () {
                assert.throws(callFn(proclaim.lengthEquals, null, 3), proclaim.AssertionError);
                assert.throws(callFn(proclaim.lengthEquals, undefined, 3), proclaim.AssertionError);
                assert.throws(callFn(proclaim.lengthEquals, NaN, 3), proclaim.AssertionError);
                assert.throws(callFn(proclaim.lengthEquals, true, 3), proclaim.AssertionError);
                assert.throws(callFn(proclaim.lengthEquals, 2, 3), proclaim.AssertionError);
            });

        });

        describe('lengthOf()', function () {
            it('should alias proclaim.lengthEquals', function () {
                assert.strictEqual(proclaim.lengthOf, proclaim.lengthEquals);
            });
        });

        describe('.lessThan()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.lessThan);
            });

            it('should not throw when called with a value that is less than the expected value', function () {
                assert.doesNotThrow(callFn(proclaim.lessThan, 1, 2));
            });

            it('should throw when called with a value that is greater than or equal to the expected value', function () {
                assert.throws(callFn(proclaim.lessThan, 2, 1));
                assert.throws(callFn(proclaim.lessThan, 1, 1));
            });

        });

        describe('isBelow()', function () {
            it('should alias proclaim.lessThan', function () {
                assert.strictEqual(proclaim.isBelow, proclaim.lessThan);
            });
        });

        describe('.lessThanOrEqual()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.lessThanOrEqual);
            });

            it('should not throw when called with a value that is less than or equal to the expected value', function () {
                assert.doesNotThrow(callFn(proclaim.lessThanOrEqual, 1, 2));
                assert.doesNotThrow(callFn(proclaim.lessThanOrEqual, 1, 1));
            });

            it('should throw when called with a value that is greater than the expected value', function () {
                assert.throws(callFn(proclaim.lessThanOrEqual, 2, 1));
            });

        });

        describe('.greaterThan()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.greaterThan);
            });

            it('should not throw when called with a value that is greater than the expected value', function () {
                assert.doesNotThrow(callFn(proclaim.greaterThan, 2, 1));
            });

            it('should throw when called with a value that is less than or equal to the expected value', function () {
                assert.throws(callFn(proclaim.greaterThan, 1, 2));
                assert.throws(callFn(proclaim.greaterThan, 1, 1));
            });

        });

        describe('isAbove()', function () {
            it('should alias proclaim.greaterThan', function () {
                assert.strictEqual(proclaim.isAbove, proclaim.greaterThan);
            });
        });

        describe('.greaterThanOrEqual()', function () {

            it('should be a function', function () {
                assert.isFunction(proclaim.greaterThanOrEqual);
            });

            it('should not throw when called with a value that is greater than or equal to the expected value', function () {
                assert.doesNotThrow(callFn(proclaim.greaterThanOrEqual, 2, 1));
                assert.doesNotThrow(callFn(proclaim.greaterThanOrEqual, 1, 1));
            });

            it('should throw when called with a value that is less than the expected value', function () {
                assert.throws(callFn(proclaim.greaterThanOrEqual, 1, 2));
            });

        });

    });

}());
