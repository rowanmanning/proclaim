'use strict';

const AssertionError = require('../error/assertion-error');
const isFunction = require('../verify/is-function');
const toString = require('../to-string');

module.exports = function assertIsNotFunction(value, message) {
	if (isFunction(value)) {
		message = message || `Expected ${toString(value)} to not be a function`;
		throw new AssertionError({
			actual: typeof value,
			operator: '!==',
			expected: 'function',
			message
		});
	}
};
