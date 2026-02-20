export const ENDPOINT = import.meta.env.VITE_API_URL;
export const ENDPOINT_BE_REDIRECT = import.meta.env.VITE_API_URL_REDIRECT;
export const short = 'short';
export const GET = 'getShortUrl';

export const GET_SHORT_URL = `${ENDPOINT}`;
export const CREATE_SHORT_URL = `${ENDPOINT}/${short}`;
