/* eslint-disable no-array-constructor */
'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-array', () => {
	let isArray;

	beforeEach(() => {
		isArray = require('../../../../lib/verify/is-array');
	});

	it('exports a function', () => {
		assert.isFunction(isArray);
	});

	describe('isArray(value)', () => {

		it('returns `true` when called with an array', () => {
			const values = [
				[],
				[1, 2, 3],
				new Array()
			];
			for (const value of values) {
				assert.isTrue(isArray(value));
			}
		});

		it('returns `false` when called with a non-array', () => {
			const values = [
				'hi',
				{},
				1,
				false,
				new Map(),
				new Set(),
				null,
				true
			];
			for (const value of values) {
				assert.isFalse(isArray(value));
			}
		});

	});

});
