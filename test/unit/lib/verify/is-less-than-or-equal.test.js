'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-less-than-or-equal', () => {
	let isLessThanOrEqual;

	beforeEach(() => {
		isLessThanOrEqual = require('../../../../lib/verify/is-less-than-or-equal');
	});

	it('exports a function', () => {
		assert.isFunction(isLessThanOrEqual);
	});

	describe('isLessThanOrEqual(value1, value2)', () => {

		it('returns `true` when value1 is less than or equal to value2', () => {
			const values = [
				[-1, 0],
				[-2, -1],
				[0, Infinity],
				[1, 1],
				[1, 2],
				[Infinity, Infinity]
			];
			for (const [value1, value2] of values) {
				assert.isTrue(isLessThanOrEqual(value1, value2));
			}
		});

		it('returns `false` when value1 is not less than or equal to value2', () => {
			const values = [
				[-1, -2],
				[0, -1],
				[2, 1],
				[Infinity, 0]
			];
			for (const [value1, value2] of values) {
				assert.isFalse(isLessThanOrEqual(value1, value2));
			}
		});

	});

});
