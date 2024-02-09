import setCookie, { Cookie } from 'set-cookie-parser';

export const parseSessionCookie = (cookieString: string | string[]): Cookie | undefined => {
  const parsedValue = setCookie.parse(cookieString);
  const sessionCookie = parsedValue.find((value) => value.name.startsWith('ory_kratos_session'));

  return sessionCookie;
};
