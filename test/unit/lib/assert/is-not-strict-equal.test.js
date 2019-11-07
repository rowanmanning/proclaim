'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-not-strict-equal', () => {
	let AssertionError;
	let assertIsNotStrictEqual;
	let isStrictEqual;

	beforeEach(() => {
		isStrictEqual = sinon.stub().returns(false);
		mockery.registerMock('../verify/is-strict-equal', isStrictEqual);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsNotStrictEqual = require('../../../../lib/assert/is-not-strict-equal');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsNotStrictEqual);
	});

	describe('assertIsNotStrictEqual(value1, value2, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsNotStrictEqual('mock-value-1', 'mock-value-2', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-strict-equal` with the values', () => {
			assert.calledOnce(isStrictEqual);
			assert.calledWithExactly(isStrictEqual, 'mock-value-1', 'mock-value-2');
		});

		describe('when the values are not strictly equal', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the values are strictly equal', () => {

			beforeEach(() => {
				try {
					isStrictEqual.returns(true);
					assertIsNotStrictEqual('mock-value-1', 'mock-value-2', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value-1');
				assert.strictEqual(caughtError.operator, '!==');
				assert.strictEqual(caughtError.expected, 'mock-value-2');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsNotStrictEqual('mock-value-1', 'mock-value-2');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value-1" to not strictly equal "mock-value-2"');
				});

			});

		});

	});

});
