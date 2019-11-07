'use strict';

const AssertionError = require('../error/assertion-error');
const isEqual = require('../verify/is-equal');
const toString = require('../to-string');

module.exports = function assertIsEqual(value1, value2, message) {
	if (!isEqual(value1, value2)) {
		message = message || `Expected ${toString(value1)} to equal ${toString(value2)}`;
		throw new AssertionError({
			actual: value1,
			operator: '==',
			expected: value2,
			message
		});
	}
};
