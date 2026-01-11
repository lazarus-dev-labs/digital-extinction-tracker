import ky from 'ky';

const BACKEND_URL = process.env.BUN_PUBLIC_BACKEND_URL; // Use env variable

export const api = ky.create({
    prefixUrl: BACKEND_URL,
    timeout: 10000
});