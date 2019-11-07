'use strict';

const isType = require('./is-type');

module.exports = function isNumber(value) {
	return isType(value, 'object');
};
