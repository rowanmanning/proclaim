'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-defined', () => {
	let isDefined;

	beforeEach(() => {
		isDefined = require('../../../../lib/verify/is-defined');
	});

	it('exports a function', () => {
		assert.isFunction(isDefined);
	});

	describe('isDefined(value)', () => {

		it('returns `true` when called with anything other than `undefined`', () => {
			const values = [
				'',
				[],
				{},
				0,
				false,
				null
			];
			for (const value of values) {
				assert.isTrue(isDefined(value));
			}
		});

		it('returns `false` when called with `undefined`', () => {
			const values = [
				undefined
			];
			for (const value of values) {
				assert.isFalse(isDefined(value));
			}
		});

	});

});
