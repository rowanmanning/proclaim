'use strict';

module.exports = function toString(value) {
	if (value instanceof RegExp) {
		return value.toString();
	}
	return JSON.stringify(value);
};
