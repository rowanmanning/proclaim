'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-null', () => {
	let AssertionError;
	let assertIsNull;
	let isNull;

	beforeEach(() => {
		isNull = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-null', isNull);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsNull = require('../../../../lib/assert/is-null');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsNull);
	});

	describe('assertIsNull(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsNull('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-null` with the values', () => {
			assert.calledOnce(isNull);
			assert.calledWithExactly(isNull, 'mock-value');
		});

		describe('when the value is null', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is not null', () => {

			beforeEach(() => {
				try {
					isNull.returns(false);
					assertIsNull('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'string');
				assert.strictEqual(caughtError.operator, '===');
				assert.strictEqual(caughtError.expected, 'null');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsNull('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to be null');
				});

			});

		});

	});

});
