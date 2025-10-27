import {getRequestConfig} from 'next-intl/server';
import fs from 'fs';
import path from 'path';

const locales = ['en', 'de'];

/**
 * Instrumentation: optionally wrap the messages object in a Proxy that
 * records accessed keys to REMEDIATION/runtime_used_translation_keys.txt.
 * Enable by setting environment variable I18N_INSTRUMENT=true in dev.
 */
function maybeInstrument<T extends Record<string, any>>(obj: T) {
  const enabled = process.env.I18N_INSTRUMENT === 'true';
  if (!enabled) return obj;

  const seen = new Set<string>();
  const outDir = path.resolve(process.cwd(), 'REMEDIATION');
  const outFile = path.join(outDir, 'runtime_used_translation_keys.txt');
  try {
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive: true});
  } catch (e) {
    // fail silently — instrumentation must not break the app
  }

  const writeKey = (key: string) => {
    if (seen.has(key)) return;
    seen.add(key);
    try {
      fs.appendFileSync(outFile, key + '\n', {encoding: 'utf8'});
    } catch (e) {
      // ignore write errors
    }
  };

  const createProxy = (target: any, prefix = ''): any => {
    if (target === null || typeof target !== 'object') return target;
    return new Proxy(target, {
      get(t, prop, receiver) {
        if (typeof prop === 'symbol') return Reflect.get(t, prop, receiver);
        const key = prefix ? `${prefix}.${String(prop)}` : String(prop);
        const val = Reflect.get(t, prop, receiver);
        // if the accessed value is an object, return a proxy so deeper
        // accesses are also recorded; otherwise record the full key
        if (val && typeof val === 'object') {
          // record that this namespace was touched
          writeKey(key);
          return createProxy(val, key);
        }
        writeKey(key);
        return val;
      }
    });
  };

  return createProxy(obj, '');
}

export default getRequestConfig(async ({locale}) => {
  // If locale is undefined or invalid, default to 'en'
  const validLocale = locale && locales.includes(locale) ? locale : 'en';

  const messages = (await import(`../messages/${validLocale}.json`)).default;

  return {
    locale: validLocale,
    messages: maybeInstrument(messages)
  };
});