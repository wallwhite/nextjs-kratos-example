import { UiContainer, UiNodeInputAttributes } from '@ory/client';
import setCookie, { Cookie } from 'set-cookie-parser';

export const parseCsrfCookie = (cookieString: string | string[]): Cookie | undefined => {
  const parsedValue = setCookie.parse(cookieString);
  const csrfCookie = parsedValue.find((value) => value.name.startsWith('csrf_token'));

  return csrfCookie;
};

export const getCsrfUiNodeValue = (ui: UiContainer): string => {
  const csrfNode = ui.nodes.find(({ attributes }) => (attributes as UiNodeInputAttributes)?.name === 'csrf_token');

  return (csrfNode?.attributes as UiNodeInputAttributes)?.value ?? '';
};
