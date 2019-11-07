'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-boolean', () => {
	let AssertionError;
	let assertIsBoolean;
	let isBoolean;

	beforeEach(() => {
		isBoolean = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-boolean', isBoolean);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsBoolean = require('../../../../lib/assert/is-boolean');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsBoolean);
	});

	describe('assertIsBoolean(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsBoolean('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-boolean` with the values', () => {
			assert.calledOnce(isBoolean);
			assert.calledWithExactly(isBoolean, 'mock-value');
		});

		describe('when the value is a boolean', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is not a boolean', () => {

			beforeEach(() => {
				try {
					isBoolean.returns(false);
					assertIsBoolean('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'string');
				assert.strictEqual(caughtError.operator, '===');
				assert.strictEqual(caughtError.expected, 'boolean');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsBoolean('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to be a boolean');
				});

			});

		});

	});

});
