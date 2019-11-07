'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-defined', () => {
	let AssertionError;
	let assertIsDefined;
	let isDefined;

	beforeEach(() => {
		isDefined = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-defined', isDefined);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsDefined = require('../../../../lib/assert/is-defined');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsDefined);
	});

	describe('assertIsDefined(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsDefined('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-defined` with the values', () => {
			assert.calledOnce(isDefined);
			assert.calledWithExactly(isDefined, 'mock-value');
		});

		describe('when the value is defined', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is not defined', () => {

			beforeEach(() => {
				try {
					isDefined.returns(false);
					assertIsDefined('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value');
				assert.strictEqual(caughtError.operator, '!==');
				assert.strictEqual(caughtError.expected, undefined);
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsDefined('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to not be undefined');
				});

			});

		});

	});

});
