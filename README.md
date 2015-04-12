
Proclaim
========

A simple assertion library for server and client side JavaScript. Proclaim can be used with most test frameworks.

[![NPM version][shield-npm]][info-npm]
[![Bower version][shield-bower]][info-bower]
[![Node.js version support][shield-node]][info-node]
[![Build status][shield-build]][info-build]
[![Dependencies][shield-dependencies]][info-dependencies]
[![MIT licensed][shield-license]][info-license]

**Browser Support:** *Android Browser 2.2–4.2, Firefox 3.6, Firefox 4–22, Google Chrome 14–28, Internet Explorer 6–10, Mobile Safari iOS 3–6, Safari 5–6*


Why?
----

I've been frustrated by assertion libraries not working in all the browsers I test my code in (notably IE 6–8). Proclaim is an attempt to achieve the simplicity of [Node.js assert][node-assert] with the extra assertions of [Chai][chai].

Proclaim implements all of the assertions in [CommonJS Unit Testing 1.0][commonjs-unit] which means it works as a drop-in replacement for the Node.js assert module. It also implements most of Chai's assertions ([see here for differences](#differences-between-proclaim-and-chai)) so you should be able to switch quite easily.


Getting Started
---------------

You can use Proclaim on the server side with [Node.js][node] and npm:

```sh
$ npm install proclaim
```

On the client side, you can either install Proclaim through [Bower][bower]/[Component][component]:

```sh
$ bower install proclaim
$ component install rowanmanning/proclaim
```

or by simply including `proclaim.js` in your page:

```html
<script src="path/to/lib/proclaim.js"></script>
```


Usage
-----

In Node.js or using Component, you can include Proclaim in your script by using require:

```js
var proclaim = require('proclaim');

// Or if you prefer to use 'assert' terminology:
var assert = require('proclaim');
```

Proclaim also works with AMD-style module loaders, just specify it as a dependency.

If you're just including with a `<script>`, `proclaim` is available as a global variable.


Assertions
----------

All assertions throw `AssertionError` if they fail.


### proclaim.fail( actual, expected, [message], [operator] )

Throw an assertion error.

```js
proclaim.fail('foo', 'bar', 'Foo equals bar', '===');
```


### proclaim.ok( value, [message] )

Assert that `value` is truthy.


### proclaim.notOk( value, [message] )

Assert that `value` is falsy.


### proclaim.equal( actual, expected, [message] )

Assert that `actual == expected`.


### proclaim.notEqual( actual, expected, [message] )

Assert that `actual != expected`.


### proclaim.strictEqual( actual, expected, [message] )

Assert that `actual === expected`.


### proclaim.notStrictEqual( actual, expected, [message] )

Assert that `actual !== expected`.


### proclaim.deepEqual( actual, expected, [message] )

Assert that `actual` is deeply equal to `expected`.


### proclaim.notDeepEqual( actual, expected, [message] )

Assert that `actual` is not deeply equal to `expected`.


### proclaim.throws( fn, [expected], [message] )

Assert that `fn` throws an error. If `expected` is present then the thrown `error` will be tested as follows:

- If `expected` is a function, assert that `error intanceof expected`
- If `expected` is a string, assert that `error.message === expected`
- If `expected` is a RegExp, assert that `expected.test(error) === true`


### proclaim.doesNotThrow( fn, [expected], [message] )

Assert that `fn` does not throw an error. If `expected` is present then the assertion is that an error can be thrown, but it does not pass the tests outlined in `proclaim.throws`.

*Aliases: `proclaim.notThrows`*


### proclaim.isTypeOf( actual, expected, [message] )

Assert that `typeof actual === expected`.

*Aliases: `proclaim.typeOf`*


### proclaim.isNotTypeOf( actual, expected, [message] )

Assert that `typeof actual !== expected`.

*Aliases: `proclaim.notTypeOf`*


### proclaim.isInstanceOf( actual, expected, [message] )

Assert that `actual instanceof expected`.

*Aliases: `proclaim.instanceOf`*


### proclaim.isNotInstanceOf( actual, expected, [message] )

Assert that `!(actual instanceof expected)`.

*Aliases: `proclaim.notInstanceOf`*


### proclaim.isArray( value, [message] )

Assert that `value` is an `array`.


### proclaim.isNotArray( value, [message] )

Assert that `value` is not an `array`.


### proclaim.isBoolean( value, [message] )

Assert that `value` is a `boolean`.


### proclaim.isNotBoolean( value, [message] )

Assert that `value` is not a `boolean`.


### proclaim.isTrue( value, [message] )

Assert that `value === true`.


### proclaim.isFalse( value, [message] )

Assert that `value === false`.


### proclaim.isFunction( value, [message] )

Assert that `value` is a `function`.


### proclaim.isNotFunction( value, [message] )

Assert that `value` is not a `function`.


### proclaim.isNull( value, [message] )

Assert that `value === null`.


### proclaim.isNotNull( value, [message] )

Assert that `value !== null`.


### proclaim.isNumber( value, [message] )

Assert that `value` is a `number`.


### proclaim.isNotNumber( value, [message] )

