'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-number', () => {
	let AssertionError;
	let assertIsNumber;
	let isNumber;

	beforeEach(() => {
		isNumber = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-number', isNumber);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsNumber = require('../../../../lib/assert/is-number');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsNumber);
	});

	describe('assertIsNumber(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsNumber('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-number` with the values', () => {
			assert.calledOnce(isNumber);
			assert.calledWithExactly(isNumber, 'mock-value');
		});

		describe('when the value is a number', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is not a number', () => {

			beforeEach(() => {
				try {
					isNumber.returns(false);
					assertIsNumber('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'string');
				assert.strictEqual(caughtError.operator, '===');
				assert.strictEqual(caughtError.expected, 'number');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsNumber('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to be a number');
				});

			});

		});

	});

});
