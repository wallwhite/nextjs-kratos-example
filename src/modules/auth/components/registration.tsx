'use client';

import React, { FC, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { RegistrationFlow } from '@ory/client';
import { Cookie } from 'set-cookie-parser';
import { registerAction } from '../actions/register.action';
import { setAuthCookies } from '../actions/set-auth-cookies.action';
import { RegistrationFormField } from '../constants';
import { RegistrationFormState } from '../types/auth.types';
import { getCsrfUiNodeValue } from '../utils/csrf';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialState: RegistrationFormState = {
  message: null,
};

interface RegistrationProps {
  flow: RegistrationFlow;
  csrf: Cookie | undefined;
}

export const Registration: FC<RegistrationProps> = ({ flow, csrf }) => {
  const [state, formAction] = useFormState<RegistrationFormState, FormData>(registerAction, initialState);

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
        <h3 className="text-2xl font-bold tracking-tight text-center mt-4">Sign up</h3>
        <p className="text-muted-foreground text-center mt-2 mb-4">Please fill out the form below to sign up.</p>

        <div className="flex flex-col gap-4 w-full p-4">
          {state.message && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <Input type="text" name={RegistrationFormField.FlowId} className="hidden" hidden defaultValue={flow.id} />
          <Input
            type="text"
            name={RegistrationFormField.CsrfToken}
            className="hidden"
            hidden
            defaultValue={csrfNodeValue}
          />
          <div className="flex flex-row gap-4 w-full">
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor={RegistrationFormField.FirstName}>First name</Label>
              <Input
                id={RegistrationFormField.FirstName}
                name={RegistrationFormField.FirstName}
                type="text"
                placeholder="John"
                defaultValue="John"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor={RegistrationFormField.LastName}>Last name</Label>
              <Input
                id={RegistrationFormField.LastName}
                name={RegistrationFormField.LastName}
                type="text"
                placeholder="Doe"
                defaultValue={`DOe ${flow.id}`}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor={RegistrationFormField.Email}>Email</Label>
            <Input
              id={RegistrationFormField.Email}
              name={RegistrationFormField.Email}
              type="email"
              placeholder="Email"
              defaultValue={`test+${Math.random()}@ory.sh`}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor={RegistrationFormField.Password}>Password</Label>
            <Input
              id={RegistrationFormField.Password}
              name={RegistrationFormField.Password}
              type="password"
              placeholder="Password"
              defaultValue={btoa(Math.random().toString())}
            />
          </div>
          <Button type="submit" variant="default" className="w-full">
            Sign up
          </Button>
        </div>
      </Card>
    </form>
  );
};
