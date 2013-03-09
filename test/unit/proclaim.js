// jshint maxlen: 200, maxstatements: 200
// global beforeEach, describe, it
(function () {
    'use strict';

    // Dependencies
    var assert = require('assert');

    // Test subject
    var proclaim = require('../../lib/proclaim');

    // Test suite
    describe('proclaim', function () {

        it('should be an object', function () {
            assert.strictEqual(typeof proclaim, 'object');
        });

        describe('.AssertionError()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.AssertionError, 'function');
            });

            describe('instance', function () {
                var opts, err;

                beforeEach(function () {
                    opts = {
                        message: 'foo',
                        actual: 'bar',
                        expected: 'baz',
                        operator: '==='
                    };
                    err = new proclaim.AssertionError(opts);
                });

                it('should extend the Error object', function () {
                    assert.strictEqual(err instanceof Error, true);
                });

                it('should save the expected options as instance properties', function () {
                    assert.strictEqual(err.message, opts.message);
                    assert.strictEqual(err.actual, opts.actual);
                    assert.strictEqual(err.expected, opts.expected);
                    assert.strictEqual(err.operator, opts.operator);
                });

                describe('#toString()', function () {

                    it('should return a string representation of the message', function () {
                        assert.strictEqual('' + err, 'AssertionError: foo');
                    });

                    it('should return a string representation of the error when no message is set', function () {
                        delete err.message;
                        assert.strictEqual('' + err, 'AssertionError: "bar" === "baz"');
                    });

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
                assert.doesNotThrow(function () { proclaim.deepEqual(true, true); });
                assert.doesNotThrow(function () { proclaim.deepEqual(new Date(), new Date()); });
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
                assert.throws(function () { proclaim.notDeepEqual(true, true); }, proclaim.AssertionError);
                assert.throws(function () { proclaim.notDeepEqual(new Date(), new Date()); }, proclaim.AssertionError);
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

            it('should not throw when called with an array');

            it('should throw when called with a non-array');

        });

        describe('isNotArray()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotArray, 'function');
            });

            it('should not throw when called with a non-array');

            it('should throw when called with an array');

        });

        describe('isBoolean()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isBoolean, 'function');
            });

            it('should not throw when called with a boolean');

            it('should throw when called with a non-boolean');

        });

        describe('isNotBoolean()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotBoolean, 'function');
            });

            it('should not throw when called with a non-boolean');

            it('should throw when called with a boolean');

        });

        describe('isTrue()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isTrue, 'function');
            });

            it('should not throw when called with true');

            it('should throw when called with a non-true value');

        });

        describe('isFalse()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isFalse, 'function');
            });

            it('should not throw when called with false');

            it('should throw when called with a non-false value');

        });

        describe('isFunction()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isFunction, 'function');
            });

            it('should not throw when called with a function');

            it('should throw when called with a non-function');

        });

        describe('isNotFunction()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotFunction, 'function');
            });

            it('should not throw when called with a non-function');

            it('should throw when called with a function');

        });

        describe('isNull()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNull, 'function');
            });

            it('should not throw when called with a null value');

            it('should throw when called with a non-null value');

        });

        describe('isNotNull()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotNull, 'function');
            });

            it('should not throw when called with a non-null value');

            it('should throw when called with a null value');

        });

        describe('isNumber()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNumber, 'function');
            });

            it('should not throw when called with a number');

            it('should throw when called with a non-number');

        });

        describe('isNotNumber()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotNumber, 'function');
            });

            it('should not throw when called with a non-number');

            it('should throw when called with a number');

        });

        describe('isObject()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isObject, 'function');
            });

            it('should not throw when called with an object');

            it('should throw when called with a non-object');

        });

        describe('isNotObject()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotObject, 'function');
            });

            it('should not throw when called with a non-object');

            it('should throw when called with an object');

        });

        describe('isString()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isString, 'function');
            });

            it('should not throw when called with a string');

            it('should throw when called with a non-string');

        });

        describe('isNotString()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isNotString, 'function');
            });

            it('should not throw when called with a non-string');

            it('should throw when called with a string');

        });

        describe('isUndefined()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isUndefined, 'function');
            });

            it('should not throw when called with an undefined value');

            it('should throw when called with a defined value');

        });

        describe('isDefined()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.isDefined, 'function');
            });

            it('should not throw when called with a defined value');

            it('should throw when called with an undefined value');

        });

        describe('match()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.match, 'function');
            });

            it('should not throw when called with a matching value and regexp');

            it('should throw when called with a non-matching value and regexp');

        });

        describe('notMatch()', function () {

            it('should be a function', function () {
                assert.strictEqual(typeof proclaim.notMatch, 'function');
            });

            it('should not throw when called with a non-matching value and regexp');

            it('should throw when called with a matching value and regexp');

        });

    });

} ());