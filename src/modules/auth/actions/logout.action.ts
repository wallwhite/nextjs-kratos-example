'use server';

import { updateLogoutFlow } from '../api/operations/update-logout-flow';
import { AuthCookies } from '../types/auth.types';

export const logoutAction = async (token: string): Promise<AuthCookies | null> => {
  if (token) {
    const data = await updateLogoutFlow(token);

    return data;
  }

  return null;
};
