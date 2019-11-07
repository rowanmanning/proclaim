/* eslint-disable no-new-wrappers */
'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-truthy', () => {
	let isTruthy;

	beforeEach(() => {
		isTruthy = require('../../../../lib/verify/is-truthy');
	});

	it('exports a function', () => {
		assert.isFunction(isTruthy);
	});

	describe('isTruthy(value)', () => {

		it('returns `true` when called with a truthy value', () => {
			const values = [
				'hi',
				[],
				{},
				1,
				true
			];
			for (const value of values) {
				assert.isTrue(isTruthy(value));
			}
		});

		it('returns `false` when called with a falsy value', () => {
			const values = [
				'',
				0,
				false,
				null,
				undefined
			];
			for (const value of values) {
				assert.isFalse(isTruthy(value));
			}
		});

	});

});
