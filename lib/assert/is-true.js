'use strict';

const AssertionError = require('../error/assertion-error');
const isTrue = require('../verify/is-true');
const toString = require('../to-string');

module.exports = function assertIsTrue(value, message) {
	if (!isTrue(value)) {
		message = message || `Expected ${toString(value)} to be true`;
		throw new AssertionError({
			actual: value,
			operator: '===',
			expected: true,
			message
		});
	}
};
