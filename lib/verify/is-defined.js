'use strict';

const isUndefined = require('./is-undefined');

module.exports = function isDefined(value) {
	return !isUndefined(value);
};
