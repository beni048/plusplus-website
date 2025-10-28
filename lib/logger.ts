// Minimal structured logger that masks obvious secrets before logging.
type Meta = Record<string, unknown> | undefined;

const SECRET_KEYS = [
  'password', 'pass', 'token', 'apiKey', 'apikey', 'secret', 'privateKey', 'MJ_APIKEY_PRIVATE', 'MJ_APIKEY_PUBLIC'
];

function maskValue(value: unknown) {
  if (value == null) return value;
  if (typeof value === 'string') {
    if (value.length > 64) return `${value.slice(0, 32)}…${value.slice(-8)}`;
    return value;
  }
  return value;
}

function maskSecrets(obj: Meta): Meta {
  if (!obj || typeof obj !== 'object') return obj;
  try {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (SECRET_KEYS.some((s) => k.toLowerCase().includes(s.toLowerCase()))) {
        out[k] = '<<redacted>>';
      } else {
        out[k] = maskValue(v);
      }
    }
    return out;
  } catch {
    return obj;
  }
}

export function logInfo(message: string, meta?: Meta) {
  try {
    if (meta) console.info('[info]', message, maskSecrets(meta));
    else console.info('[info]', message);
  } catch {
    // swallow logging errors
  }
}

export function logError(message: string, meta?: Meta) {
  try {
    if (meta) console.error('[error]', message, maskSecrets(meta));
    else console.error('[error]', message);
  } catch {
    // swallow logging errors
  }
}

export default { logInfo, logError };
