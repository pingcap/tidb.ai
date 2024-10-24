const cache = new Map<string, string[]>;

export function extractTemplates (text: string) {
  const cached = cache.get(text);
  if (cached) {
    return cached;
  }

  const STATE_NO = 0;
  const STATE_DOLLAR = 1;
  const STATE_BRACE = 2;

  const names = new Set<string>();

  let state: 0 | 1 | 2 = STATE_NO;

  let s = -1;
  let i = 0;

  while (i < text.length) {
    const c = text[i];

    switch (c) {
      case '\\':
        i += 1;
        break;
      case '$':
        if (state !== STATE_BRACE) {
          state = STATE_DOLLAR;
        }
        break;
      case '{':
        if (state === STATE_DOLLAR) {
          state = STATE_BRACE;
          s = i;
        }
        break;
      case '}':
        if (state === STATE_BRACE) {
          names.add(text.slice(s + 1, i));
          state = STATE_NO;
        }
        break;
      default:
        break;
    }

    i += 1;
  }

  const result = Array.from(names);
  cache.set(text, result);
  return result;
}
