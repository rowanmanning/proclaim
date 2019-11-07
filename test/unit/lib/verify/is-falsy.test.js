/* eslint-disable no-new-wrappers */
'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-falsy', () => {
	let isFalsy;

	beforeEach(() => {
		isFalsy = require('../../../../lib/verify/is-falsy');
	});

	it('exports a function', () => {
		assert.isFunction(isFalsy);
	});

	describe('isFalsy(value)', () => {

		it('returns `true` when called with a falsy value', () => {
			const values = [
				'',
				0,
				false,
				null,
				undefined
			];
			for (const value of values) {
				assert.isTrue(isFalsy(value));
			}
		});

		it('returns `false` when called with a truthy value', () => {
			const values = [
				'hi',
				[],
				{},
				1,
				true
			];
			for (const value of values) {
				assert.isFalse(isFalsy(value));
			}
		});

	});

});
