'use server';

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { updateLoginFlow } from '../api/operations/update-login-flow';
import { LoginFormField } from '../constants';
import { LoginFormSchema } from '../schema/login.schema';
import { AuthFormState } from '../types/auth.types';
import { parseCsrfCookie } from '../utils/csrf';
import { parseSessionCookie } from '../utils/session';

export const loginAction = async (_: AuthFormState, formData: FormData): Promise<AuthFormState> => {
  const parsedFormData = LoginFormSchema.safeParse({
    [LoginFormField.Email]: formData.get(LoginFormField.Email),
    [LoginFormField.Password]: formData.get(LoginFormField.Password),
    [LoginFormField.CsrfToken]: formData.get(LoginFormField.CsrfToken),
    [LoginFormField.FlowId]: formData.get(LoginFormField.FlowId),
  });

  if (!parsedFormData.success) {
    return { message: 'Validation failed, check form values' };
  }

  try {
    const { headers } = await updateLoginFlow(parsedFormData.data);

    const responseSessionCookie = parseSessionCookie(headers['set-cookie'] ?? '');
    const responseCsrfCookie = parseCsrfCookie(headers['set-cookie'] ?? '');

    if (responseSessionCookie) cookies().set(responseSessionCookie as ResponseCookie);
    if (responseCsrfCookie) cookies().set(responseCsrfCookie as ResponseCookie);

    return { message: null, isSuccessful: true };
  } catch (error) {
    return { message: 'Failed to login' };
  }
};
