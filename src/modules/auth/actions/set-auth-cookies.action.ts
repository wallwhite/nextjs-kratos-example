'use server';

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { Cookie } from 'set-cookie-parser';

export interface SetAuthCookiesData {
  [key: string]: Cookie | undefined;
}

export const setAuthCookies = (data: SetAuthCookiesData = {}): void => {
  if (!data) return;

  Object.values(data).forEach((cookie) => {
    if (cookie) {
      const cookieExpires = cookie?.expires ? new Date(cookie?.expires).getTime() : undefined;
      const currentTime = Date.now();

      if (cookieExpires && cookieExpires < currentTime) {
        cookies().delete(String(cookie.name));
        return;
      }

      cookies().set({
        name: String(cookie.name),
        value: String(cookie.value),
        httpOnly: true,
        path: String(cookie.path),
        maxAge: cookie.expires ? Number(cookie.maxAge) : undefined,
        sameSite: String(cookie.sameSite),
        expires: cookie.expires ? new Date(cookie.expires).getTime() : undefined,
      } as ResponseCookie);
    }
  });
};
