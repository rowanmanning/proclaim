'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-greater-than-or-equal', () => {
	let AssertionError;
	let assertIsGreaterThanOrEqual;
	let isGreaterThanOrEqual;

	beforeEach(() => {
		isGreaterThanOrEqual = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-greater-than-or-equal', isGreaterThanOrEqual);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsGreaterThanOrEqual = require('../../../../lib/assert/is-greater-than-or-equal');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsGreaterThanOrEqual);
	});

	describe('assertIsGreaterThanOrEqual(value1, value2, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsGreaterThanOrEqual('mock-value-1', 'mock-value-2', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-greater-than-or-equal` with the values', () => {
			assert.calledOnce(isGreaterThanOrEqual);
			assert.calledWithExactly(isGreaterThanOrEqual, 'mock-value-1', 'mock-value-2');
		});

		describe('when value1 is greater than or equal to value2', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when value1 is not greater than or equal to value2', () => {

			beforeEach(() => {
				try {
					isGreaterThanOrEqual.returns(false);
					assertIsGreaterThanOrEqual('mock-value-1', 'mock-value-2', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value-1');
				assert.strictEqual(caughtError.operator, '>=');
				assert.strictEqual(caughtError.expected, 'mock-value-2');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsGreaterThanOrEqual('mock-value-1', 'mock-value-2');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value-1" to be greater than or equal to "mock-value-2"');
				});

			});

		});

	});

});
