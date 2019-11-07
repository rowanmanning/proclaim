'use strict';

const AssertionError = require('../error/assertion-error');
const isStrictEqual = require('../verify/is-strict-equal');
const toString = require('../to-string');

module.exports = function assertIsNotStrictEqual(value1, value2, message) {
	if (isStrictEqual(value1, value2)) {
		message = message || `Expected ${toString(value1)} to not strictly equal ${toString(value2)}`;
		throw new AssertionError({
			actual: value1,
			operator: '!==',
			expected: value2,
			message
		});
	}
};
