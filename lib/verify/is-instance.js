'use strict';

const isType = require('./is-type');

module.exports = function isInstance(value, constructor) {
	return isType(constructor, 'function') && value instanceof constructor;
};
