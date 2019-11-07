'use strict';

const AssertionError = require('../error/assertion-error');
const isDefined = require('../verify/is-defined');
const toString = require('../to-string');

module.exports = function assertIsDefined(value, message) {
	if (!isDefined(value)) {
		message = message || `Expected ${toString(value)} to not be undefined`;
		throw new AssertionError({
			actual: value,
			operator: '!==',
			expected: undefined,
			message
		});
	}
};
