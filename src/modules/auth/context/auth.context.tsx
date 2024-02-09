'use client';

import { DependencyList, FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@ory/client';
import { getLogoutTokenAction } from '../actions/get-logout-token.action';
import { logoutAction } from '../actions/logout.action';
import { setAuthCookies } from '../actions/set-auth-cookies.action';

interface AuthContext {
  session: Session | null;
  logOut?: () => void;
}

const initialValue: AuthContext = {
  session: null,
  logOut: () => {},
};

const AuthContext = createContext<AuthContext>(initialValue);

interface AuthProviderProps extends Omit<AuthContext, 'logOut'> {
  deps?: DependencyList;
}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({ children, session, deps = [] }) => {
  const [logoutToken, setLogoutToken] = useState('');
  const [sessionState, setSessionState] = useState<Session | null>(session);
  const router = useRouter();

  const logOut = async (): Promise<void> => {
    const data = await logoutAction(logoutToken);

    if (data) {
      await setAuthCookies({ ...data });
    }

    setSessionState(null);

    router.refresh();
    router.push('/');
  };

  useEffect(() => {
    if (session) {
      setSessionState(session);
    }
  }, [session]);

  useEffect(() => {
    if (!session) return;

    getLogoutTokenAction().then((token) => {
      setLogoutToken(token);
    });
  }, [...deps, session]);

  return <AuthContext.Provider value={{ session: sessionState, logOut }}>{children}</AuthContext.Provider>;
};

export const useSession = (): AuthContext['session'] => {
  const { session } = useContext(AuthContext);

  return session;
};

export const useLogOut = (): AuthContext['logOut'] => {
  const { logOut } = useContext(AuthContext);

  return logOut;
};
