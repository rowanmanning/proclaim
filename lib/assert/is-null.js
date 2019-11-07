'use strict';

const AssertionError = require('../error/assertion-error');
const isNull = require('../verify/is-null');
const toString = require('../to-string');

module.exports = function assertIsNull(value, message) {
	if (!isNull(value)) {
		message = message || `Expected ${toString(value)} to be null`;
		throw new AssertionError({
			actual: typeof value,
			operator: '===',
			expected: 'null',
			message
		});
	}
};
