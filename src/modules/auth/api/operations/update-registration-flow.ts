import { cookies } from 'next/headers';
import { SuccessfulNativeRegistration } from '@ory/client';
import { AxiosResponse } from 'axios';
import { RegistrationFormField } from '../../constants';
import { RegistrationForm } from '../../schema/registration.schema';
import { parseCsrfCookie } from '../../utils/csrf';
import { OryServerSdk } from '../sdk';

export const updateRegistrationFlow = async (
  data: RegistrationForm,
): Promise<AxiosResponse<SuccessfulNativeRegistration>> => {
  const csrfCookie = parseCsrfCookie(cookies().toString());

  const result = await OryServerSdk.updateRegistrationFlow({
    flow: data[RegistrationFormField.FlowId],
    updateRegistrationFlowBody: {
      method: 'password',
      csrf_token: data[RegistrationFormField.CsrfToken],
      traits: {
        name: {
          first: data[RegistrationFormField.FirstName],
          last: data[RegistrationFormField.LastName],
        },
        email: data[RegistrationFormField.Email],
      },
      password: data[RegistrationFormField.Password],
    },
    cookie: `${csrfCookie?.name}=${csrfCookie?.value}`,
  });

  return result;
};
