// Deprecated shim: keep middleware file as a thin wrapper that re-exports
// the new `proxy` implementation for compatibility during the migration to
// Next.js 16. Remove this file once you are confident `proxy.ts` is in use.

export { proxy as middleware, config } from './proxy';