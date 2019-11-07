'use strict';

const AssertionError = require('../error/assertion-error');
const isGreaterThan = require('../verify/is-greater-than');
const toString = require('../to-string');

module.exports = function assertIsGreaterThan(value1, value2, message) {
	if (!isGreaterThan(value1, value2)) {
		message = message || `Expected ${toString(value1)} to be greater than ${toString(value2)}`;
		throw new AssertionError({
			actual: value1,
			operator: '>',
			expected: value2,
			message
		});
	}
};
