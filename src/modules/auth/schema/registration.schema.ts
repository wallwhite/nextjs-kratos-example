import { z } from 'zod';
import { RegistrationFormField } from '../constants';

export const RegistrationFormSchema = z.object({
  [RegistrationFormField.FirstName]: z.string().min(1),
  [RegistrationFormField.LastName]: z.string().min(1),
  [RegistrationFormField.Email]: z.string().email().min(1),
  [RegistrationFormField.Password]: z.string().min(8),
  [RegistrationFormField.CsrfToken]: z.string().min(1),
  [RegistrationFormField.FlowId]: z.string().min(1),
});

export type RegistrationForm = z.infer<typeof RegistrationFormSchema>;
