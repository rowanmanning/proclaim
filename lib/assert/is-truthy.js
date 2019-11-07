'use strict';

const AssertionError = require('../error/assertion-error');
const isTruthy = require('../verify/is-truthy');
const toString = require('../to-string');

module.exports = function assertIsTruthy(value, message) {
	if (!isTruthy(value)) {
		message = message || `Expected ${toString(value)} to be truthy`;
		throw new AssertionError({
			actual: value,
			operator: '==',
			expected: true,
			message
		});
	}
};
