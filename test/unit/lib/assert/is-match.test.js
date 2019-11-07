'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-match', () => {
	let AssertionError;
	let assertIsMatch;
	let isMatch;

	beforeEach(() => {
		isMatch = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-match', isMatch);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsMatch = require('../../../../lib/assert/is-match');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsMatch);
	});

	describe('assertIsMatch(value, regExp, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsMatch('mock-value', /mock-regexp/, 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-match` with the values', () => {
			assert.calledOnce(isMatch);
			assert.calledWithExactly(isMatch, 'mock-value', /mock-regexp/);
		});

		describe('when the value matches the regular expression', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value does not match the regular expression', () => {

			beforeEach(() => {
				try {
					isMatch.returns(false);
					assertIsMatch('mock-value', /mock-regexp/, 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value');
				assert.strictEqual(caughtError.operator, 'match');
				assert.instanceOf(caughtError.expected, RegExp);
				assert.strictEqual(caughtError.expected.toString(), '/mock-regexp/');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsMatch('mock-value', /mock-regexp/);
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to match /mock-regexp/');
				});

			});

		});

	});

});
