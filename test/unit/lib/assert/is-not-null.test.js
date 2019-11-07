'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-not-null', () => {
	let AssertionError;
	let assertIsNotNull;
	let isNull;

	beforeEach(() => {
		isNull = sinon.stub().returns(false);
		mockery.registerMock('../verify/is-null', isNull);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsNotNull = require('../../../../lib/assert/is-not-null');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsNotNull);
	});

	describe('assertIsNotNull(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsNotNull('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-null` with the values', () => {
			assert.calledOnce(isNull);
			assert.calledWithExactly(isNull, 'mock-value');
		});

		describe('when the value is not null', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is null', () => {

			beforeEach(() => {
				try {
					isNull.returns(true);
					assertIsNotNull('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'string');
				assert.strictEqual(caughtError.operator, '!==');
				assert.strictEqual(caughtError.expected, 'null');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsNotNull('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to not be null');
				});

			});

		});

	});

});
