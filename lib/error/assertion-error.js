'use strict';

const toString = require('../to-string');

module.exports = class AssertionError extends Error {

	constructor(options = {}) {
		const actual = options.actual;
		const expected = options.expected;
		const operator = options.operator || '';
		const message = options.message || getAssertionErrorMessage(options);

		super(message);

		this.name = 'AssertionError';
		this.actual = actual;
		this.expected = expected;
		this.operator = operator;
	}

};

function getAssertionErrorMessage(options) {
	const actual = options.actual || 'undefined';
	const expected = options.expected || 'undefined';
	const operator = options.operator || '';
	return `${toString(actual)} ${operator} ${toString(expected)}`;
}
