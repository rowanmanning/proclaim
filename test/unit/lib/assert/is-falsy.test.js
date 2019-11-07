'use strict';

const assert = require('../../../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/assert/is-falsy', () => {
	let AssertionError;
	let assertIsFalsy;
	let isFalsy;

	beforeEach(() => {
		isFalsy = sinon.stub().returns(true);
		mockery.registerMock('../verify/is-falsy', isFalsy);
		AssertionError = require('../../../../lib/error/assertion-error');
		assertIsFalsy = require('../../../../lib/assert/is-falsy');
	});

	it('exports a function', () => {
		assert.isFunction(assertIsFalsy);
	});

	describe('assertIsFalsy(value, message)', () => {
		let caughtError;

		beforeEach(() => {
			try {
				assertIsFalsy('mock-value', 'mock-message');
			} catch (error) {
				caughtError = error;
			}
		});

		it('calls `lib/verify/is-falsy` with the values', () => {
			assert.calledOnce(isFalsy);
			assert.calledWithExactly(isFalsy, 'mock-value');
		});

		describe('when the value is falsy', () => {

			it('does not throw an error', () => {
				assert.isUndefined(caughtError);
			});

		});

		describe('when the value is not falsy', () => {

			beforeEach(() => {
				try {
					isFalsy.returns(false);
					assertIsFalsy('mock-value', 'mock-message');
				} catch (error) {
					caughtError = error;
				}
			});

			it('throws an AssertionError with the given message', () => {
				assert.isInstanceOf(caughtError, AssertionError);
				assert.strictEqual(caughtError.message, 'mock-message');
				assert.strictEqual(caughtError.actual, 'mock-value');
				assert.strictEqual(caughtError.operator, '==');
				assert.strictEqual(caughtError.expected, false);
			});

			describe('and no message is provided', () => {

				beforeEach(() => {
					try {
						assertIsFalsy('mock-value');
					} catch (error) {
						caughtError = error;
					}
				});

				it('throws an AssertionError with a default message', () => {
					assert.isInstanceOf(caughtError, AssertionError);
					assert.strictEqual(caughtError.message, 'Expected "mock-value" to be falsy');
				});

			});

		});

	});

});
