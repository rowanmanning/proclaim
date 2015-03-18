
# Color helpers
C_CYAN=\x1b[34;01m
C_RESET=\x1b[0m

# Group targets
all: deps lint test
ci: lint test

# Install dependencies
deps:
	@echo "$(C_CYAN)> installing dependencies$(C_RESET)"
	@npm install

# Lint JavaScript
lint:
	@echo "$(C_CYAN)> linting javascript$(C_RESET)"
	@./node_modules/.bin/jshint \
		--config ./test/config/jshint.json \
		--exclude node_modules \
		.

# Run all tests
test: test-unit

# Run unit tests
test-unit:
	@echo "$(C_CYAN)> running unit tests$(C_RESET)"
	@./node_modules/.bin/mocha \
		--reporter spec \
		--colors \
		--recursive \
		./test/unit

# Run the Node Test app for browser testing
test-server:
	@echo "Running test server..."
	@./node_modules/.bin/mocha-srv ./test/unit

.PHONY: test
