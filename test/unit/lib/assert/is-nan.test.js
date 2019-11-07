'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-nan', () => {
	let AssertionError;
	let assertIsNaN;
	let isNaN;

	beforeEach(() => {
		isNaN = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-nan', isNaN);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsNaN = require('../../../../lib/assert/is-nan');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsNaN);
	});

	describe('assertIsNaN(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsNaN('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-nan` with the values', () => {
			assert.calledOnce(isNaN);
			assert.calledWithExactly(isNaN, 'mock-value');
		});

		describe('when the value is nan', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is not nan', () => {

			beforeEach(() => {
				try {
					isNaN.returns(false);
					assertIsNaN('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value');
				assert.strictEqual(caughtError.operator, '===');
				assert.isNaN(caughtError.expected);
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsNaN('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to be NaN');
				});

			});

		});

	});

});
