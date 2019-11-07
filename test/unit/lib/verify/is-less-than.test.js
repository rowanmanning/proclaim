'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-less-than', () => {
	let isLessThan;

	beforeEach(() => {
		isLessThan = require('../../../../lib/verify/is-less-than');
	});

	it('exports a function', () => {
		assert.isFunction(isLessThan);
	});

	describe('isLessThan(value1, value2)', () => {

		it('returns `true` when value1 is less than value2', () => {
			const values = [
				[-1, 0],
				[-2, -1],
				[0, Infinity],
				[1, 2]
			];
			for (const [value1, value2] of values) {
				assert.isTrue(isLessThan(value1, value2));
			}
		});

		it('returns `false` when value1 is not less than value2', () => {
			const values = [
				[-1, -2],
				[0, -1],
				[1, 1],
				[2, 1],
				[Infinity, 0],
				[Infinity, Infinity]
			];
			for (const [value1, value2] of values) {
				assert.isFalse(isLessThan(value1, value2));
			}
		});

	});

});
