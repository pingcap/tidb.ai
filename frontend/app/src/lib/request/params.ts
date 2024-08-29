export function buildUrlParams (object: object) {
  const usp = new URLSearchParams();

  for (let key of Object.keys(object)) {
    const value = (object as any)[key];

    if (value == null) {
      continue;
    }

    if (value instanceof Array) {
      for (let item of value) {
        usp.append(key, String(value));
      }
    } else {
      usp.append(key, String(value));
    }
  }

  return usp;
}
