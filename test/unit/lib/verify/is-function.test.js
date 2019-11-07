/* eslint-disable no-new-func */
'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-function', () => {
	let isFunction;

	beforeEach(() => {
		isFunction = require('../../../../lib/verify/is-function');
	});

	it('exports a function', () => {
		assert.isFunction(isFunction);
	});

	describe('isFunction(value)', () => {

		it('returns `true` when called with a function', () => {
			const values = [
				() => {},
				function() {},
				class Example {},
				new Function(),
				Math.random
			];
			for (const value of values) {
				assert.isTrue(isFunction(value));
			}
		});

		it('returns `false` when called with a non-function', () => {
			const values = [
				[],
				{},
				1,
				null,
				true,
				undefined
			];
			for (const value of values) {
				assert.isFalse(isFunction(value));
			}
		});

	});

});
