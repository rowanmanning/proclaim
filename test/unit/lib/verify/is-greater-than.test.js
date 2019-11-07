'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-greater-than', () => {
	let isGreaterThan;

	beforeEach(() => {
		isGreaterThan = require('../../../../lib/verify/is-greater-than');
	});

	it('exports a function', () => {
		assert.isFunction(isGreaterThan);
	});

	describe('isGreaterThan(value1, value2)', () => {

		it('returns `true` when value1 is greater than value2', () => {
			const values = [
				[-1, -2],
				[0, -1],
				[2, 1],
				[Infinity, 0]
			];
			for (const [value1, value2] of values) {
				assert.isTrue(isGreaterThan(value1, value2));
			}
		});

		it('returns `false` when value1 is not greater than value2', () => {
			const values = [
				[-1, 0],
				[-2, -1],
				[0, Infinity],
				[1, 1],
				[1, 2],
				[Infinity, Infinity]
			];
			for (const [value1, value2] of values) {
				assert.isFalse(isGreaterThan(value1, value2));
			}
		});

	});

});
