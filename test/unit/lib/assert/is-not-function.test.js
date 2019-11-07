'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-not-function', () => {
	let AssertionError;
	let assertIsNotFunction;
	let isFunction;

	beforeEach(() => {
		isFunction = sinon.stub().returns(false);
		mockery.registerMock('../verify/is-function', isFunction);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsNotFunction = require('../../../../lib/assert/is-not-function');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsNotFunction);
	});

	describe('assertIsNotFunction(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsNotFunction('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-function` with the values', () => {
			assert.calledOnce(isFunction);
			assert.calledWithExactly(isFunction, 'mock-value');
		});

		describe('when the value is not a function', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is a function', () => {

			beforeEach(() => {
				try {
					isFunction.returns(true);
					assertIsNotFunction('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'string');
				assert.strictEqual(caughtError.operator, '!==');
				assert.strictEqual(caughtError.expected, 'function');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsNotFunction('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to not be a function');
				});

			});

		});

	});

});
