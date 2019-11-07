/* eslint-disable no-new-wrappers */
'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-object', () => {
	let isObject;

	beforeEach(() => {
		isObject = require('../../../../lib/verify/is-object');
	});

	it('exports a function', () => {
		assert.isFunction(isObject);
	});

	describe('isObject(value)', () => {

		it('returns `true` when called with an object', () => {
			const values = [
				[],
				{},
				new Boolean(),
				new Date(),
				null
			];
			for (const value of values) {
				assert.isTrue(isObject(value));
			}
		});

		it('returns `false` when called with a non-object', () => {
			const values = [
				'hi',
				true,
				undefined
			];
			for (const value of values) {
				assert.isFalse(isObject(value));
			}
		});

	});

});
