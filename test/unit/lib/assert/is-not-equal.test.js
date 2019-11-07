'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-not-equal', () => {
	let AssertionError;
	let assertIsNotEqual;
	let isEqual;

	beforeEach(() => {
		isEqual = sinon.stub().returns(false);
		mockery.registerMock('../verify/is-equal', isEqual);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsNotEqual = require('../../../../lib/assert/is-not-equal');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsNotEqual);
	});

	describe('assertIsNotEqual(value1, value2, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsNotEqual('mock-value-1', 'mock-value-2', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-equal` with the values', () => {
			assert.calledOnce(isEqual);
			assert.calledWithExactly(isEqual, 'mock-value-1', 'mock-value-2');
		});

		describe('when the values are not equal', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the values are equal', () => {

			beforeEach(() => {
				try {
					isEqual.returns(true);
					assertIsNotEqual('mock-value-1', 'mock-value-2', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value-1');
				assert.strictEqual(caughtError.operator, '!=');
				assert.strictEqual(caughtError.expected, 'mock-value-2');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsNotEqual('mock-value-1', 'mock-value-2');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value-1" to not equal "mock-value-2"');
				});

			});

		});

	});

});
