'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-not-string', () => {
	let AssertionError;
	let assertIsNotString;
	let isString;

	beforeEach(() => {
		isString = sinon.stub().returns(false);
		mockery.registerMock('../verify/is-string', isString);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsNotString = require('../../../../lib/assert/is-not-string');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsNotString);
	});

	describe('assertIsNotString(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsNotString('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-string` with the values', () => {
			assert.calledOnce(isString);
			assert.calledWithExactly(isString, 'mock-value');
		});

		describe('when the value is not a string', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is a string', () => {

			beforeEach(() => {
				try {
					isString.returns(true);
					assertIsNotString('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'string');
				assert.strictEqual(caughtError.operator, '!==');
				assert.strictEqual(caughtError.expected, 'string');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsNotString('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to not be a string');
				});

			});

		});

	});

});
