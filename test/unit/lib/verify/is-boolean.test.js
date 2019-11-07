/* eslint-disable no-new-wrappers */
'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-boolean', () => {
	let isBoolean;

	beforeEach(() => {
		isBoolean = require('../../../../lib/verify/is-boolean');
	});

	it('exports a function', () => {
		assert.isFunction(isBoolean);
	});

	describe('isBoolean(value)', () => {

		it('returns `true` when called with a boolean', () => {
			const values = [
				false,
				true,
				new Boolean(false),
				new Boolean(true)
			];
			for (const value of values) {
				assert.isTrue(isBoolean(value));
			}
		});

		it('returns `false` when called with a non-boolean', () => {
			const values = [
				'hi',
				[],
				{},
				1,
				null,
				undefined
			];
			for (const value of values) {
				assert.isFalse(isBoolean(value));
			}
		});

	});

});
