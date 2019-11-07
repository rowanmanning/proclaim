'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-strict-equal', () => {
	let isStrictEqual;

	beforeEach(() => {
		isStrictEqual = require('../../../../lib/verify/is-strict-equal');
	});

	it('exports a function', () => {
		assert.isFunction(isStrictEqual);
	});

	describe('isStrictEqual(value1, value2)', () => {

		it('returns `true` when the specified values are strictly equal', () => {
			const values = [
				['', ''],
				['hi', 'hi'],
				[1, 1],
				[false, false],
				[true, true]
			];
			for (const [value1, value2] of values) {
				assert.isTrue(isStrictEqual(value1, value2));
			}
		});

		it('returns `false` when the specified values are not strictly equal', () => {
			const values = [
				['', false],
				['', true],
				['hi', 'hello'],
				[[], []],
				[{}, {}],
				[1, 2],
				[1, false],
				[1, true],
				[true, false]
			];
			for (const [value1, value2] of values) {
				assert.isFalse(isStrictEqual(value1, value2));
			}
		});

	});

});
