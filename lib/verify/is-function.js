'use strict';

const isType = require('./is-type');

module.exports = function isFunction(value) {
	return isType(value, 'function');
};
