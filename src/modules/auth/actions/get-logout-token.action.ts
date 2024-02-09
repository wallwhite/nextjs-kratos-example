'use server';

import { getLogoutToken } from '../api/operations/get-logout-token';

export const getLogoutTokenAction = async (): Promise<string> => {
  try {
    const data = await getLogoutToken();

    return data?.logout_token ?? '';
  } catch (error) {
    return '';
  }
};
