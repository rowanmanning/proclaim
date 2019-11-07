'use strict';

const AssertionError = require('../error/assertion-error');
const isLessThanOrEqual = require('../verify/is-less-than-or-equal');
const toString = require('../to-string');

module.exports = function assertIsLessThanOrEqual(value1, value2, message) {
	if (!isLessThanOrEqual(value1, value2)) {
		message = message || `Expected ${toString(value1)} to be less than or equal to ${toString(value2)}`;
		throw new AssertionError({
			actual: value1,
			operator: '<=',
			expected: value2,
			message
		});
	}
};
