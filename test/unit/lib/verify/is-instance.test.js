'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-instance', () => {
	let isInstance;

	beforeEach(() => {
		isInstance = require('../../../../lib/verify/is-instance');
	});

	it('exports a function', () => {
		assert.isFunction(isInstance);
	});

	describe('isInstance(value, constructor)', () => {

		it('returns `true` when the specified value is an instance of the specified constructor', () => {
			const values = [
				[new Error(), Error],
				[new Date(), Date],
				[[], Array],
				[[], Object]
			];
			for (const [value, constructor] of values) {
				assert.isTrue(isInstance(value, constructor));
			}
		});

		it('returns `false` when the specified value is not an instance of the specified constructor', () => {
			const values = [
				[[], Error],
				[new Date(), Array],
				[new Date(), undefined],
				[new Date(), 'hi']
			];
			for (const [value, constructor] of values) {
				assert.isFalse(isInstance(value, constructor));
			}
		});

	});

});
