'use strict';

const AssertionError = require('../error/assertion-error');
const isNumber = require('../verify/is-number');
const toString = require('../to-string');

module.exports = function assertIsNumber(value, message) {
	if (!isNumber(value)) {
		message = message || `Expected ${toString(value)} to be a number`;
		throw new AssertionError({
			actual: typeof value,
			operator: '===',
			expected: 'number',
			message
		});
	}
};
