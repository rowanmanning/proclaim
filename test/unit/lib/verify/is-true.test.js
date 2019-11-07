/* eslint-disable no-new-wrappers */
'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-true', () => {
	let isTrue;

	beforeEach(() => {
		isTrue = require('../../../../lib/verify/is-true');
	});

	it('exports a function', () => {
		assert.isFunction(isTrue);
	});

	describe('isTrue(value)', () => {

		it('returns `true` when called with `true`', () => {
			const values = [
				true,
				new Boolean(true)
			];
			for (const value of values) {
				assert.isTrue(isTrue(value));
			}
		});

		it('returns `false` when called with anything other than `true`', () => {
			const values = [
				'hi',
				[],
				{},
				0,
				1,
				false,
				null,
				undefined
			];
			for (const value of values) {
				assert.isFalse(isTrue(value));
			}
		});

	});

});
