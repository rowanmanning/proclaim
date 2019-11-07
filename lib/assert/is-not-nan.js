'use strict';

const AssertionError = require('../error/assertion-error');
const isNaN = require('../verify/is-nan');
const toString = require('../to-string');

module.exports = function assertIsNotNaN(value, message) {
	if (isNaN(value)) {
		message = message || `Expected ${toString(value)} to not be NaN`;
		throw new AssertionError({
			actual: value,
			operator: '!==',
			expected: NaN,
			message
		});
	}
};
