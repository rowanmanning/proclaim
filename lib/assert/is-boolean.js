'use strict';

const AssertionError = require('../error/assertion-error');
const isBoolean = require('../verify/is-boolean');
const toString = require('../to-string');

module.exports = function assertIsBoolean(value, message) {
	if (!isBoolean(value)) {
		message = message || `Expected ${toString(value)} to be a boolean`;
		throw new AssertionError({
			actual: typeof value,
			operator: '===',
			expected: 'boolean',
			message
		});
	}
};
