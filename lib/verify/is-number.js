'use strict';

module.exports = function isNumber(value) {
	return (Object.prototype.toString.call(value) === '[object Number]');
};
