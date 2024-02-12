'use client';

import React, { FC, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { LoginFlow } from '@ory/client';
import { Cookie } from 'set-cookie-parser';
import { loginAction } from '../actions/login.action';
import { setAuthCookies } from '../actions/set-auth-cookies.action';
import { LoginFormField } from '../constants';
import { AuthFormState } from '../types/auth.types';
import { getCsrfUiNodeValue } from '../utils/csrf';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialState: AuthFormState = {
  message: null,
};

interface LoginProps {
  flow: LoginFlow;
  csrf: Cookie | undefined;
}

export const Login: FC<LoginProps> = ({ flow, csrf }) => {
  const [state, formAction] = useFormState<AuthFormState, FormData>(loginAction, initialState);

  const router = useRouter();
  const csrfNodeValue = getCsrfUiNodeValue(flow.ui);

  useEffect(() => {
    setAuthCookies({
      csrf,
    });
  }, []);

  useEffect(() => {
    if (state.isSuccessful) {
      router.push('/');
    }
  }, [state]);

  return (
    <form className="flex justify-center w-full mt-auto mb-auto" action={formAction}>
      <Card className="p-4 w-full max-w-md">
        <h3 className="text-2xl font-bold tracking-tight text-center mt-4">Sign in</h3>
        <p className="text-muted-foreground text-center mt-2 mb-4">Please fill out the form below to sign in.</p>

        <div className="flex flex-col gap-4 w-full p-4">
          {state.message && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <Input type="text" name={LoginFormField.FlowId} className="hidden" hidden defaultValue={flow.id} />
          <Input type="text" name={LoginFormField.CsrfToken} className="hidden" hidden defaultValue={csrfNodeValue} />
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor={LoginFormField.Email}>Email</Label>
            <Input id={LoginFormField.Email} name={LoginFormField.Email} type="email" placeholder="Email" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor={LoginFormField.Password}>Password</Label>
            <Input id={LoginFormField.Password} name={LoginFormField.Password} type="password" placeholder="Password" />
          </div>
          <Button type="submit" variant="default" className="w-full">
            Sign in
          </Button>
        </div>
      </Card>
    </form>
  );
};
