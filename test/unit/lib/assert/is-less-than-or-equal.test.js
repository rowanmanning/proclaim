'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-less-than-or-equal', () => {
	let AssertionError;
	let assertIsLessThanOrEqual;
	let isLessThanOrEqual;

	beforeEach(() => {
		isLessThanOrEqual = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-less-than-or-equal', isLessThanOrEqual);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsLessThanOrEqual = require('../../../../lib/assert/is-less-than-or-equal');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsLessThanOrEqual);
	});

	describe('assertIsLessThanOrEqual(value1, value2, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsLessThanOrEqual('mock-value-1', 'mock-value-2', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-less-than-or-equal` with the values', () => {
			assert.calledOnce(isLessThanOrEqual);
			assert.calledWithExactly(isLessThanOrEqual, 'mock-value-1', 'mock-value-2');
		});

		describe('when value1 is less than or equal to value2', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when value1 is not less than or equal to value2', () => {

			beforeEach(() => {
				try {
					isLessThanOrEqual.returns(false);
					assertIsLessThanOrEqual('mock-value-1', 'mock-value-2', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value-1');
				assert.strictEqual(caughtError.operator, '<=');
				assert.strictEqual(caughtError.expected, 'mock-value-2');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsLessThanOrEqual('mock-value-1', 'mock-value-2');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value-1" to be less than or equal to "mock-value-2"');
				});

			});

		});

	});

});
