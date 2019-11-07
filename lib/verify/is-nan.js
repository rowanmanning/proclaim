/* eslint-disable no-self-compare */
'use strict';

const isNumber = require('./is-number');

module.exports = function isNaN(value) {
	return isNumber(value) && value !== value;
};
