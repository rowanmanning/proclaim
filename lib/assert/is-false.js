'use strict';

const AssertionError = require('../error/assertion-error');
const isFalse = require('../verify/is-false');
const toString = require('../to-string');

module.exports = function assertIsFalse(value, message) {
	if (!isFalse(value)) {
		message = message || `Expected ${toString(value)} to be false`;
		throw new AssertionError({
			actual: value,
			operator: '===',
			expected: false,
			message
		});
	}
};
