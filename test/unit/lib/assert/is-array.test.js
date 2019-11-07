'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-array', () => {
	let AssertionError;
	let assertIsArray;
	let isArray;

	beforeEach(() => {
		isArray = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-array', isArray);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsArray = require('../../../../lib/assert/is-array');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsArray);
	});

	describe('assertIsArray(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsArray('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-array` with the values', () => {
			assert.calledOnce(isArray);
			assert.calledWithExactly(isArray, 'mock-value');
		});

		describe('when the value is an array', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is not an array', () => {

			beforeEach(() => {
				try {
					isArray.returns(false);
					assertIsArray('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'string');
				assert.strictEqual(caughtError.operator, '===');
				assert.strictEqual(caughtError.expected, 'array');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsArray('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to be an array');
				});

			});

		});

	});

});
