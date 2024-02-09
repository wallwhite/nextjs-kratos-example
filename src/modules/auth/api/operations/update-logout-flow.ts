import { cookies } from 'next/headers';
import { AxiosResponse } from 'axios';
import { Cookie } from 'set-cookie-parser';
import { AuthCookies } from '../../types/auth.types';
import { parseCsrfCookie } from '../../utils/csrf';
import { parseSessionCookie } from '../../utils/session';
import { OryServerSdk } from '../sdk';

export const updateLogoutFlow = async (token: string): Promise<AuthCookies> => {
  const getCsrfCookie = (responseHeaders: AxiosResponse['headers']): Cookie | undefined =>
    parseCsrfCookie(responseHeaders['set-cookie']?.toString() ?? '');

  const getSessionCookie = (responseHeaders: AxiosResponse['headers']): Cookie | undefined =>
    parseSessionCookie(responseHeaders['set-cookie']?.toString() ?? '');

  try {
    const cookieParam = cookies()
      .getAll()
      .reduce((acc, cookie) => `${acc}${cookie.name}=${cookie.value}; `, '');

    const response = await OryServerSdk.updateLogoutFlow({ token, cookie: cookieParam });

    return {
      csrf: getCsrfCookie(response.headers),
      session: getSessionCookie(response.headers),
    };
  } catch (error) {
    throw new Error('Not implemented');
  }
};
