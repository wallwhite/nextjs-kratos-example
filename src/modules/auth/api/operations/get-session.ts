import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Session } from '@ory/client';
import { AxiosError } from 'axios';
import { OryServerSdk } from '../sdk';

export const getSession = async (): Promise<Session | null> => {
  try {
    const cookieParam = cookies()
      .getAll()
      .reduce((acc, cookie) => `${acc}${cookie.name}=${cookie.value}; `, '');

    const { data } = await OryServerSdk.toSession({
      cookie: cookieParam,
    });

    return data;
  } catch (error) {
    switch ((error as AxiosError).response?.status) {
      // This is a legacy error code thrown. See code 422 for
      // more details.
      case 403:
      case 422: {
        // This status code is returned when we are trying to
        // validate a session which has not yet completed
        // its second factor
        return redirect('/login?aal=aal2');
      }
      case 401: {
        // do nothing, the user is not logged in
        return null;
      }
      default: {
        // Something else happened!
        throw error;
      }
    }
  }
};
