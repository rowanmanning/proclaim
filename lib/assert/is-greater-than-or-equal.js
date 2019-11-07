'use strict';

const AssertionError = require('../error/assertion-error');
const isGreaterThanOrEqual = require('../verify/is-greater-than-or-equal');
const toString = require('../to-string');

module.exports = function assertIsGreaterThanOrEqual(value1, value2, message) {
	if (!isGreaterThanOrEqual(value1, value2)) {
		message = message || `Expected ${toString(value1)} to be greater than or equal to ${toString(value2)}`;
		throw new AssertionError({
			actual: value1,
			operator: '>=',
			expected: value2,
			message
		});
	}
};
