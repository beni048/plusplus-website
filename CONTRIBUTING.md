# Contributing

Thanks for wanting to contribute! A few guidelines to make reviews fast and consistent:

- Run tests, lint and typecheck locally before opening a PR:

```bash
pnpm install
pnpm exec eslint . --ext .ts,.tsx,.js,.jsx
pnpm exec tsc --noEmit
pnpm test
```

- Branches: use descriptive branch names and include the issue or ticket number when available.
- Commits: small, focused commits help reviewers. Use conventional commit messages when possible.
- PRs: include a short description, testing notes, and a screenshot if the PR touches UI.
- CI: address any failing CI checks before requesting a final review.

Pre-commit hooks are enabled (Husky + lint-staged) to automatically run ESLint on staged files.

If you are unsure, ask on the PR — maintainers are happy to help guide larger changes.
