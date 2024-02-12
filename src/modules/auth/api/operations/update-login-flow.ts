import { cookies } from 'next/headers';
import { SuccessfulNativeLogin } from '@ory/client';
import { AxiosResponse } from 'axios';
import { LoginFormField } from '../../constants';
import { LoginForm } from '../../schema/login.schema';
import { parseCsrfCookie } from '../../utils/csrf';
import { OryServerSdk } from '../sdk';

export const updateLoginFlow = async (data: LoginForm): Promise<AxiosResponse<SuccessfulNativeLogin>> => {
  const csrfCookie = parseCsrfCookie(cookies().toString());

  const result = await OryServerSdk.updateLoginFlow({
    flow: data[LoginFormField.FlowId],
    updateLoginFlowBody: {
      method: 'password',
      csrf_token: data[LoginFormField.CsrfToken],
      password: data[LoginFormField.Password],
      identifier: data[LoginFormField.Email],
    },
    cookie: `${csrfCookie?.name}=${csrfCookie?.value}`,
  });

  return result;
};
