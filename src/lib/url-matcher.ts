import { matcher } from 'micromatch';

export function createUrlMatcher (pattern: string) {
  const idx = pattern.indexOf('/');

  const domainPattern = pattern.slice(0, idx);
  const pathPattern = pattern.slice(idx);

  const domainMatcher = matcher(domainPattern);
  const pathMatcher = matcher(pathPattern);

  return function match (url: string) {
    try {
      const urlObject = new URL(url);
      return domainMatcher(urlObject.hostname) && pathMatcher(urlObject.pathname);
    } catch {
      return false;
    }
  };
}