'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-truthy', () => {
	let AssertionError;
	let assertIsTruthy;
	let isTruthy;

	beforeEach(() => {
		isTruthy = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-truthy', isTruthy);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsTruthy = require('../../../../lib/assert/is-truthy');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsTruthy);
	});

	describe('assertIsTruthy(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsTruthy('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-truthy` with the values', () => {
			assert.calledOnce(isTruthy);
			assert.calledWithExactly(isTruthy, 'mock-value');
		});

		describe('when the value is truthy', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is not truthy', () => {

			beforeEach(() => {
				try {
					isTruthy.returns(false);
					assertIsTruthy('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value');
				assert.strictEqual(caughtError.operator, '==');
				assert.strictEqual(caughtError.expected, true);
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsTruthy('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to be truthy');
				});

			});

		});

	});

});
