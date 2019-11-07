'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-not-boolean', () => {
	let AssertionError;
	let assertIsNotBoolean;
	let isBoolean;

	beforeEach(() => {
		isBoolean = sinon.stub().returns(false);
		mockery.registerMock('../verify/is-boolean', isBoolean);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsNotBoolean = require('../../../../lib/assert/is-not-boolean');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsNotBoolean);
	});

	describe('assertIsNotBoolean(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsNotBoolean('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-boolean` with the values', () => {
			assert.calledOnce(isBoolean);
			assert.calledWithExactly(isBoolean, 'mock-value');
		});

		describe('when the value is not a boolean', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is a boolean', () => {

			beforeEach(() => {
				try {
					isBoolean.returns(true);
					assertIsNotBoolean('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'string');
				assert.strictEqual(caughtError.operator, '!==');
				assert.strictEqual(caughtError.expected, 'boolean');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsNotBoolean('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to not be a boolean');
				});

			});

		});

	});

});
