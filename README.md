
Proclaim
========

A simple assertion library for server and client side JavaScript. Proclaim can be used with most test frameworks.

**Current Version:** *1.4.0*  
**Build Status:** [![Build Status][travis-status]][travis]  
**Node Support:** *0.6, 0.8, 0.10*  
**Browser Support:** *Android Browser 2.2–4.2, Firefox 3.6, Firefox 4–19, Google Chrome 14–25, Internet Explorer 6–10, Mobile Safari iOS 3–6, Opera 12.10, Safari 5–6*


Why?
----

I've been frustrated by assertion libraries not working in all the browsers I test my code in (notably IE 6–8). Proclaim is an attempt to achieve the simplicity of [Node.js assert][node-assert] with the extra assertions of [Chai][chai].

Proclaim implements all of the assertions in [CommonJS Unit Testing 1.0][commonjs-unit] which means it works as a drop-in replacement for the Node.js assert module. It also implements most of Chai's assertions so you should be able to switch quite easily.


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


### proclaim.isTypeOf( actual, expected, [message] )

Assert that `typeof actual === expected`.


### proclaim.isNotTypeOf( actual, expected, [message] )

Assert that `typeof actual !== expected`.


### proclaim.isInstanceOf( actual, expected, [message] )

Assert that `actual instanceof expected`.


### proclaim.isNotInstanceOf( actual, expected, [message] )

Assert that `!(actual instanceof expected)`.


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


### proclaim.includes( haystack, needle, [message] )

Assert that `haystack` contains `needle`. For strings and arrays, this asserts that `indexOf` returns a value other than `-1`. For objects, this method asserts that `needle` is the name of a property on `haystack`.


### proclaim.doesNotInclude( haystack, needle, [message] )

Assert that `haystack` does not contain `needle`. See [proclaim.includes](#proclaimincludes-haystack-needle-message-).


### proclaim.length( value, expected, [message] )

Assert that `value.length === expected`.


Development
-----------

To develop Proclaim, you'll need to clone the repo and install dependencies with `make deps`. If you're on Windows, you'll also need to install [Make for Windows][make].

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

Proclaim is licensed under the [MIT][mit] license.



[bower]: http://bower.io/
[chai]: http://chaijs.com/
[commonjs-unit]: http://wiki.commonjs.org/wiki/Unit_Testing/1.0#Assert
[component]: https://github.com/component/component
[make]: http://gnuwin32.sourceforge.net/packages/make.htm
[mit]: http://opensource.org/licenses/mit-license.php
[node]: http://nodejs.org/
[node-assert]: http://nodejs.org/api/assert.html
[travis]: https://travis-ci.org/rowanmanning/proclaim
[travis-status]: https://travis-ci.org/rowanmanning/proclaim.png?branch=master
