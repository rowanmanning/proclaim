var commonjsUnitTestingUnitTests = require('./program')(require('../../../lib/proclaim'));

describe('commonjs unit testing unit tests converted to mocha', function () {
	for (var test in commonjsUnitTestingUnitTests) {
		if (Object.prototype.hasOwnProperty.call(commonjsUnitTestingUnitTests, test)) {
			it(test, commonjsUnitTestingUnitTests[test]);
		}
	}
});