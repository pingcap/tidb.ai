export { GET, POST } from './auth';
// ! Code below will cause mysql2 error(listAllEnabledProvidersWithConfig in ./auth.ts)
// export const runtime = 'edge'; // optional
export const dynamic = 'force-dynamic';