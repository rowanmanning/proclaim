'use strict';

module.exports = {
	extends: '@rowanmanning/eslint-config/es2018',
	globals: {
		define: true
	},
	rules: {
		'complexity': 'off',
		'max-depth': ['warn', 4],
		'max-params': ['warn', 5],
		'max-statements': 'off'
	}
};
