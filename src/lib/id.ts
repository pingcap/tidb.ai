import { customAlphabet, urlAlphabet } from 'nanoid';

export const genId = customAlphabet(urlAlphabet.replace(/[-_]/g, ''), 12);
