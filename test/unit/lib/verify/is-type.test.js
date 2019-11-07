'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-type', () => {
	let isType;

	beforeEach(() => {
		isType = require('../../../../lib/verify/is-type');
	});

	it('exports a function', () => {
		assert.isFunction(isType);
	});

	describe('isType(value, type)', () => {

		it('returns `true` when the specified value is of the specified type', () => {
			const values = [
				['', 'string'],
				[[], 'object'],
				[{}, 'object'],
				[1, 'number'],
				[null, 'object'],
				[true, 'boolean'],
				[undefined, 'undefined']
			];
			for (const [value, type] of values) {
				assert.isTrue(isType(value, type));
			}
		});

		it('returns `false` when the specified value is not of the specified type', () => {
			const values = [
				['', 'object'],
				[[], 'string'],
				[{}, 'number'],
				[1, 'object'],
				[null, 'undefined'],
				[true, 'object'],
				[undefined, 'object']
			];
			for (const [value, type] of values) {
				assert.isFalse(isType(value, type));
			}
		});

	});

});