Assert that `value` is not a `number`.


### proclaim.isObject( value, [message] )

Assert that `value` is an `object`.


### proclaim.isNotObject( value, [message] )

Assert that `value` is not an `object`.


### proclaim.isString( value, [message] )

Assert that `value` is a `string`.


### proclaim.isNotString( value, [message] )

Assert that `value` is not a `string`.


### proclaim.isUndefined( value, [message] )

Assert that `value === undefined`.


### proclaim.isDefined( value, [message] )

Assert that `value !== undefined`.


### proclaim.match( actual, expected, [message] )

Assert that `actual` matches the RegExp in `expected`.


### proclaim.notMatch( actual, expected, [message] )

Assert that `actual` does not match the RegExp in `expected`.


### proclaim.include( haystack, needle, [message] )

Assert that `haystack` contains `needle`. For strings and arrays, this asserts that `indexOf` returns a value other than `-1`. For objects, this method asserts that `needle` is the name of a property on `haystack`.


### proclaim.doesNotInclude( haystack, needle, [message] )

Assert that `haystack` does not contain `needle`. See [proclaim.includes](#proclaimincludes-haystack-needle-message-).

*Aliases: `proclaim.notInclude`*


### proclaim.lengthEquals( value, expected, [message] )

Assert that `value.length === expected`.

*Aliases: `proclaim.lengthOf`*


### proclaim.lessThan( actual, expected, [message] )

Assert that `actual < expected`.

*Aliases: `proclaim.isBelow`*


### proclaim.lessThanOrEqual( actual, expected, [message] )

Assert that `actual <= expected`.


### proclaim.greaterThan( actual, expected, [message] )

Assert that `actual > expected`.

*Aliases: `proclaim.isAbove`*


### proclaim.greaterThanOrEqual( actual, expected, [message] )

Assert that `actual >= expected`.


Differences Between Proclaim And Chai
-------------------------------------

Proclaim implements most of Chai's assertions, but is missing a few. The following Chai assertions are not present in proclaim:

- `throw` - May implement, alias of `throws`
- `property` - May implement
- `notProperty` - May implement
- `deepProperty` - May implement
- `notDeepProperty` - May implement
- `propertyVal` - May implement
- `propertyNotVal` - May implement
- `deepPropertyVal` - May implement
- `deepPropertyNotVal` - May implement
- `operator` - Unlikely to implement
- `closeTo` - Unlikely to implement
- `sameMembers` - May implement
- `sameDeepMembers` - May implement
- `includeMembers` - May implement
- `changes` - Unlikely to implement
- `doesNotChange` - Unlikely to implement
- `increases` - Unlikely to implement
- `doesNotIncrease` - Unlikely to implement
- `decreases` - Unlikely to implement
- `doesNotDecrease` - Unlikely to implement


Legacy
------

If you're still using a `1.x` or `2.x` version of Proclaim, you're advised to upgrade to `3.x`. The `1.x` and `2.x` branches will be maintained for the forseeable future, but it will not get any new features. You can [view the `1.x` source code here][1.x] or [view the `2.x` source code here][2.x].


Development
-----------

To develop Proclaim, you'll need to clone the repo and install dependencies with `make deps`. If you're on Windows, you're probably best off using [Cygwin][cygwin] or similar.

Once you're set up, you can run the following commands:

```sh
$ make deps         # Install dependencies
$ make lint         # Run JSHint with the correct config
$ make test         # Run unit tests in Node
$ make test-server  # Run a server for browser unit testing (visit localhost:3000)
```

When no build target is specified, make will run `deps lint test`. This means you can use the following command for brevity:

```sh
$ make
```

Code with lint errors or no/failing tests will not be accepted, please use the build tools outlined above.


License
-------

Proclaim is licensed under the [MIT][info-license] license.



[1.x]: https://github.com/rowanmanning/proclaim/tree/1.x
[2.x]: https://github.com/rowanmanning/proclaim/tree/2.x
[bower]: http://bower.io/
[chai]: http://chaijs.com/
[commonjs-unit]: http://wiki.commonjs.org/wiki/Unit_Testing/1.0#Assert
[component]: https://github.com/component/component
[cygwin]: http://www.cygwin.com/
[node]: http://nodejs.org/
[node-assert]: http://nodejs.org/api/assert.html

[info-bower]: http://bower.io/search/?q=proclaim
[info-dependencies]: https://gemnasium.com/rowanmanning/proclaim
[info-license]: LICENSE
[info-node]: package.json
[info-npm]: https://www.npmjs.com/package/proclaim
[info-build]: https://travis-ci.org/rowanmanning/proclaim
[shield-bower]: https://img.shields.io/bower/v/proclaim.svg
[shield-dependencies]: https://img.shields.io/gemnasium/rowanmanning/proclaim.svg
[shield-license]: https://img.shields.io/badge/license-MIT-blue.svg
[shield-node]: https://img.shields.io/node/v/proclaim.svg?label=node.js+support
[shield-npm]: https://img.shields.io/npm/v/proclaim.svg
[shield-build]: https://img.shields.io/travis/rowanmanning/proclaim/master.svg
