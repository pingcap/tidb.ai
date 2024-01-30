export function getErrorMessage (e: unknown) {
  if (!e) {
    return 'Unknown error';
  }
  if (typeof e !== 'object') {
    return String(e);
  }

  return ((e as any).message) || ((e as any).name) || String(e);
}
