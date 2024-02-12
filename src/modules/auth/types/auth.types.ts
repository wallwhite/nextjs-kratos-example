import { Cookie } from 'set-cookie-parser';

export interface AuthSearchParams {
  flow: string;
  returnTo: string;
}

export interface AuthFormState {
  message: string | null;
  isSuccessful?: boolean;
}

export interface AuthCookies {
  csrf?: Cookie | undefined;
  session?: Cookie | undefined;
}
