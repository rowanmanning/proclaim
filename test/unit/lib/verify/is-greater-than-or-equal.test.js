'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-greater-than-or-equal', () => {
	let isGreaterThanOrEqual;

	beforeEach(() => {
		isGreaterThanOrEqual = require('../../../../lib/verify/is-greater-than-or-equal');
	});

	it('exports a function', () => {
		assert.isFunction(isGreaterThanOrEqual);
	});

	describe('isGreaterThanOrEqual(value1, value2)', () => {

		it('returns `true` when value1 is greater than or equal to value2', () => {
			const values = [
				[-1, -2],
				[0, -1],
				[1, 1],
				[2, 1],
				[Infinity, 0],
				[Infinity, Infinity]
			];
			for (const [value1, value2] of values) {
				assert.isTrue(isGreaterThanOrEqual(value1, value2));
			}
		});

		it('returns `false` when value1 is not greater than or equal to value2', () => {
			const values = [
				[-1, 0],
				[-2, -1],
				[0, Infinity],
				[1, 2]
			];
			for (const [value1, value2] of values) {
				assert.isFalse(isGreaterThanOrEqual(value1, value2));
			}
		});

	});

});
