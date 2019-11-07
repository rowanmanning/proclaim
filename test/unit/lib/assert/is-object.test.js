'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-object', () => {
	let AssertionError;
	let assertIsObject;
	let isObject;

	beforeEach(() => {
		isObject = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-object', isObject);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsObject = require('../../../../lib/assert/is-object');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsObject);
	});

	describe('assertIsObject(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsObject('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-object` with the values', () => {
			assert.calledOnce(isObject);
			assert.calledWithExactly(isObject, 'mock-value');
		});

		describe('when the value is an object', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is not an object', () => {

			beforeEach(() => {
				try {
					isObject.returns(false);
					assertIsObject('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'string');
				assert.strictEqual(caughtError.operator, '===');
				assert.strictEqual(caughtError.expected, 'object');
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsObject('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to be an object');
				});

			});

		});

	});

});
