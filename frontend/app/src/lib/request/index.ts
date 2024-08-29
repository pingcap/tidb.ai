import { authenticationHeaders } from '#lib/request/authenticationHeaders';

console.log(authenticationHeaders);

export { authenticationHeaders };
export * from './base-url';
export * from './response-handlers';
export * from './errors';
export * from './params';
export { type Page, type PageParams, zodPage } from '../zod';
