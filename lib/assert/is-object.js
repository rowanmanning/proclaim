'use strict';

const AssertionError = require('../error/assertion-error');
const isObject = require('../verify/is-object');
const toString = require('../to-string');

module.exports = function assertIsObject(value, message) {
	if (!isObject(value)) {
		message = message || `Expected ${toString(value)} to be an object`;
		throw new AssertionError({
			actual: typeof value,
			operator: '===',
			expected: 'object',
			message
		});
	}
};
