/* eslint-disable no-new-wrappers */
'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-number', () => {
	let isNumber;

	beforeEach(() => {
		isNumber = require('../../../../lib/verify/is-number');
	});

	it('exports a function', () => {
		assert.isFunction(isNumber);
	});

	describe('isNumber(value)', () => {

		it('returns `true` when called with a number', () => {
			const values = [
				-1,
				0,
				1,
				1.1,
				Infinity,
				NaN,
				new Number(123)
			];
			for (const value of values) {
				assert.isTrue(isNumber(value));
			}
		});

		it('returns `false` when called with a non-number', () => {
			const values = [
				'hi',
				[],
				{},
				null,
				true,
				undefined
			];
			for (const value of values) {
				assert.isFalse(isNumber(value));
			}
		});

	});

});
