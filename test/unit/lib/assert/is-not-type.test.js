'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-not-type', () => {
	let AssertionError;
	let assertIsNotType;
	let isType;

	beforeEach(() => {
		isType = sinon.stub().returns(false);
		mockery.registerMock('../verify/is-type', isType);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsNotType = require('../../../../lib/assert/is-not-type');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsNotType);
	});

	describe('assertIsNotType(value, type, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsNotType('mock-value', 'mock-type', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-type` with the values', () => {
			assert.calledOnce(isType);
			assert.calledWithExactly(isType, 'mock-value', 'mock-type');
		});

		describe('when the value\'s type is not equal to type', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value\'s type is equal to type', () => {

			beforeEach(() => {
				try {
					isType.returns(true);
					assertIsNotType('mock-value', 'mock-type', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'string');
				assert.strictEqual(caughtError.operator, '!==');
				assert.strictEqual(caughtError.expected, 'mock-type');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsNotType('mock-value', 'mock-type');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to not be of type mock-type');
				});

			});

		});

	});

});
