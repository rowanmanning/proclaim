'use strict';

const assert = require('../../../../lib/proclaim');

describe('lib/verify/is-match', () => {
	let isMatch;

	beforeEach(() => {
		isMatch = require('../../../../lib/verify/is-match');
	});

	it('exports a function', () => {
		assert.isFunction(isMatch);
	});

	describe('isMatch(value, regExp)', () => {

		it('returns `true` when value matches the regular expression', () => {
			const values = [
				['hello', /^hello|hi$/],
				['a', /[abc]/]
			];
			for (const [value, regExp] of values) {
				assert.isTrue(isMatch(value, regExp));
			}
		});

		it('returns `false` when value does not match the regular expression', () => {
			const values = [
				['bonjour', /^hello|hi$/],
				['d', /[abc]/]
			];
			for (const [value, regExp] of values) {
				assert.isFalse(isMatch(value, regExp));
			}
		});

	});

	describe('isMatch(value, string)', () => {

		it('returns `true` when value is equal to the string', () => {
			const values = [
				['hello', 'hello'],
				['a', 'a']
			];
			for (const [value, string] of values) {
				assert.isTrue(isMatch(value, string));
			}
		});

		it('returns `false` when value is not equal to the string', () => {
			const values = [
				['bonjour', 'hello'],
				['d', 'a']
			];
			for (const [value, string] of values) {
				assert.isFalse(isMatch(value, string));
			}
		});

	});

});
