'use strict';

const isBoolean = require('./is-boolean');

module.exports = function isFalse(value) {
	if (!isBoolean(value)) {
		return false;
	}
	if (typeof value === 'object') {
		value = value.valueOf();
	}
	return value === false;
};
