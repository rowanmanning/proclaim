'use strict';

module.exports = function isArray(value) {
	return (Object.prototype.toString.call(value) === '[object Array]');
};
