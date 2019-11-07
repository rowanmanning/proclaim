'use strict';

const AssertionError = require('../error/assertion-error');
const isNumber = require('../verify/is-number');
const toString = require('../to-string');

module.exports = function assertIsNotNumber(value, message) {
	if (isNumber(value)) {
		message = message || `Expected ${toString(value)} to not be a number`;
		throw new AssertionError({
			actual: typeof value,
			operator: '!==',
			expected: 'number',
			message
		});
	}
};
