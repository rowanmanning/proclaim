'use strict';

const AssertionError = require('../error/assertion-error');
const isFalsy = require('../verify/is-falsy');
const toString = require('../to-string');

module.exports = function assertIsFalsy(value, message) {
	if (!isFalsy(value)) {
		message = message || `Expected ${toString(value)} to be falsy`;
		throw new AssertionError({
			actual: value,
			operator: '==',
			expected: false,
			message
		});
	}
};
