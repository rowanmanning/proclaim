'use strict';

const AssertionError = require('../error/assertion-error');
const isUndefined = require('../verify/is-undefined');
const toString = require('../to-string');

module.exports = function assertIsUndefined(value, message) {
	if (!isUndefined(value)) {
		message = message || `Expected ${toString(value)} to be undefined`;
		throw new AssertionError({
			actual: value,
			operator: '===',
			expected: undefined,
			message
		});
	}
};
