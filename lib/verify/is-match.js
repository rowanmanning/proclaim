'use strict';

module.exports = function isMatch(value, regExp) {
	if (regExp && typeof regExp.test === 'function') {
		return regExp.test(value);
	}
	return value === regExp;
};
