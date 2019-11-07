/* eslint-disable no-new-wrappers */
'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-false', () => {
	let isFalse;

	beforeEach(() => {
		isFalse = require('../../../../lib/verify/is-false');
	});

	it('exports a function', () => {
		assert.isFunction(isFalse);
	});

	describe('isFalse(value)', () => {

		it('returns `true` when called with `false`', () => {
			const values = [
				false,
				new Boolean(false)
			];
			for (const value of values) {
				assert.isTrue(isFalse(value));
			}
		});

		it('returns `false` when called with anything other than `false`', () => {
			const values = [
				'hi',
				[],
				{},
				0,
				1,
				true,
				null,
				undefined
			];
			for (const value of values) {
				assert.isFalse(isFalse(value));
			}
		});

	});

});
