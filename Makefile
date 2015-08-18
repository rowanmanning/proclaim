
# Color helpers
C_CYAN=\x1b[34;01m
C_RESET=\x1b[0m

# Group targets
all: deps lint test-coverage
ci: lint test-coverage

# Install dependencies
deps:
	@echo "$(C_CYAN)> installing dependencies$(C_RESET)"
	@npm install

# Lint JavaScript
lint: jshint jscs

# Run JSHint
jshint:
	@echo "$(C_CYAN)> linting javascript$(C_RESET)"
	@./node_modules/.bin/jshint .

# Run JavaScript Code Style
jscs:
	@echo "$(C_CYAN)> checking javascript code style$(C_RESET)"
	@./node_modules/.bin/jscs .

# Run all tests
test: test-unit

# Run unit tests
test-unit:
	@echo "$(C_CYAN)> running unit tests$(C_RESET)"
	@./node_modules/.bin/mocha ./test/unit --reporter spec --colors --recursive

# Run unit tests with coverage
test-coverage:
	@echo "$(C_CYAN)> running unit tests with coverage$(C_RESET)"
	@./node_modules/.bin/istanbul cover node_modules/mocha/bin/_mocha -- ./test/unit --reporter spec --colors --recursive
	@./node_modules/.bin/istanbul check-coverage --statement 85 --branch 85 --function 85

.PHONY: test
