// jshint maxlen: 200
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

    });

} ());