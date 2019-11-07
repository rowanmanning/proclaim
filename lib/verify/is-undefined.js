'use strict';

const isType = require('./is-type');

module.exports = function isUndefined(value) {
	return isType(value, 'undefined');
};
