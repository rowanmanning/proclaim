'use strict';

const isBoolean = require('./is-boolean');

module.exports = function isTrue(value) {
	if (!isBoolean(value)) {
		return false;
	}
	if (typeof value === 'object') {
		value = value.valueOf();
	}
	return value === true;
};
