'use server';

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { updateRegistrationFlow } from '../api/operations/update-registration-flow';
import { RegistrationFormField } from '../constants';
import { RegistrationFormSchema } from '../schema/registration.schema';
import { RegistrationFormState } from '../types/auth.types';
import { parseCsrfCookie } from '../utils/csrf';
import { parseSessionCookie } from '../utils/session';

export const registerAction = async (_: RegistrationFormState, formData: FormData): Promise<RegistrationFormState> => {
  const parseFormData = RegistrationFormSchema.safeParse({
    [RegistrationFormField.FirstName]: formData.get(RegistrationFormField.FirstName),
    [RegistrationFormField.LastName]: formData.get(RegistrationFormField.LastName),
    [RegistrationFormField.Email]: formData.get(RegistrationFormField.Email),
    [RegistrationFormField.Password]: formData.get(RegistrationFormField.Password),
    [RegistrationFormField.CsrfToken]: formData.get(RegistrationFormField.CsrfToken),
    [RegistrationFormField.FlowId]: formData.get(RegistrationFormField.FlowId),
  });

  if (!parseFormData.success) {
    return { message: 'Validation failed, check form values' };
  }

  try {
    const { headers } = await updateRegistrationFlow(parseFormData.data);

    const responseSessionCookie = parseSessionCookie(headers['set-cookie'] ?? '');
    const responseCsrfCookie = parseCsrfCookie(headers['set-cookie'] ?? '');

    if (responseSessionCookie) cookies().set(responseSessionCookie as ResponseCookie);
    if (responseCsrfCookie) cookies().set(responseCsrfCookie as ResponseCookie);

    return { message: null, isSuccessful: true };
  } catch (error) {
    return { message: 'Failed to register' };
  }
};
