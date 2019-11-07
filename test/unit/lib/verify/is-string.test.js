/* eslint-disable no-new-wrappers */
'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-string', () => {
	let isString;

	beforeEach(() => {
		isString = require('../../../../lib/verify/is-string');
	});

	it('exports a function', () => {
		assert.isFunction(isString);
	});

	describe('isString(value)', () => {

		it('returns `true` when called with a string', () => {
			const values = [
				'',
				'hello',
				'hi',
				new String('hello'),
				new String('hi')
			];
			for (const value of values) {
				assert.isTrue(isString(value));
			}
		});

		it('returns `false` when called with a non-string', () => {
			const values = [
				[],
				{},
				1,
				null,
				true,
				undefined
			];
			for (const value of values) {
				assert.isFalse(isString(value));
			}
		});

	});

});
