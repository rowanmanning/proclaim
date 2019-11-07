'use strict';

const AssertionError = require('../error/assertion-error');
const isType = require('../verify/is-type');
const toString = require('../to-string');

module.exports = function assertIsType(value, type, message) {
	if (!isType(value, type)) {
		message = message || `Expected ${toString(value)} to be of type ${type}`;
		throw new AssertionError({
			actual: typeof value,
			operator: '===',
			expected: type,
			message
		});
	}
};
