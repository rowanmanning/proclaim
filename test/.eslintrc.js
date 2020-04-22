'use strict';

const config = module.exports = JSON.parse(JSON.stringify(require('../.eslintrc')));

config.rules['max-len'] = 'off';
config.rules['no-empty-function'] = 'off';
