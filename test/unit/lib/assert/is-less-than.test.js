'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-less-than', () => {
	let AssertionError;
	let assertIsLessThan;
	let isLessThan;

	beforeEach(() => {
		isLessThan = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-less-than', isLessThan);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsLessThan = require('../../../../lib/assert/is-less-than');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsLessThan);
	});

	describe('assertIsLessThan(value1, value2, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsLessThan('mock-value-1', 'mock-value-2', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-less-than` with the values', () => {
			assert.calledOnce(isLessThan);
			assert.calledWithExactly(isLessThan, 'mock-value-1', 'mock-value-2');
		});

		describe('when value1 is less than value2', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when value1 is not less than value2', () => {

			beforeEach(() => {
				try {
					isLessThan.returns(false);
					assertIsLessThan('mock-value-1', 'mock-value-2', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value-1');
				assert.strictEqual(caughtError.operator, '<');
				assert.strictEqual(caughtError.expected, 'mock-value-2');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsLessThan('mock-value-1', 'mock-value-2');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value-1" to be less than "mock-value-2"');
				});

			});

		});

	});

});
