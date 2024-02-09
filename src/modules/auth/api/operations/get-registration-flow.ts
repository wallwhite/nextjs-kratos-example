import { cookies } from 'next/headers';
import { RegistrationFlow } from '@ory/client';
import { AxiosError, AxiosResponse } from 'axios';
import { Cookie } from 'set-cookie-parser';
import { parseCsrfCookie } from '../../utils/csrf';
import { handleFlowError } from '../errors';
import { OryServerSdk } from '../sdk';

interface GetRegistrationFlow {
  flow: RegistrationFlow | undefined;
  csrf: Cookie | undefined;
}

export const getRegistrationFlow = async (flowId?: string, returnTo?: string): Promise<GetRegistrationFlow> => {
  const authErrorHandler = handleFlowError('registration');

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
      const { data, headers } = await OryServerSdk.getRegistrationFlow({ id: String(flowId) }, defaultRequestOptions);

      return {
        flow: data,
        csrf: getCsrfCookie(headers),
      };
    }

    const { data, headers } = await OryServerSdk.createBrowserRegistrationFlow({ returnTo }, defaultRequestOptions);

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
