'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-instance', () => {
	let AssertionError;
	let assertIsInstance;
	let isInstance;

	beforeEach(() => {
		isInstance = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-instance', isInstance);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsInstance = require('../../../../lib/assert/is-instance');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsInstance);
	});

	describe('assertIsInstance(value, constructor, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsInstance('mock-value', 'mock-constructor', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-instance` with the values', () => {
			assert.calledOnce(isInstance);
			assert.calledWithExactly(isInstance, 'mock-value', 'mock-constructor');
		});

		describe('when the value is an instance of constructor', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is not an instance of constructor', () => {

			beforeEach(() => {
				try {
					isInstance.returns(false);
					assertIsInstance('mock-value', 'mock-constructor', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value');
				assert.strictEqual(caughtError.operator, 'instanceof');
				assert.strictEqual(caughtError.expected, 'mock-constructor');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsInstance('mock-value', 'mock-constructor');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to be an instance of "mock-constructor"');
				});

			});

		});

	});

});
