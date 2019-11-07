'use strict';

const AssertionError = require('../error/assertion-error');
const isLessThan = require('../verify/is-less-than');
const toString = require('../to-string');

module.exports = function assertIsLessThan(value1, value2, message) {
	if (!isLessThan(value1, value2)) {
		message = message || `Expected ${toString(value1)} to be less than ${toString(value2)}`;
		throw new AssertionError({
			actual: value1,
			operator: '<',
			expected: value2,
			message
		});
	}
};
