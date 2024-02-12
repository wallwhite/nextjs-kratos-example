import { z } from 'zod';
import { LoginFormField } from '../constants';

export const LoginFormSchema = z.object({
  [LoginFormField.Email]: z.string().email().min(1),
  [LoginFormField.Password]: z.string().min(8),
  [LoginFormField.CsrfToken]: z.string().min(1),
  [LoginFormField.FlowId]: z.string().min(1),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;
