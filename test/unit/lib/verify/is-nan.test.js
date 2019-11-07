'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/isNaN', () => {
	let isNaN;

	beforeEach(() => {
		isNaN = require('../../../../lib/verify/is-nan');
	});

	it('exports a function', () => {
		assert.isFunction(isNaN);
	});

	describe('isNaN(value)', () => {

		it('returns `true` when called with NaN', () => {
			const values = [
				NaN
			];
			for (const value of values) {
				assert.isTrue(isNaN(value));
			}
		});

		it('returns `false` when called with anything other than NaN', () => {
			const values = [
				-1,
				'hi',
				[],
				{},
				0,
				1,
				123,
				null,
				undefined
			];
			for (const value of values) {
				assert.isFalse(isNaN(value));
			}
		});

	});

});
