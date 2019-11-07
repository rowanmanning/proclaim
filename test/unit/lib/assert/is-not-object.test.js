'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-not-object', () => {
	let AssertionError;
	let assertIsNotObject;
	let isObject;

	beforeEach(() => {
		isObject = sinon.stub().returns(false);
		mockery.registerMock('../verify/is-object', isObject);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsNotObject = require('../../../../lib/assert/is-not-object');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsNotObject);
	});

	describe('assertIsNotObject(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsNotObject('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-object` with the values', () => {
			assert.calledOnce(isObject);
			assert.calledWithExactly(isObject, 'mock-value');
		});

		describe('when the value is not an object', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is an object', () => {

			beforeEach(() => {
				try {
					isObject.returns(true);
					assertIsNotObject('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'string');
				assert.strictEqual(caughtError.operator, '!==');
				assert.strictEqual(caughtError.expected, 'object');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsNotObject('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to not be an object');
				});

			});

		});

	});

});
