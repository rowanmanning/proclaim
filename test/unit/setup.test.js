'use strict';

const assert = require('../../lib/proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

// We need to make sure the `match` alias does not get
// overwritten by Sinon
const {match} = assert;
sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});
assert.match = match;

beforeEach(() => {
	mockery.enable({
		useCleanCache: true,
		warnOnUnregistered: false,
		warnOnReplace: false
	});
});

afterEach(() => {
	mockery.deregisterAll();
	mockery.disable();
	sinon.restore();
});
