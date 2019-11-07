'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-not-instance', () => {
	let AssertionError;
	let assertIsNotInstance;
	let isInstance;

	beforeEach(() => {
		isInstance = sinon.stub().returns(false);
		mockery.registerMock('../verify/is-instance', isInstance);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsNotInstance = require('../../../../lib/assert/is-not-instance');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsNotInstance);
	});

	describe('assertIsNotInstance(value, constructor, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsNotInstance('mock-value', 'mock-constructor', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-instance` with the values', () => {
			assert.calledOnce(isInstance);
			assert.calledWithExactly(isInstance, 'mock-value', 'mock-constructor');
		});

		describe('when the value is not an instance of constructor', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is an instance of constructor', () => {

			beforeEach(() => {
				try {
					isInstance.returns(true);
					assertIsNotInstance('mock-value', 'mock-constructor', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value');
				assert.strictEqual(caughtError.operator, '!instanceof');
				assert.strictEqual(caughtError.expected, 'mock-constructor');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsNotInstance('mock-value', 'mock-constructor');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to not be an instance of "mock-constructor"');
				});

			});

		});

	});

});
