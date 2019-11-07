'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-not-match', () => {
	let AssertionError;
	let assertIsNotMatch;
	let isMatch;

	beforeEach(() => {
		isMatch = sinon.stub().returns(false);
		mockery.registerMock('../verify/is-match', isMatch);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsNotMatch = require('../../../../lib/assert/is-not-match');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsNotMatch);
	});

	describe('assertIsNotMatch(value, regExp, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsNotMatch('mock-value', /mock-regexp/, 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-match` with the values', () => {
			assert.calledOnce(isMatch);
			assert.calledWithExactly(isMatch, 'mock-value', /mock-regexp/);
		});

		describe('when the value does not match the regular expression', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value matches the regular expression', () => {

			beforeEach(() => {
				try {
					isMatch.returns(true);
					assertIsNotMatch('mock-value', /mock-regexp/, 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value');
				assert.strictEqual(caughtError.operator, '!match');
				assert.instanceOf(caughtError.expected, RegExp);
				assert.strictEqual(caughtError.expected.toString(), '/mock-regexp/');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsNotMatch('mock-value', /mock-regexp/);
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to not match /mock-regexp/');
				});

			});

		});

	});

});
