'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-equal', () => {
	let isEqual;

	beforeEach(() => {
		isEqual = require('../../../../lib/verify/is-equal');
	});

	it('exports a function', () => {
		assert.isFunction(isEqual);
	});

	describe('isEqual(value1, value2)', () => {

		it('returns `true` when the specified values are equal', () => {
			const values = [
				['', false],
				['hi', 'hi'],
				[1, 1],
				[1, true],
				[true, true]
			];
			for (const [value1, value2] of values) {
				assert.isTrue(isEqual(value1, value2));
			}
		});

		it('returns `false` when the specified values are not equal', () => {
			const values = [
				['', true],
				['hi', 'hello'],
				[1, 2],
				[1, false],
				[true, false]
			];
			for (const [value1, value2] of values) {
				assert.isFalse(isEqual(value1, value2));
			}
		});

	});

});
