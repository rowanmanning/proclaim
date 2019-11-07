'use strict';

const AssertionError = require('../error/assertion-error');
const isNull = require('../verify/is-null');
const toString = require('../to-string');

module.exports = function assertIsNotNull(value, message) {
	if (isNull(value)) {
		message = message || `Expected ${toString(value)} to not be null`;
		throw new AssertionError({
			actual: typeof value,
			operator: '!==',
			expected: 'null',
			message
		});
	}
};
