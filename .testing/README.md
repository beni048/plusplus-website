# Testing

This directory contains test-related files and results for the Prospera project.

## Structure

### `/results`
Test execution results and reports.

**Contents:**
- Axe accessibility test results (JSON format)
- Last run information
- Historical test executions

## Running Tests

### Unit Tests
```bash
npm test
```

Tests are located in the `/tests` directory at the root level.

### Playwright Tests
```bash
npm run test:e2e
```

Playwright tests provide end-to-end testing and accessibility checks.

## Test Files

Active test suites are located in `/tests`:
- `deposit-calculator.test.ts` - Calculator utility tests
- `i18n-request.test.ts` - Internationalization tests
- `logger.test.ts` - Logger utility tests
- `playwright/` - E2E and accessibility tests
  - `accessibility.spec.ts` - Axe accessibility audits
  - `contact.spec.ts` - Contact form tests
  - `collect-i18n.spec.ts` - i18n collection tests
  - `mcp.spec.ts` - MCP integration tests

## Test Results

Test results are automatically generated in this directory when tests are run. These JSON files track:
- Accessibility violations
- Test pass/fail status
- Execution timestamps
- Detailed test output

## CI/CD Integration

Test results help ensure code quality. Regular test execution is recommended before deployments.
