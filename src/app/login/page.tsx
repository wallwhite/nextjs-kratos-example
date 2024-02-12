import React from 'react';
import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { getLoginFlow } from '@/modules/auth/api/operations/get-login-flow';
import { Login } from '@/modules/auth/components/login';
import { AuthSearchParams } from '@/modules/auth/types/auth.types';

interface LoginPageProps {
  searchParams: Partial<AuthSearchParams>;
}

const LoginPage: NextPage<LoginPageProps> = async ({ searchParams }) => {
  const flowId = String(searchParams.flow ?? '');
  const returnTo = String(searchParams.returnTo ?? '');

  const { flow, csrf } = await getLoginFlow(flowId, returnTo);

  if (!flow) {
    return notFound();
  }

  return <Login flow={flow} csrf={csrf} />;
};

export default LoginPage;
