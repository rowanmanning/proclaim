
Assert
========

A simple assertion library for server and client side JavaScript. Assert can be used with most test frameworks.

**Browser Support:** *Android Browser 2.2–4.2, Firefox 3.6, Firefox 4–22, Google Chrome 14–28, Internet Explorer 6–10, Mobile Safari iOS 3–6, Safari 5–6*


Assertions
----------

All assertions throw `AssertionError` if they fail.


### assert.fail( actual, expected, [message], [operator] )

Throw an assertion error.

```js
assert.fail('foo', 'bar', 'Foo equals bar', '===');
```


### assert.ok( value, [message] )

Assert that `value` is truthy.


### assert.notOk( value, [message] )

Assert that `value` is falsy.


### assert.equal( actual, expected, [message] )

Assert that `actual == expected`.


### assert.notEqual( actual, expected, [message] )

Assert that `actual != expected`.


### assert.strictEqual( actual, expected, [message] )

Assert that `actual === expected`.


### assert.notStrictEqual( actual, expected, [message] )

Assert that `actual !== expected`.


### assert.deepEqual( actual, expected, [message] )

Assert that `actual` is deeply equal to `expected`.


### assert.notDeepEqual( actual, expected, [message] )

Assert that `actual` is not deeply equal to `expected`.


### assert.throws( fn, [expected], [message] )

Assert that `fn` throws an error. If `expected` is present then the thrown `error` will be tested as follows:

- If `expected` is a function, assert that `error intanceof expected`
- If `expected` is a string, assert that `error.message === expected`
- If `expected` is a RegExp, assert that `expected.test(error) === true`


### assert.doesNotThrow( fn, [expected], [message] )

Assert that `fn` does not throw an error. If `expected` is present then the assertion is that an error can be thrown, but it does not pass the tests outlined in `assert.throws`.


### assert.isTypeOf( actual, expected, [message] )

Assert that `typeof actual === expected`.


### assert.isNotTypeOf( actual, expected, [message] )

Assert that `typeof actual !== expected`.


### assert.isInstanceOf( actual, expected, [message] )

Assert that `actual instanceof expected`.


### assert.isNotInstanceOf( actual, expected, [message] )

Assert that `!(actual instanceof expected)`.


### assert.isArray( value, [message] )

Assert that `value` is an `array`.


### assert.isNotArray( value, [message] )

Assert that `value` is not an `array`.


### assert.isBoolean( value, [message] )

Assert that `value` is a `boolean`.


### assert.isNotBoolean( value, [message] )

Assert that `value` is not a `boolean`.


### assert.isTrue( value, [message] )

Assert that `value === true`.


### assert.isFalse( value, [message] )

Assert that `value === false`.


### assert.isFunction( value, [message] )

Assert that `value` is a `function`.


### assert.isNotFunction( value, [message] )

Assert that `value` is not a `function`.


### assert.isNull( value, [message] )

Assert that `value === null`.


### assert.isNotNull( value, [message] )

Assert that `value !== null`.


### assert.isNumber( value, [message] )

Assert that `value` is a `number`.


### assert.isNotNumber( value, [message] )

Assert that `value` is not a `number`.


### assert.isObject( value, [message] )

Assert that `value` is an `object`.


### assert.isNotObject( value, [message] )

Assert that `value` is not an `object`.


### assert.isString( value, [message] )

Assert that `value` is a `string`.


### assert.isNotString( value, [message] )

Assert that `value` is not a `string`.


### assert.isUndefined( value, [message] )

Assert that `value === undefined`.


### assert.isDefined( value, [message] )

Assert that `value !== undefined`.


### assert.match( actual, expected, [message] )

Assert that `actual` matches the RegExp in `expected`.


### assert.notMatch( actual, expected, [message] )

Assert that `actual` does not match the RegExp in `expected`.


### assert.includes( haystack, needle, [message] )

Assert that `haystack` contains `needle`. For strings and arrays, this asserts that `indexOf` returns a value other than `-1`. For objects, this method asserts that `needle` is the name of a property on `haystack`.


### assert.doesNotInclude( haystack, needle, [message] )

Assert that `haystack` does not contain `needle`. See [assert.includes](#assertincludes-haystack-needle-message-).


### assert.lengthEquals( value, expected, [message] )

Assert that `value.length === expected`.


### assert.lessThan( actual, expected, [message] )

Assert that `actual < expected`.


### assert.lessThanOrEqual( actual, expected, [message] )

Assert that `actual <= expected`.


### assert.greaterThan( actual, expected, [message] )

Assert that `actual > expected`.


### assert.greaterThanOrEqual( actual, expected, [message] )

Assert that `actual >= expected`.


License
-------

Assert is a fork of [Procliam](https://github.com/rowanmanning/proclaim), licensed under the [MIT][http://opensource.org/licenses/mit-license.php] license.

