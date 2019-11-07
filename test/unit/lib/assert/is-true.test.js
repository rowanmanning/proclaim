'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-true', () => {
	let AssertionError;
	let assertIsTrue;
	let isTrue;

	beforeEach(() => {
		isTrue = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-true', isTrue);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsTrue = require('../../../../lib/assert/is-true');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsTrue);
	});

	describe('assertIsTrue(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsTrue('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-true` with the values', () => {
			assert.calledOnce(isTrue);
			assert.calledWithExactly(isTrue, 'mock-value');
		});

		describe('when the value is true', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is not true', () => {

			beforeEach(() => {
				try {
					isTrue.returns(false);
					assertIsTrue('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value');
				assert.strictEqual(caughtError.operator, '===');
				assert.strictEqual(caughtError.expected, true);
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsTrue('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to be true');
				});

			});

		});

	});

});
