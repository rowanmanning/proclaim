'use strict';

const AssertionError = require('../error/assertion-error');
const isArray = require('../verify/is-array');
const toString = require('../to-string');

module.exports = function assertIsNotArray(value, message) {
	if (isArray(value)) {
		message = message || `Expected ${toString(value)} to not be an array`;
		throw new AssertionError({
			actual: typeof value,
			operator: '!==',
			expected: 'array',
			message
		});
	}
};
