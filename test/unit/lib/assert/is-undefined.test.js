'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-undefined', () => {
	let AssertionError;
	let assertIsUndefined;
	let isUndefined;

	beforeEach(() => {
		isUndefined = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-undefined', isUndefined);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsUndefined = require('../../../../lib/assert/is-undefined');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsUndefined);
	});

	describe('assertIsUndefined(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsUndefined('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-undefined` with the values', () => {
			assert.calledOnce(isUndefined);
			assert.calledWithExactly(isUndefined, 'mock-value');
		});

		describe('when the value is undefined', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is not undefined', () => {

			beforeEach(() => {
				try {
					isUndefined.returns(false);
					assertIsUndefined('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value');
				assert.strictEqual(caughtError.operator, '===');
				assert.strictEqual(caughtError.expected, undefined);
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsUndefined('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to be undefined');
				});

			});

		});

	});

});
