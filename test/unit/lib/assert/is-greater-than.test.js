'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-greater-than', () => {
	let AssertionError;
	let assertIsGreaterThan;
	let isGreaterThan;

	beforeEach(() => {
		isGreaterThan = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-greater-than', isGreaterThan);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsGreaterThan = require('../../../../lib/assert/is-greater-than');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsGreaterThan);
	});

	describe('assertIsGreaterThan(value1, value2, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsGreaterThan('mock-value-1', 'mock-value-2', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-greater-than` with the values', () => {
			assert.calledOnce(isGreaterThan);
			assert.calledWithExactly(isGreaterThan, 'mock-value-1', 'mock-value-2');
		});

		describe('when value1 is greater than value2', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when value1 is not greater than value2', () => {

			beforeEach(() => {
				try {
					isGreaterThan.returns(false);
					assertIsGreaterThan('mock-value-1', 'mock-value-2', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value-1');
				assert.strictEqual(caughtError.operator, '>');
				assert.strictEqual(caughtError.expected, 'mock-value-2');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsGreaterThan('mock-value-1', 'mock-value-2');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value-1" to be greater than "mock-value-2"');
				});

			});

		});

	});

});
