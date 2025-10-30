import { describe, it, expect } from 'vitest';
import enMessages from '../messages/en.json';
import requestConfigCreator from '../i18n/request';

describe('i18n request config (basic checks)', () => {
  it('has expected keys in the en messages file', () => {
    expect(enMessages).toHaveProperty('nav');
    expect(enMessages.nav.rentalSolutions).toBe('Rental Solutions');
  });

  it('exports a default creator (do not invoke in unit tests)', () => {
    // The default export is a createRequestConfig wrapper used by next-intl.
    // We assert it exists but avoid calling it here (client vs server boundaries).
    expect(typeof requestConfigCreator).toBe('function');
  });
});
