export function buildUrlParams (object: object) {
  const usp = new URLSearchParams();

  for (let key of Object.keys(object)) {
    const value = (object as any)[key];

    if (value == null) {
      continue;
    }

    if (value instanceof Array) {
      for (let item of value) {
        usp.append(key, stringify(item));
      }
    } else {
      usp.append(key, stringify(value));
    }
  }

  return usp;
}

function stringify (item: any) {
  if (item instanceof Date) {
    return item.toISOString();
  } else {
    return String(item);
  }
}
