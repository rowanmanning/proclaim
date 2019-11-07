/* eslint-disable no-new-wrappers */
'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-null', () => {
	let isNull;

	beforeEach(() => {
		isNull = require('../../../../lib/verify/is-null');
	});

	it('exports a function', () => {
		assert.isFunction(isNull);
	});

	describe('isNull(value)', () => {

		it('returns `true` when called with `null`', () => {
			const values = [
				null
			];
			for (const value of values) {
				assert.isTrue(isNull(value));
			}
		});

		it('returns `false` when called with anything other than `null`', () => {
			const values = [
				[],
				{},
				0,
				false,
				undefined
			];
			for (const value of values) {
				assert.isFalse(isNull(value));
			}
		});

	});

});
