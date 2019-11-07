'use strict';

const AssertionError = require('../error/assertion-error');
const isString = require('../verify/is-string');
const toString = require('../to-string');

module.exports = function assertIsNotString(value, message) {
	if (isString(value)) {
		message = message || `Expected ${toString(value)} to not be a string`;
		throw new AssertionError({
			actual: typeof value,
			operator: '!==',
			expected: 'string',
			message
		});
	}
};
