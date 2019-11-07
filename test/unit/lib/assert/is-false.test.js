'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-false', () => {
	let AssertionError;
	let assertIsFalse;
	let isFalse;

	beforeEach(() => {
		isFalse = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-false', isFalse);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsFalse = require('../../../../lib/assert/is-false');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsFalse);
	});

	describe('assertIsFalse(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsFalse('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-false` with the values', () => {
			assert.calledOnce(isFalse);
			assert.calledWithExactly(isFalse, 'mock-value');
		});

		describe('when the value is false', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is not false', () => {

			beforeEach(() => {
				try {
					isFalse.returns(false);
					assertIsFalse('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value');
				assert.strictEqual(caughtError.operator, '===');
				assert.strictEqual(caughtError.expected, false);
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsFalse('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to be false');
				});

			});

		});

	});

});
