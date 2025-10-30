import { describe, it, expect, vi, afterEach } from 'vitest';
import { logInfo, logError } from '../lib/logger';

describe('logger', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('masks secret keys and truncates long strings', () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const longStr = 'a'.repeat(100);
    logInfo('test', { password: 'supersecret', apiKey: 'abcd', name: 'alice', long: longStr });
    expect(infoSpy).toHaveBeenCalled();
    const args = infoSpy.mock.calls[0];
    // args: ['[info]', 'test', maskedMeta]
    const meta = args[2];
    expect(meta.password).toBe('<<redacted>>');
    expect(meta.apiKey).toBe('<<redacted>>');
    expect(meta.name).toBe('alice');
    // truncated to first 32 chars + ellipsis + last 8 chars
    expect(meta.long).toMatch(/^a{32}…a{8}$/);
  });

  it('logs errors via console.error and redacts secrets', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    logError('boom', { secret: 's' });
    expect(errorSpy).toHaveBeenCalled();
    const args = errorSpy.mock.calls[0];
    const meta = args[2];
    expect(meta.secret).toBe('<<redacted>>');
  });
});
