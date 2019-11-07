'use strict';

const AssertionError = require('../error/assertion-error');
const isMatch = require('../verify/is-match');
const toString = require('../to-string');

module.exports = function assertIsNotMatch(value, regExp, message) {
	if (isMatch(value, regExp)) {
		message = message || `Expected ${toString(value)} to not match ${toString(regExp)}`;
		throw new AssertionError({
			actual: value,
			operator: '!match',
			expected: regExp,
			message
		});
	}
};
