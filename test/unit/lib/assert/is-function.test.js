'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-function', () => {
	let AssertionError;
	let assertIsFunction;
	let isFunction;

	beforeEach(() => {
		isFunction = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-function', isFunction);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsFunction = require('../../../../lib/assert/is-function');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsFunction);
	});

	describe('assertIsFunction(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsFunction('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-function` with the values', () => {
			assert.calledOnce(isFunction);
			assert.calledWithExactly(isFunction, 'mock-value');
		});

		describe('when the value is a function', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is not a function', () => {

			beforeEach(() => {
				try {
					isFunction.returns(false);
					assertIsFunction('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'string');
				assert.strictEqual(caughtError.operator, '===');
				assert.strictEqual(caughtError.expected, 'function');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsFunction('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to be a function');
				});

			});

		});

	});

});
