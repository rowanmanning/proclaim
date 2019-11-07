'use strict';

const AssertionError = require('../error/assertion-error');
const isInstance = require('../verify/is-instance');
const toString = require('../to-string');

module.exports = function assertIsInstance(value, constructor, message) {
	if (!isInstance(value, constructor)) {
		message = message || `Expected ${toString(value)} to be an instance of ${toString(constructor)}`;
		throw new AssertionError({
			actual: value,
			operator: 'instanceof',
			expected: constructor,
			message
		});
	}
};