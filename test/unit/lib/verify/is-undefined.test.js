'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-undefined', () => {
	let isUndefined;

	beforeEach(() => {
		isUndefined = require('../../../../lib/verify/is-undefined');
	});

	it('exports a function', () => {
		assert.isFunction(isUndefined);
	});

	describe('isUndefined(value)', () => {

		it('returns `true` when called with `undefined`', () => {
			const values = [
				undefined
			];
			for (const value of values) {
				assert.isTrue(isUndefined(value));
			}
		});

		it('returns `false` when called with anything other than `undefined`', () => {
			const values = [
				'',
				[],
				{},
				0,
				false,
				null
			];
			for (const value of values) {
				assert.isFalse(isUndefined(value));
			}
		});

	});

});
