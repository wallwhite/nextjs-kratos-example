import { cookies } from 'next/headers';
import { LoginFlow } from '@ory/client';
import { AxiosError, AxiosResponse } from 'axios';
import { Cookie } from 'set-cookie-parser';
import { parseCsrfCookie } from '../../utils/csrf';
import { handleFlowError } from '../errors';
import { OryServerSdk } from '../sdk';

interface GetLoginFlow {
  flow: LoginFlow | undefined;
  csrf: Cookie | undefined;
}

export const getLoginFlow = async (flowId?: string, returnTo?: string): Promise<GetLoginFlow> => {
  const authErrorHandler = handleFlowError('login');

  const csrfCookie = parseCsrfCookie(cookies().toString());
  const serializedCookie = csrfCookie ? `${csrfCookie?.name}=${csrfCookie?.value}` : '';

  const defaultRequestOptions = {
    headers: {
      cookie: serializedCookie,
    },
  };

  const getCsrfCookie = (responseHeaders: AxiosResponse['headers']): Cookie | undefined =>
    parseCsrfCookie(responseHeaders['set-cookie']?.toString() ?? '');

  try {
    if (flowId) {
      const { data, headers } = await OryServerSdk.getLoginFlow({ id: String(flowId) }, defaultRequestOptions);

      return {
        flow: data,
        csrf: getCsrfCookie(headers),
      };
    }

    const { data, headers } = await OryServerSdk.createBrowserLoginFlow({ returnTo }, defaultRequestOptions);
    return {
      flow: data,
      csrf: getCsrfCookie(headers),
    };
  } catch (error) {
    authErrorHandler(error as AxiosError);

    return {
      flow: undefined,
      csrf: undefined,
    };
  }
};
