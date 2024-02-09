import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LogoutFlow } from '@ory/client';
import { AxiosError } from 'axios';
import { OryServerSdk } from '../sdk';

export const getLogoutToken = async (): Promise<LogoutFlow | null> => {
  try {
    const cookieParam = cookies()
      .getAll()
      .reduce((acc, cookie) => `${acc}${cookie.name}=${cookie.value}; `, '');

    const { data } = await OryServerSdk.createBrowserLogoutFlow({
      cookie: cookieParam,
    });

    return data;
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      return redirect('/');
    }
    return null;
  }
};
