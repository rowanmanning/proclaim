'use strict';

const AssertionError = require('./error/assertion-error');

module.exports = function fail(actual, expected, message, operator) {
	throw new AssertionError({
		message,
		actual,
		expected,
		operator
	});
};
